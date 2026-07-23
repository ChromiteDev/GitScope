import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/gitscope/nav";
import { SearchForm } from "@/components/gitscope/search-form";
import { Activity, GitBranch, Award, Sparkles, Users, LineChart } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GitScope - Understand your GitHub. Improve your presence." },
      {
        name: "description",
        content:
          "GitScope analyzes any GitHub profile and generates a 0–100 developer score with recommendations, project rankings, and language breakdowns.",
      },
      { property: "og:title", content: "GitScope - Developer Intelligence for GitHub" },
      {
        property: "og:description",
        content:
          "Turn your GitHub profile into a measurable developer portfolio. Free & open source.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const EXAMPLES = ["torvalds", "gaearon", "sindresorhus", "yyx990803", "tj"];

function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-40 animate-blob"
        style={{ background: "radial-gradient(closest-side, oklch(0.72 0.18 258 / 0.55), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full blur-3xl opacity-30 animate-blob gs-delay-1000"
        style={{ background: "radial-gradient(closest-side, oklch(0.72 0.2 330 / 0.55), transparent)" }}
      />

      <div className="relative">
        <Nav />

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-xs text-muted-foreground animate-fade-up">
            <Sparkles className="h-3.5 w-3.5 text-brand animate-glow-pulse" />
            Open source · No sign-in · Uses public GitHub data
          </div>
          <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter leading-[1.05] animate-fade-up gs-delay-150">
            Understand your GitHub.
            <br />
            <span className="text-gradient-animated">Improve your presence.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-muted-foreground animate-fade-up gs-delay-300">
            GitScope turns any GitHub profile into a measurable developer portfolio, with a 0–100 score,
            project rankings, and personalized recommendations.
          </p>
          <div className="mx-auto mt-10 max-w-xl animate-fade-up gs-delay-500">
            <SearchForm />
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <span>Try:</span>
              {EXAMPLES.map((ex, i) => (
                <Link
                  key={ex}
                  to="/analyze/$username"
                  params={{ username: ex }}
                  className="rounded-full border border-border px-2.5 py-0.5 hover:text-foreground hover:border-brand/60 hover:-translate-y-0.5 transition-all animate-fade-up"
                  style={{ animationDelay: `${700 + i * 60}ms` }}
                >
                  {ex}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Award,
                title: "GitScope Score",
                text: "A single 0–100 score summarizing activity, quality, diversity, community, and profile polish.",
              },
              {
                icon: GitBranch,
                title: "Repository intelligence",
                text: "See which projects actually matter, ranked by real signals, not just star counts.",
              },
              {
                icon: LineChart,
                title: "Language breakdown",
                text: "Visualize the technologies you actually ship in, weighted by traction.",
              },
              {
                icon: Sparkles,
                title: "Smart recommendations",
                text: "Rule-based, personalized suggestions to level up your profile. No AI hand-waving.",
              },
              {
                icon: Activity,
                title: "Activity heatmap",
                text: "Consistency signals: recent commits, maintenance, and repository freshness.",
              },
              {
                icon: Users,
                title: "Community reach",
                text: "Followers, forks, and stars, weighted so bots and empty repos don't distort the score.",
              },
            ].map((f, i) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 card-lift hover:border-brand/40 animate-fade-up"
                style={{ animationDelay: `${150 + i * 90}ms` }}
              >
                <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: "radial-gradient(400px circle at var(--x,50%) var(--y,0%), oklch(0.72 0.18 258 / 0.12), transparent 40%)" }}
                />
                <f.icon className="h-5 w-5 text-brand transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center animate-fade-up">How it works</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Enter a username", d: "Any public GitHub handle. Yours or someone you admire." },
              { n: "02", t: "We fetch public data", d: "Profile, repos, languages, and README signals via the GitHub API." },
              { n: "03", t: "Get your report", d: "A polished score breakdown with concrete steps to improve." },
            ].map((s, i) => (
              <div
                key={s.n}
                className="rounded-2xl border border-border bg-card p-6 card-lift animate-fade-up"
                style={{ animationDelay: `${150 + i * 120}ms` }}
              >
                <div className="text-xs font-mono text-brand">{s.n}</div>
                <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* OSS */}
        <section className="mx-auto max-w-6xl px-6 pb-32">
          <div className="rounded-3xl border border-border bg-card overflow-hidden relative animate-scale-in-soft">
            <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-chart-4/10 pointer-events-none animate-glow-pulse" />
            <div className="relative p-10 md:p-14 text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Free & open source</h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                GitScope is MIT-licensed. Self-host it, fork it, or contribute new metrics. No paywall, no accounts.
              </p>
              <div className="mt-8 flex justify-center gap-3">
                <a
                  href="https://github.com/ChromiteDev/GitScope"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 backdrop-blur px-5 py-2.5 text-sm font-medium hover:bg-accent hover:-translate-y-0.5"
                >
                  Star on GitHub
                </a>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-border/60">
          <div className="mx-auto max-w-6xl px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} GitScope. MIT Licensed.</span>
            <span>Built with public GitHub data. Not affiliated with GitHub, Inc.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
