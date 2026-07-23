import { Link } from "@tanstack/react-router";
import { Github } from "lucide-react";
import logo from "@/assets/gitscope-logo.png";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-xl bg-background/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <img src={logo} alt="GitScope" width={24} height={24} className="rounded-md" />
          GitScope
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/leaderboard"
            className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            Leaderboard
          </Link>
          <Link
            to="/about"
            className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            About
          </Link>
          <a
            href="https://github.com/ChromiteDev/GitScope"
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}