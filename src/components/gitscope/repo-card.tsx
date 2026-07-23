import { GitFork, Star, Circle } from "lucide-react";
import type { GithubRepo } from "@/lib/github";
import { formatDistanceToNow } from "date-fns";

export function RepoCard({ repo }: { repo: GithubRepo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="group relative block overflow-hidden rounded-xl border border-border bg-card p-5 card-lift hover:border-brand/60 hover:bg-accent/40"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold truncate group-hover:text-brand transition-colors">{repo.name}</h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5" /> {repo.stargazers_count}
          </span>
          <span className="inline-flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5" /> {repo.forks_count}
          </span>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
        {repo.description || "No description provided."}
      </p>
      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <Circle className="h-2.5 w-2.5 fill-brand text-brand" />
            {repo.language}
          </span>
        )}
        <span>Updated {formatDistanceToNow(new Date(repo.pushed_at), { addSuffix: true })}</span>
      </div>
      {repo.topics?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
