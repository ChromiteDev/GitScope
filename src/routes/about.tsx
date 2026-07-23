import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/gitscope/nav";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - GitScope" },
      {
        name: "description",
        content: "GitScope is an open-source developer intelligence platform for GitHub profiles.",
      },
      { property: "og:title", content: "About GitScope" },
      { property: "og:description", content: "Developer intelligence, open source." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="text-4xl font-semibold tracking-tight">About GitScope</h1>
        <div className="mt-8 space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground">Our mission</h2>
            <p className="mt-2">
              Developers spend years building on GitHub, yet most profiles fail to communicate what they can do.
              GitScope turns a public GitHub profile into a measurable developer portfolio - with concrete,
              actionable steps to improve.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">Open source</h2>
            <p className="mt-2">
              GitScope is MIT-licensed. The scoring rules, recommendation logic, and UI are all open. Fork it,
              self-host it, or contribute a new metric - the goal is a fair, transparent standard the community
              trusts.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">How we score</h2>
            <p className="mt-2">
              We combine five weighted dimensions - Activity, Project Quality, Tech Diversity, Community Reach,
              and Profile Presentation - into a single 0–100 GitScope score. No black-box AI: every input is a
              deterministic public GitHub signal.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">Privacy</h2>
            <p className="mt-2">
              GitScope only uses public GitHub API data. We don't require sign-in, don't store your credentials,
              and never post on your behalf.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
