import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as Nav } from "./nav-DrxeqzFR.mjs";
import { T as Trophy } from "../_libs/lucide-react.mjs";
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
const TRENDING = [{
  username: "torvalds",
  note: "Creator of Linux & Git"
}, {
  username: "gaearon",
  note: "React core team"
}, {
  username: "sindresorhus",
  note: "Prolific OSS maintainer"
}, {
  username: "yyx990803",
  note: "Creator of Vue.js"
}, {
  username: "tj",
  note: "Node.js & Express"
}, {
  username: "kentcdodds",
  note: "Testing & React educator"
}, {
  username: "addyosmani",
  note: "Web performance advocate"
}, {
  username: "leerob",
  note: "VP DX at Vercel"
}];
function LeaderboardPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-6 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "mx-auto h-8 w-8 text-brand" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-4xl font-semibold tracking-tight", children: "Trending developers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Hand-picked profiles worth analyzing on GitScope." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 rounded-2xl border border-border bg-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: TRENDING.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/analyze/$username", params: {
        username: d.username
      }, className: "flex items-center gap-4 px-5 py-4 hover:bg-accent/40 transition-colors group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-right font-mono text-xs text-muted-foreground", children: String(i + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://github.com/${d.username}.png?size=80`, alt: d.username, className: "h-10 w-10 rounded-full border border-border", loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium group-hover:text-brand transition-colors", children: d.username }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: d.note })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Analyze →" })
      ] }) }, d.username)) }) })
    ] })
  ] });
}
export {
  LeaderboardPage as component
};
