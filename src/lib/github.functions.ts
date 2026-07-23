import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { AnalysisResult, GithubRepo, GithubUser } from "./github";
import { buildRecommendations, computeAll, computeLanguages } from "./score";

const usernameSchema = z
  .string()
  .trim()
  .min(1)
  .max(39)
  .regex(/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/, "Invalid GitHub username");

async function gh<T>(path: string, token: string | undefined): Promise<{ ok: true; data: T } | { ok: false; status: number }> {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "GitScope",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) return { ok: false, status: res.status };
  const data = (await res.json()) as T;
  return { ok: true, data };
}

export const analyzeUser = createServerFn({ method: "GET" })
  .inputValidator((input: { username: string }) => ({
    username: usernameSchema.parse(input.username),
  }))
  .handler(async ({ data }): Promise<AnalysisResult> => {
    const token = process.env.GITHUB_TOKEN;
    const userRes = await gh<GithubUser>(`/users/${data.username}`, token);
    if (!userRes.ok) {
      if (userRes.status === 404) throw new Error(`User "${data.username}" not found on GitHub.`);
      if (userRes.status === 403) throw new Error("GitHub rate limit reached. Try again shortly.");
      throw new Error(`GitHub error (${userRes.status}).`);
    }
    const user = userRes.data;

    const reposRes = await gh<GithubRepo[]>(
      `/users/${data.username}/repos?per_page=100&sort=updated`,
      token
    );
    const repos = reposRes.ok ? reposRes.data : [];

    const readmeRes = await gh<{ name: string }>(
      `/repos/${data.username}/${data.username}/readme`,
      token
    );
    const hasProfileReadme = readmeRes.ok;

    const { score, breakdown, rating } = computeAll(user, repos, hasProfileReadme);
    const languages = computeLanguages(repos);
    const topRepos = [...repos]
      .filter((r) => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count)
      .slice(0, 6);
    const recommendations = buildRecommendations(user, repos, hasProfileReadme, breakdown);
    const totalStars = repos.filter((r) => !r.fork).reduce((s, r) => s + r.stargazers_count, 0);
    const totalForks = repos.filter((r) => !r.fork).reduce((s, r) => s + r.forks_count, 0);

    return {
      user,
      repos,
      score,
      breakdown,
      rating,
      languages,
      topRepos,
      recommendations,
      totalStars,
      totalForks,
      hasProfileReadme,
    };
  });
