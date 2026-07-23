import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as Nav } from "./nav-DrxeqzFR.mjs";
import { S as SearchForm } from "./search-form-CuLZPYzz.mjs";
import { S as Sparkles, A as Award, G as GitBranch, C as ChartLine, a as Activity, U as Users } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const EXAMPLES = ["torvalds", "gaearon", "sindresorhus", "yyx990803", "tj"];
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-glow" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-40 animate-blob", style: {
      background: "radial-gradient(closest-side, oklch(0.72 0.18 258 / 0.55), transparent)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full blur-3xl opacity-30 animate-blob gs-delay-1000", style: {
      background: "radial-gradient(closest-side, oklch(0.72 0.2 330 / 0.55), transparent)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-6 pt-24 pb-20 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-xs text-muted-foreground animate-fade-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-brand animate-glow-pulse" }),
          "Open source · No sign-in · Uses public GitHub data"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter leading-[1.05] animate-fade-up gs-delay-150", children: [
          "Understand your GitHub.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-animated", children: "Improve your presence." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-xl text-base sm:text-lg text-muted-foreground animate-fade-up gs-delay-300", children: "GitScope turns any GitHub profile into a measurable developer portfolio, with a 0–100 score, project rankings, and personalized recommendations." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-10 max-w-xl animate-fade-up gs-delay-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SearchForm, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Try:" }),
            EXAMPLES.map((ex, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/analyze/$username", params: {
              username: ex
            }, className: "rounded-full border border-border px-2.5 py-0.5 hover:text-foreground hover:border-brand/60 hover:-translate-y-0.5 transition-all animate-fade-up", style: {
              animationDelay: `${700 + i * 60}ms`
            }, children: ex }, ex))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-6xl px-6 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-3", children: [{
        icon: Award,
        title: "GitScope Score",
        text: "A single 0–100 score summarizing activity, quality, diversity, community, and profile polish."
      }, {
        icon: GitBranch,
        title: "Repository intelligence",
        text: "See which projects actually matter, ranked by real signals, not just star counts."
      }, {
        icon: ChartLine,
        title: "Language breakdown",
        text: "Visualize the technologies you actually ship in, weighted by traction."
      }, {
        icon: Sparkles,
        title: "Smart recommendations",
        text: "Rule-based, personalized suggestions to level up your profile. No AI hand-waving."
      }, {
        icon: Activity,
        title: "Activity heatmap",
        text: "Consistency signals: recent commits, maintenance, and repository freshness."
      }, {
        icon: Users,
        title: "Community reach",
        text: "Followers, forks, and stars, weighted so bots and empty repos don't distort the score."
      }].map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 card-lift hover:border-brand/40 animate-fade-up", style: {
        animationDelay: `${150 + i * 90}ms`
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl", style: {
          background: "radial-gradient(400px circle at var(--x,50%) var(--y,0%), oklch(0.72 0.18 258 / 0.12), transparent 40%)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-5 w-5 text-brand transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-semibold", children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground leading-relaxed", children: f.text })
      ] }, f.title)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-6 pb-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl font-semibold tracking-tight text-center animate-fade-up", children: "How it works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-3", children: [{
          n: "01",
          t: "Enter a username",
          d: "Any public GitHub handle. Yours or someone you admire."
        }, {
          n: "02",
          t: "We fetch public data",
          d: "Profile, repos, languages, and README signals via the GitHub API."
        }, {
          n: "03",
          t: "Get your report",
          d: "A polished score breakdown with concrete steps to improve."
        }].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 card-lift animate-fade-up", style: {
          animationDelay: `${150 + i * 120}ms`
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono text-brand", children: s.n }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-lg font-semibold", children: s.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: s.d })
        ] }, s.n)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-6xl px-6 pb-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-card overflow-hidden relative animate-scale-in-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-chart-4/10 pointer-events-none animate-glow-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-10 md:p-14 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl font-semibold tracking-tight", children: "Free & open source" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-lg text-muted-foreground", children: "GitScope is MIT-licensed. Self-host it, fork it, or contribute new metrics. No paywall, no accounts." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex justify-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://github.com", target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 backdrop-blur px-5 py-2.5 text-sm font-medium hover:bg-accent hover:-translate-y-0.5", children: "Star on GitHub" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:-translate-y-0.5 hover:shadow-lg", children: "Learn more" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " GitScope. MIT Licensed."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Built with public GitHub data. Not affiliated with GitHub, Inc." })
      ] }) })
    ] })
  ] });
}
export {
  Landing as component
};
