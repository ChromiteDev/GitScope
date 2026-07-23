import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as Github } from "../_libs/lucide-react.mjs";
const logo = "/assets/gitscope-logo-BJS9YnqK.png";
function Nav() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 border-b border-border/60 backdrop-blur-xl bg-background/70", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-14 max-w-6xl items-center justify-between px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 font-semibold tracking-tight", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "GitScope", width: 24, height: 24, className: "rounded-md" }),
      "GitScope"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-1 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/leaderboard",
          className: "rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-accent",
          children: "Leaderboard"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/about",
          className: "rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-accent",
          children: "About"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: "https://github.com/ChromiteDev/GitScope",
          target: "_blank",
          rel: "noreferrer",
          className: "ml-1 inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-accent",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "h-4 w-4" }),
            " GitHub"
          ]
        }
      )
    ] })
  ] }) });
}
export {
  Nav as N
};
