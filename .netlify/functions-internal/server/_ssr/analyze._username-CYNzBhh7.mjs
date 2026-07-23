import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { R as Route, a as analysisQuery } from "./router-Cw8m5JH4.mjs";
import { u as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { N as Nav } from "./nav-DrxeqzFR.mjs";
import { S as SearchForm } from "./search-form-CuLZPYzz.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { E as ExternalLink, B as Building2, M as MapPin, e as Globe, f as Calendar, g as Share2, U as Users, h as Star, i as GitFork, j as TriangleAlert, L as Lightbulb, I as Info, k as Circle } from "../_libs/lucide-react.mjs";
import { f as format, a as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { R as ResponsiveContainer, P as PieChart, a as Pie, C as Cell, T as Tooltip } from "../_libs/recharts.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./server-BaoOPsda.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/clsx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function useCountUp(target, duration = 1400) {
  const [value, setValue] = reactExports.useState(0);
  const startRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    startRef.current = null;
    const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    const tick = (ts) => {
      if (startRef.current === null) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current) / duration);
      setValue(Math.round(easeOutExpo(p) * target));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);
  return value;
}
function ScoreRing({ score, size = 200, label }) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score));
  const [mounted, setMounted] = reactExports.useState(false);
  const display = useCountUp(pct);
  reactExports.useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);
  const offset = mounted ? c - pct / 100 * c : c;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative inline-flex items-center justify-center animate-scale-in-soft",
      style: { width: size, height: size },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": true,
            className: "absolute inset-2 rounded-full blur-2xl opacity-40 animate-glow-pulse",
            style: { background: "conic-gradient(from 90deg, oklch(0.72 0.18 258 / 0.6), oklch(0.72 0.2 330 / 0.6), oklch(0.72 0.18 258 / 0.6))" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: size, height: size, className: "-rotate-90 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "gs-ring", x1: "0", y1: "0", x2: "1", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.72 0.18 258)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.72 0.2 330)" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: size / 2, cy: size / 2, r, stroke: "var(--color-border)", strokeWidth: stroke, fill: "none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: size / 2,
              cy: size / 2,
              r,
              stroke: "url(#gs-ring)",
              strokeWidth: stroke,
              fill: "none",
              strokeLinecap: "round",
              strokeDasharray: c,
              strokeDashoffset: offset,
              style: { transition: "stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1)" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl font-semibold tracking-tight tabular-nums", children: display }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground mt-1", children: label ?? "GitScope" })
        ] })
      ]
    }
  );
}
const COLORS = [
  "oklch(0.72 0.18 258)",
  "oklch(0.75 0.17 155)",
  "oklch(0.82 0.17 85)",
  "oklch(0.72 0.2 330)",
  "oklch(0.7 0.19 30)",
  "oklch(0.68 0.15 200)",
  "oklch(0.75 0.14 100)",
  "oklch(0.65 0.2 280)"
];
function LanguageChart({ data }) {
  if (!data.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "No language data available." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-48 h-48 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Pie,
        {
          data,
          dataKey: "value",
          nameKey: "name",
          innerRadius: 50,
          outerRadius: 80,
          paddingAngle: 2,
          stroke: "none",
          children: data.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: COLORS[i % COLORS.length] }, i))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tooltip,
        {
          contentStyle: {
            backgroundColor: "var(--color-popover)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12
          }
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-2 gap-x-6 gap-y-2 flex-1 w-full", children: data.map((lang, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "h-2.5 w-2.5 rounded-full shrink-0",
          style: { background: COLORS[i % COLORS.length] }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: lang.name })
    ] }, lang.name)) })
  ] });
}
function RepoCard({ repo }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: repo.html_url,
      target: "_blank",
      rel: "noreferrer",
      className: "group relative block overflow-hidden rounded-xl border border-border bg-card p-5 card-lift hover:border-brand/60 hover:bg-accent/40",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold truncate group-hover:text-brand transition-colors", children: repo.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5" }),
              " ",
              repo.stargazers_count
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GitFork, { className: "h-3.5 w-3.5" }),
              " ",
              repo.forks_count
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]", children: repo.description || "No description provided." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-4 text-xs text-muted-foreground", children: [
          repo.language && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2.5 w-2.5 fill-brand text-brand" }),
            repo.language
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Updated ",
            formatDistanceToNow(new Date(repo.pushed_at), { addSuffix: true })
          ] })
        ] }),
        repo.topics?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: repo.topics.slice(0, 4).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground",
            children: t
          },
          t
        )) })
      ]
    }
  );
}
function MetricCard({
  label,
  value,
  hint,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-xl border border-border bg-card p-5 card-lift hover:border-brand/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: label }),
      icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: icon })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-semibold tabular-nums", children: value }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: hint })
  ] });
}
function AnalyzePage() {
  const {
    username
  } = Route.useParams();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 max-w-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchForm, { size: "sm" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(AnalysisSkeleton, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnalysisReport, { username }) })
    ] })
  ] });
}
function AnalysisSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-pulse space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 rounded-2xl bg-card" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-4", children: Array.from({
      length: 4
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 rounded-xl bg-card" }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-80 rounded-2xl bg-card" })
  ] });
}
function AnalysisReport({
  username
}) {
  const {
    data
  } = useSuspenseQuery(analysisQuery(username));
  reactExports.useEffect(() => {
    document.title = `${data.user.login} - GitScope Report`;
  }, [data.user.login]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Report, { data });
}
const BREAKDOWN_LABELS = {
  activity: "Activity",
  quality: "Project Quality",
  diversity: "Tech Diversity",
  community: "Community",
  profile: "Profile"
};
function Report({
  data
}) {
  const {
    user,
    breakdown,
    score,
    rating,
    totalStars,
    totalForks,
    languages,
    topRepos,
    recommendations
  } = data;
  const share = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Report link copied to clipboard");
    } catch {
      toast.error("Couldn't copy link");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden rounded-3xl border border-border bg-card animate-scale-in-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-chart-4/10 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: user.avatar_url, alt: user.login, className: "h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border border-border shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-semibold tracking-tight truncate", children: user.name || user.login }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: user.html_url, target: "_blank", rel: "noreferrer", className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
              "@",
              user.login
            ] }),
            user.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm max-w-xl", children: user.bio }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground", children: [
              user.company && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3.5 w-3.5" }),
                " ",
                user.company
              ] }),
              user.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
                " ",
                user.location
              ] }),
              user.blog && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: user.blog.startsWith("http") ? user.blog : `https://${user.blog}`, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1.5 hover:text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3.5 w-3.5" }),
                " ",
                user.blog.replace(/^https?:\/\//, "")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                " Joined ",
                format(new Date(user.created_at), "MMM yyyy")
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 lg:min-w-[260px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreRing, { score }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: rating }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: share, className: "mt-3 inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs hover:bg-accent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-3.5 w-3.5" }),
              " Copy share link"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-up gs-delay-150", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Followers", value: user.followers.toLocaleString(), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Public Repos", value: user.public_repos.toLocaleString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Stars Earned", value: totalStars.toLocaleString(), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Forks Earned", value: totalForks.toLocaleString(), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GitFork, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 sm:p-8 animate-fade-up gs-delay-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold tracking-tight", children: "Score breakdown" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "How your GitScope score is composed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-4", children: Object.keys(BREAKDOWN_LABELS).map((k) => {
        const v = breakdown[k];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: BREAKDOWN_LABELS[k] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums text-muted-foreground", children: [
              v,
              "/100"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-brand to-chart-4", style: {
            width: `${v}%`,
            transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)"
          } }) })
        ] }, k);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 sm:p-8 animate-fade-up gs-delay-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold tracking-tight", children: "Language breakdown" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Weighted by public repositories and stars earned." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageChart, { data: languages }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-between mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold tracking-tight", children: "Top projects" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Ranked by stars, forks, and community traction." })
      ] }) }),
      topRepos.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: topRepos.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-fade-up", style: {
        animationDelay: `${i * 80}ms`
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RepoCard, { repo: r }) }, r.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground", children: "No public projects yet." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 sm:p-8 animate-fade-up gs-delay-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold tracking-tight", children: "Recommendations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Concrete, personalized steps to level up your GitHub presence." }),
      recommendations.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-3", children: recommendations.map((r) => {
        const Icon = r.severity === "important" ? TriangleAlert : r.severity === "suggestion" ? Lightbulb : Info;
        const color = r.severity === "important" ? "text-warning" : r.severity === "suggestion" ? "text-brand" : "text-muted-foreground";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 rounded-xl border border-border bg-background/40 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 mt-0.5 shrink-0 ${color}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm", children: r.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-0.5", children: r.description })
          ] })
        ] }, r.id);
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-sm text-muted-foreground", children: "Everything looks great. This profile is well-optimized." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs text-muted-foreground pt-4", children: [
      "Analyzed ",
      formatDistanceToNow(/* @__PURE__ */ new Date(), {
        addSuffix: true
      }),
      " · Data from the public GitHub API"
    ] })
  ] });
}
export {
  AnalyzePage as component
};
