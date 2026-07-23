import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/gitscope/nav";
import { Trophy } from "lucide-react";

const TRENDING = [
  { username: "torvalds", note: "Creator of Linux & Git" },
  { username: "gaearon", note: "React core team" },
  { username: "sindresorhus", note: "Prolific OSS maintainer" },
  { username: "yyx990803", note: "Creator of Vue.js" },
  { username: "tj", note: "Node.js & Express" },
  { username: "kentcdodds", note: "Testing & React educator" },
  { username: "addyosmani", note: "Web performance advocate" },
  { username: "leerob", note: "VP DX at Vercel" },
];

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard - GitScope" },
      { name: "description", content: "Trending developers analyzed on GitScope." },
      { property: "og:title", content: "GitScope Leaderboard" },
      { property: "og:description", content: "Trending developers on GitScope." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-center">
          <Trophy className="mx-auto h-8 w-8 text-brand" />
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Trending developers</h1>
          <p className="mt-2 text-muted-foreground">Hand-picked profiles worth analyzing on GitScope.</p>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card overflow-hidden">
          <ul className="divide-y divide-border">
            {TRENDING.map((d, i) => (
              <li key={d.username}>
                <Link
                  to="/analyze/$username"
                  params={{ username: d.username }}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-accent/40 transition-colors group"
                >
                  <span className="w-6 text-right font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <img
                    src={`https://github.com/${d.username}.png?size=80`}
                    alt={d.username}
                    className="h-10 w-10 rounded-full border border-border"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium group-hover:text-brand transition-colors">
                      {d.username}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{d.note}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">Analyze →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
