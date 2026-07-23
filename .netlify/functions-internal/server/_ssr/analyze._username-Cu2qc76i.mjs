import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as Nav } from "./nav-DrxeqzFR.mjs";
import { S as SearchForm } from "./search-form-CuLZPYzz.mjs";
import { j as TriangleAlert } from "../_libs/lucide-react.mjs";
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
function AnalyzeError({
  error,
  reset
}) {
  const router = useRouter();
  const msg = error?.message ?? "Something went wrong analyzing that profile.";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-6 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mx-auto h-10 w-10 text-warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-2xl font-semibold tracking-tight", children: "We couldn't load that profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: msg }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 mx-auto max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchForm, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          router.invalidate();
          reset?.();
        }, className: "rounded-xl border border-border px-4 py-2 text-sm hover:bg-accent", children: "Try again" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-xl bg-foreground text-background px-4 py-2 text-sm font-medium", children: "Go home" })
      ] })
    ] })
  ] });
}
export {
  AnalyzeError as errorComponent
};
