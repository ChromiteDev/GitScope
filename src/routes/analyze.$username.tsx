import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { Nav } from "@/components/gitscope/nav";
import { SearchForm } from "@/components/gitscope/search-form";
import { ScoreRing } from "@/components/gitscope/score-ring";
import { LanguageChart } from "@/components/gitscope/language-chart";
import { RepoCard } from "@/components/gitscope/repo-card";
import { MetricCard } from "@/components/gitscope/metric-card";
import { analyzeUser } from "@/lib/github.functions";
import type { AnalysisResult } from "@/lib/github";
import {
  Building2,
  Calendar,
  ExternalLink,
  GitFork,
  Globe,
  MapPin,
  Share2,
  Star,
  Users,
  AlertTriangle,
  Lightbulb,
  Info,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { toast } from "sonner";

const analysisQuery = (username: string) =>
  queryOptions({
    queryKey: ["analysis", username],
    queryFn: () => analyzeUser({ data: { username } }),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

export const Route = createFileRoute("/analyze/$username")({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(analysisQuery(params.username)),
  head: ({ params }) => ({
    meta: [
      { title: `${params.username} - GitScope Report` },
      {
        name: "description",
        content: `GitScope developer report for @${params.username} - score, top projects, and recommendations.`,
      },
      { property: "og:title", content: `${params.username} on GitScope` },
      {
        property: "og:description",
        content: `See @${params.username}'s GitScope developer score and analysis.`,
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: AnalyzeError,
  component: AnalyzePage,
});

function AnalyzeError({ error, reset }: { error?: Error; reset?: () => void }) {
  const router = useRouter();
  const msg = error?.message ?? "Something went wrong analyzing that profile.";
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-warning" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">We couldn't load that profile</h1>
        <p className="mt-2 text-muted-foreground">{msg}</p>
        <div className="mt-8 mx-auto max-w-md">
          <SearchForm />
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset?.();
            }}
            className="rounded-xl border border-border px-4 py-2 text-sm hover:bg-accent"
          >
            Try again
          </button>
          <Link to="/" className="rounded-xl bg-foreground text-background px-4 py-2 text-sm font-medium">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function AnalyzePage() {
  const { username } = Route.useParams();
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 max-w-xl">
          <SearchForm size="sm" />
        </div>
        <Suspense fallback={<AnalysisSkeleton />}>
          <AnalysisReport username={username} />
        </Suspense>
      </div>
    </div>
  );
}

function AnalysisSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-40 rounded-2xl bg-card" />
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-card" />
        ))}
      </div>
      <div className="h-80 rounded-2xl bg-card" />
    </div>
  );
}

function AnalysisReport({ username }: { username: string }) {
  const { data } = useSuspenseQuery(analysisQuery(username));
  useEffect(() => {
    document.title = `${data.user.login} - GitScope Report`;
  }, [data.user.login]);
  return <Report data={data} />;
}

const BREAKDOWN_LABELS: Record<keyof AnalysisResult["breakdown"], string> = {
  activity: "Activity",
  quality: "Project Quality",
  diversity: "Tech Diversity",
  community: "Community",
  profile: "Profile",
};

function Report({ data }: { data: AnalysisResult }) {
  const { user, breakdown, score, rating, totalStars, totalForks, languages, topRepos, recommendations } = data;

  const share = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Report link copied to clipboard");
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card animate-scale-in-soft">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-chart-4/10 pointer-events-none" />
        <div className="relative p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="flex items-start gap-5 flex-1 min-w-0">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border border-border shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight truncate">
                  {user.name || user.login}
                </h1>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <div className="text-muted-foreground">@{user.login}</div>
              {user.bio && <p className="mt-3 text-sm max-w-xl">{user.bio}</p>}
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                {user.company && (
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" /> {user.company}
                  </span>
                )}
                {user.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> {user.location}
                  </span>
                )}
                {user.blog && (
                  <a
                    href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-foreground"
                  >
                    <Globe className="h-3.5 w-3.5" /> {user.blog.replace(/^https?:\/\//, "")}
                  </a>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Joined {format(new Date(user.created_at), "MMM yyyy")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 lg:min-w-[260px]">
            <ScoreRing score={score} />
            <div className="text-center">
              <div className="text-sm font-medium">{rating}</div>
              <button
                onClick={share}
                className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs hover:bg-accent"
              >
                <Share2 className="h-3.5 w-3.5" /> Copy share link
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-up gs-delay-150">
        <MetricCard label="Followers" value={user.followers.toLocaleString()} icon={<Users className="h-4 w-4" />} />
        <MetricCard label="Public Repos" value={user.public_repos.toLocaleString()} />
        <MetricCard
          label="Stars Earned"
          value={totalStars.toLocaleString()}
          icon={<Star className="h-4 w-4" />}
        />
        <MetricCard
          label="Forks Earned"
          value={totalForks.toLocaleString()}
          icon={<GitFork className="h-4 w-4" />}
        />
      </section>

      {/* Score breakdown */}
      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 animate-fade-up gs-delay-300">
        <h2 className="text-xl font-semibold tracking-tight">Score breakdown</h2>
        <p className="text-sm text-muted-foreground mt-1">How your GitScope score is composed.</p>
        <div className="mt-6 space-y-4">
          {(Object.keys(BREAKDOWN_LABELS) as Array<keyof typeof BREAKDOWN_LABELS>).map((k) => {
            const v = breakdown[k];
            return (
              <div key={k}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{BREAKDOWN_LABELS[k]}</span>
                  <span className="tabular-nums text-muted-foreground">{v}/100</span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand to-chart-4"
                    style={{ width: `${v}%`, transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)" }}
                  />

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Languages */}
      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 animate-fade-up gs-delay-300">
        <h2 className="text-xl font-semibold tracking-tight">Language breakdown</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Weighted by public repositories and stars earned.
        </p>
        <div className="mt-6">
          <LanguageChart data={languages} />
        </div>
      </section>

      {/* Top repos */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Top projects</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Ranked by stars, forks, and community traction.
            </p>
          </div>
        </div>
        {topRepos.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topRepos.map((r, i) => (
              <div
                key={r.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <RepoCard repo={r} />
              </div>
            ))}
          </div>

        ) : (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
            No public projects yet.
          </div>
        )}
      </section>

      {/* Recommendations */}
      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 animate-fade-up gs-delay-300">
        <h2 className="text-xl font-semibold tracking-tight">Recommendations</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Concrete, personalized steps to level up your GitHub presence.
        </p>
        {recommendations.length ? (
          <ul className="mt-6 space-y-3">
            {recommendations.map((r) => {
              const Icon = r.severity === "important" ? AlertTriangle : r.severity === "suggestion" ? Lightbulb : Info;
              const color =
                r.severity === "important"
                  ? "text-warning"
                  : r.severity === "suggestion"
                    ? "text-brand"
                    : "text-muted-foreground";
              return (
                <li
                  key={r.id}
                  className="flex gap-3 rounded-xl border border-border bg-background/40 p-4"
                >
                  <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${color}`} />
                  <div>
                    <div className="font-medium text-sm">{r.title}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{r.description}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-6 text-sm text-muted-foreground">
            Everything looks great. This profile is well-optimized.
          </div>
        )}
      </section>

      <div className="text-center text-xs text-muted-foreground pt-4">
        Analyzed {formatDistanceToNow(new Date(), { addSuffix: true })} · Data from the public GitHub API
      </div>
    </div>
  );
}
