import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";

export function SearchForm({ size = "lg" }: { size?: "lg" | "sm" }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = value.trim().replace(/^@/, "").replace(/^https?:\/\/github\.com\//, "").split("/")[0];
    if (!cleaned) return;
    navigate({ to: "/analyze/$username", params: { username: cleaned } });
  };

  const isLg = size === "lg";
  return (
    <form onSubmit={submit} className="w-full">
      <div
        className={`group relative flex items-center gap-2 rounded-2xl border border-border bg-card/60 backdrop-blur-md pl-4 pr-2 py-2 transition-all focus-within:border-brand/60 focus-within:shadow-[0_0_0_4px_oklch(0.72_0.18_258_/_0.15)] ${isLg ? "" : "py-1.5"}`}
      >
        <Search className={`text-muted-foreground shrink-0 ${isLg ? "h-5 w-5" : "h-4 w-4"}`} />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a GitHub username…"
          className={`flex-1 bg-transparent outline-none placeholder:text-muted-foreground/60 ${isLg ? "text-base py-2" : "text-sm"}`}
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className={`inline-flex items-center gap-1.5 rounded-xl bg-foreground text-background font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] ${isLg ? "px-4 py-2 text-sm" : "px-3 py-1.5 text-xs"}`}
        >
          Analyze <ArrowRight className={isLg ? "h-4 w-4" : "h-3.5 w-3.5"} />
        </button>
      </div>
    </form>
  );
}
