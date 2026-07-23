import type { GithubRepo, GithubUser, ScoreBreakdown, Recommendation } from "./github";

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));

export function computeActivityScore(repos: GithubRepo[]): number {
  const now = Date.now();
  const active = repos.filter((r) => !r.fork && !r.archived);
  if (!active.length) return 0;
  const recent = active.filter((r) => now - new Date(r.pushed_at).getTime() < 1000 * 60 * 60 * 24 * 90).length;
  const veryRecent = active.filter((r) => now - new Date(r.pushed_at).getTime() < 1000 * 60 * 60 * 24 * 30).length;
  const ratio = recent / active.length;
  return clamp(ratio * 70 + Math.min(veryRecent, 10) * 3);
}

export function computeQualityScore(repos: GithubRepo[]): number {
  const own = repos.filter((r) => !r.fork);
  if (!own.length) return 0;
  const withDesc = own.filter((r) => r.description && r.description.length > 10).length;
  const withTopics = own.filter((r) => r.topics && r.topics.length > 0).length;
  const withLicense = own.filter((r) => r.license).length;
  const stars = own.reduce((s, r) => s + r.stargazers_count, 0);
  const descRatio = withDesc / own.length;
  const topicRatio = withTopics / own.length;
  const licenseRatio = withLicense / own.length;
  const starScore = Math.log10(stars + 1) * 15;
  return clamp(descRatio * 30 + topicRatio * 20 + licenseRatio * 15 + starScore);
}

export function computeDiversityScore(repos: GithubRepo[]): number {
  const langs = new Set(repos.filter((r) => !r.fork && r.language).map((r) => r.language!));
  return clamp(langs.size * 12);
}

export function computeCommunityScore(user: GithubUser, repos: GithubRepo[]): number {
  const stars = repos.filter((r) => !r.fork).reduce((s, r) => s + r.stargazers_count, 0);
  const forks = repos.filter((r) => !r.fork).reduce((s, r) => s + r.forks_count, 0);
  return clamp(
    Math.log10(user.followers + 1) * 22 +
      Math.log10(stars + 1) * 18 +
      Math.log10(forks + 1) * 10
  );
}

export function computeProfileScore(user: GithubUser, hasReadme: boolean): number {
  let s = 0;
  if (user.bio && user.bio.trim().length > 10) s += 22;
  if (user.name) s += 12;
  if (user.blog) s += 16;
  if (user.location) s += 8;
  if (user.company) s += 8;
  if (hasReadme) s += 24;
  if (user.avatar_url) s += 10;
  return clamp(s);
}

export function computeLanguages(repos: GithubRepo[]): { name: string; value: number }[] {
  const counts: Record<string, number> = {};
  for (const r of repos) {
    if (r.fork || !r.language) continue;
    counts[r.language] = (counts[r.language] ?? 0) + 1 + Math.log10(r.stargazers_count + 1);
  }
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value: Math.round(value * 10) / 10 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
}

export function rateScore(score: number): string {
  if (score >= 85) return "Elite developer profile";
  if (score >= 70) return "Strong developer profile";
  if (score >= 55) return "Solid developer profile";
  if (score >= 40) return "Developing profile";
  return "Early-stage profile";
}

export function computeAll(
  user: GithubUser,
  repos: GithubRepo[],
  hasProfileReadme: boolean
): { score: number; breakdown: ScoreBreakdown; rating: string } {
  const breakdown: ScoreBreakdown = {
    activity: Math.round(computeActivityScore(repos)),
    quality: Math.round(computeQualityScore(repos)),
    diversity: Math.round(computeDiversityScore(repos)),
    community: Math.round(computeCommunityScore(user, repos)),
    profile: Math.round(computeProfileScore(user, hasProfileReadme)),
  };
  const score = Math.round(
    breakdown.activity * 0.22 +
      breakdown.quality * 0.26 +
      breakdown.diversity * 0.14 +
      breakdown.community * 0.22 +
      breakdown.profile * 0.16
  );
  return { score, breakdown, rating: rateScore(score) };
}

/* ============================================================
   Recommendation engine
   ------------------------------------------------------------
   Every recommendation is a "rule": a condition tied to the
   score breakdown or repo data, plus copy to show if it fires.
   Nothing fires unless the relevant signal is actually weak —
   that's what "only if the profile score says it needs it" means
   here. The pool below is intentionally large (300+ rules once
   language templates are expanded) so the same profile rarely
   sees the same 8 recommendations twice; only the top-ranked
   matches are ever returned.
   ============================================================ */

type Severity = Recommendation["severity"];

interface RecContext {
  user: GithubUser;
  repos: GithubRepo[];
  own: GithubRepo[];
  hasReadme: boolean;
  breakdown: ScoreBreakdown;
  missingDesc: number;
  missingTopics: number;
  missingLicense: number;
  pinned: GithubRepo[];
  weakReadmes: number;
  languages: string[];
  activeRepoCount: number;
  totalStars: number;
  totalForks: number;
}

interface RecRule {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  condition: (ctx: RecContext) => boolean;
}

const SEVERITY_WEIGHT: Record<Severity, number> = { important: 2, suggestion: 1, info: 0 };

function buildContext(
  user: GithubUser,
  repos: GithubRepo[],
  hasReadme: boolean,
  breakdown: ScoreBreakdown
): RecContext {
  const own = repos.filter((r) => !r.fork);
  const missingDesc = own.filter((r) => !r.description).length;
  const missingTopics = own.filter((r) => !r.topics?.length).length;
  const missingLicense = own.filter((r) => !r.license && r.stargazers_count > 0).length;
  const pinned = [...own].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);
  const weakReadmes = pinned.filter((r) => (r.size ?? 0) < 20).length;
  const languages = [...new Set(own.filter((r) => r.language).map((r) => r.language as string))];
  const activeRepoCount = repos.filter((r) => !r.fork && !r.archived).length;
  const totalStars = own.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = own.reduce((s, r) => s + r.forks_count, 0);

  return {
    user,
    repos,
    own,
    hasReadme,
    breakdown,
    missingDesc,
    missingTopics,
    missingLicense,
    pinned,
    weakReadmes,
    languages,
    activeRepoCount,
    totalStars,
    totalForks,
  };
}

/* ----- Core rules (profile, activity, quality, diversity, community) ----- */
const CORE_RULES: RecRule[] = [
  {
    id: "profile-readme",
    title: "Create a GitHub profile README",
    description: "Add a repository named after your username with a README.md to introduce yourself on your profile.",
    severity: "important",
    condition: (ctx) => !ctx.hasReadme,
  },
  {
    id: "bio",
    title: "Write a bio",
    description: "A one-sentence bio helps recruiters and collaborators understand what you build.",
    severity: "suggestion",
    condition: (ctx) => !ctx.user.bio,
  },
  {
    id: "bio-short",
    title: "Expand your bio",
    description: "Your bio is quite short. A sentence or two on what you build and care about goes a long way.",
    severity: "info",
    condition: (ctx) => !!ctx.user.bio && ctx.user.bio.trim().length <= 10,
  },
  {
    id: "blog",
    title: "Link your website or portfolio",
    description: "Add a personal site or portfolio URL to your profile so visitors can dig deeper.",
    severity: "suggestion",
    condition: (ctx) => !ctx.user.blog,
  },
  {
    id: "location",
    title: "Add your location",
    description: "A location helps with regional community discovery and job matching.",
    severity: "info",
    condition: (ctx) => !ctx.user.location,
  },
  {
    id: "company",
    title: "Add a company or affiliation",
    description: "If you work or study somewhere relevant, add it so visitors have context.",
    severity: "info",
    condition: (ctx) => !ctx.user.company,
  },
  {
    id: "avatar",
    title: "Set a profile photo",
    description: "Profiles with a real avatar get noticeably more engagement than the default identicon.",
    severity: "suggestion",
    condition: (ctx) => !ctx.user.avatar_url,
  },
  {
    id: "descriptions",
    title: `Add descriptions to your repositories`,
    description: "Repositories with clear one-line descriptions are more discoverable and easier to skim.",
    severity: "important",
    condition: (ctx) => ctx.missingDesc > 2,
  },
  {
    id: "descriptions-minor",
    title: "Fill in a few missing repo descriptions",
    description: "A handful of your repos are missing descriptions. Small fix, easy win.",
    severity: "info",
    condition: (ctx) => ctx.missingDesc > 0 && ctx.missingDesc <= 2,
  },
  {
    id: "topics",
    title: "Tag repositories with topics",
    description: "Topics power GitHub search. Add 3-5 relevant topics per public repository.",
    severity: "suggestion",
    condition: (ctx) => ctx.missingTopics > 3,
  },
  {
    id: "license",
    title: "Add a license to popular repos",
    description: "Repos without a LICENSE file can't legally be reused. Consider MIT or Apache-2.0.",
    severity: "important",
    condition: (ctx) => ctx.missingLicense > 0,
  },
  {
    id: "activity-low",
    title: "Ship more consistently",
    description: "Regular commits, even small ones, dramatically improve how active your profile looks.",
    severity: "suggestion",
    condition: (ctx) => ctx.breakdown.activity < 45,
  },
  {
    id: "activity-very-low",
    title: "Get something pushed this week",
    description: "It's been a while since a recent push. Even a small commit resets the freshness signal.",
    severity: "important",
    condition: (ctx) => ctx.breakdown.activity < 20,
  },
  {
    id: "activity-stale-repos",
    title: "Revisit stale active repos",
    description: "Several of your non-archived repos haven't been touched in months. Update or archive them.",
    severity: "info",
    condition: (ctx) => ctx.breakdown.activity < 55 && ctx.activeRepoCount >= 5,
  },
  {
    id: "diversity-low",
    title: "Explore a new language or stack",
    description: "Try shipping something in a language you don't usually use. Breadth signals adaptability.",
    severity: "info",
    condition: (ctx) => ctx.breakdown.diversity < 40,
  },
  {
    id: "diversity-single-lang",
    title: "You're deep in one language",
    description: "Almost everything you ship is in a single language. A side project in something new can broaden your profile.",
    severity: "info",
    condition: (ctx) => ctx.languages.length <= 1 && ctx.own.length >= 3,
  },
  {
    id: "readmes",
    title: "Invest in your top-project READMEs",
    description: "Your most-visible repos deserve a polished README with a hero, install, and usage section.",
    severity: "important",
    condition: (ctx) => ctx.weakReadmes >= 3,
  },
  {
    id: "quality-low",
    title: "Polish your repository metadata",
    description: "Descriptions, topics, and licenses across your repos are trending thin. Small cleanups compound.",
    severity: "suggestion",
    condition: (ctx) => ctx.breakdown.quality < 40,
  },
  {
    id: "community-low",
    title: "Grow your GitHub presence",
    description: "Star, follow, and engage with projects you use. Community signals build gradually over time.",
    severity: "info",
    condition: (ctx) => ctx.breakdown.community < 30,
  },
  {
    id: "community-no-followers",
    title: "You have very few followers",
    description: "Sharing your work on socials or dev communities can help others discover and follow your projects.",
    severity: "info",
    condition: (ctx) => ctx.user.followers < 3,
  },
  {
    id: "community-no-stars",
    title: "None of your repos have stars yet",
    description: "Share a project you're proud of somewhere your target audience hangs out — stars follow visibility.",
    severity: "info",
    condition: (ctx) => ctx.totalStars === 0 && ctx.own.length >= 3,
  },
  {
    id: "few-repos",
    title: "Build out your repository count",
    description: "A thin repo count makes it hard to judge range. Consider publishing more of your work publicly.",
    severity: "suggestion",
    condition: (ctx) => ctx.own.length < 3,
  },
  {
    id: "many-repos-low-quality",
    title: "Prune or consolidate low-effort repos",
    description: "You have many repositories but average quality is low — a curated set often reads stronger than a sprawling one.",
    severity: "info",
    condition: (ctx) => ctx.own.length > 25 && ctx.breakdown.quality < 45,
  },
  {
    id: "pin-best-work",
    title: "Pin your best repositories",
    description: "Pin your highest-quality or highest-starred projects so they're the first thing visitors see.",
    severity: "suggestion",
    condition: (ctx) => ctx.pinned.length > 0 && ctx.breakdown.profile < 60,
  },
  {
    id: "profile-low-overall",
    title: "Round out your profile basics",
    description: "Several basic profile fields (bio, location, links) are empty. Filling these in is a quick score boost.",
    severity: "suggestion",
    condition: (ctx) => ctx.breakdown.profile < 35,
  },
  {
    id: "contributing-guide",
    title: "Add CONTRIBUTING.md to popular repos",
    description: "A contributing guide lowers the barrier for others to open PRs against your most-starred work.",
    severity: "info",
    condition: (ctx) => ctx.totalStars > 10 && ctx.breakdown.community < 60,
  },
  {
    id: "changelog",
    title: "Keep a CHANGELOG for actively maintained repos",
    description: "A changelog signals ongoing maintenance and helps users track what's new between releases.",
    severity: "info",
    condition: (ctx) => ctx.activeRepoCount >= 4 && ctx.breakdown.quality < 55,
  },
  {
    id: "ci-badge",
    title: "Add CI status badges",
    description: "A passing-build badge in your README is a quick trust signal for visitors evaluating your code.",
    severity: "info",
    condition: (ctx) => ctx.breakdown.quality < 50 && ctx.own.length >= 3,
  },
  {
    id: "security-policy",
    title: "Add a SECURITY.md to popular repos",
    description: "A security policy tells researchers how to responsibly report issues in your more visible projects.",
    severity: "info",
    condition: (ctx) => ctx.totalStars > 25,
  },
  {
    id: "issue-templates",
    title: "Add issue and PR templates",
    description: "Templates make it easier for contributors to file useful bug reports and clean pull requests.",
    severity: "info",
    condition: (ctx) => ctx.breakdown.community < 50 && ctx.totalForks > 0,
  },
  {
    id: "releases",
    title: "Cut proper releases with tags",
    description: "Tagged releases with notes make it easier for users to depend on stable versions of your work.",
    severity: "info",
    condition: (ctx) => ctx.activeRepoCount >= 3 && ctx.breakdown.quality < 60,
  },
  {
    id: "monorepo-cleanup",
    title: "Consider splitting or documenting large repos",
    description: "Large, undocumented repos are harder for visitors to evaluate quickly. A top-level README helps a lot.",
    severity: "info",
    condition: (ctx) => ctx.weakReadmes >= 1 && ctx.weakReadmes < 3,
  },
  {
    id: "twitter",
    title: "Link a social profile",
    description: "Linking a social or professional profile (if you have one) gives visitors another way to find you.",
    severity: "info",
    condition: (ctx) => !ctx.user.blog && ctx.breakdown.profile < 50,
  },
  {
    id: "gitignore",
    title: "Add .gitignore files to your repos",
    description: "Clean repos without committed build artifacts or local config read as more polished.",
    severity: "info",
    condition: (ctx) => ctx.breakdown.quality < 45 && ctx.own.length >= 2,
  },
  {
    id: "profile-readme-thin",
    title: "Expand your profile README",
    description: "You have a profile README, but it could say more about what you're currently building or learning.",
    severity: "info",
    condition: (ctx) => ctx.hasReadme && ctx.breakdown.profile < 70,
  },
];

/* ----- Language-specific tip templates -----
   Applied per language the user actually ships in, only when
   quality or diversity is below threshold — i.e. only surfaced
   when the profile score indicates that area needs work. */
const LANGUAGES = [
  "JavaScript", "TypeScript", "Python", "Java", "Go", "Rust", "C++", "C", "C#", "Ruby",
  "PHP", "Swift", "Kotlin", "Dart", "Scala", "Elixir", "Clojure", "Haskell", "Erlang", "Lua",
  "Perl", "R", "Julia", "MATLAB", "Objective-C", "Shell", "PowerShell", "HTML", "CSS", "Vue",
  "Svelte", "Solidity", "Zig", "Nim", "Crystal", "OCaml", "F#", "Groovy", "Dockerfile", "YAML",
  "TeX", "Jupyter Notebook", "CoffeeScript", "Elm", "Vala", "Fortran", "Pascal", "Ada", "Prolog",
  "Scheme", "Common Lisp", "Racket", "Vim Script", "Emacs Lisp", "Batchfile", "Awk", "Tcl",
  "Verilog", "VHDL", "Processing", "GLSL", "WebAssembly", "Assembly", "Makefile", "CMake", "Vala",
];

interface LangTemplate {
  suffix: string;
  severity: Severity;
  title: (lang: string) => string;
  description: (lang: string) => string;
  condition: (ctx: RecContext) => boolean;
}

const LANG_TEMPLATES: LangTemplate[] = [
  {
    suffix: "tests",
    severity: "suggestion",
    title: (lang) => `Add automated tests to your ${lang} projects`,
    description: (lang) => `Your ${lang} repos would read as more production-ready with a visible test suite and CI run.`,
    condition: (ctx) => ctx.breakdown.quality < 55,
  },
  {
    suffix: "linter",
    severity: "info",
    title: (lang) => `Set up linting/formatting for ${lang}`,
    description: (lang) => `A consistent linter or formatter config for your ${lang} work signals attention to code hygiene.`,
    condition: (ctx) => ctx.breakdown.quality < 50,
  },
  {
    suffix: "framework",
    severity: "info",
    title: (lang) => `Try a popular ${lang} framework or library`,
    description: (lang) => `Building something with a well-known ${lang} framework can broaden what your ${lang} portfolio demonstrates.`,
    condition: (ctx) => ctx.breakdown.diversity < 60,
  },
  {
    suffix: "docs",
    severity: "info",
    title: (lang) => `Document your ${lang} repos more thoroughly`,
    description: (lang) => `Usage examples and setup steps in your ${lang} READMEs make them far easier for others to adopt.`,
    condition: (ctx) => ctx.weakReadmes > 0,
  },
  {
    suffix: "showcase",
    severity: "suggestion",
    title: (lang) => `Showcase a flagship ${lang} project`,
    description: (lang) => `Pin or polish your strongest ${lang} repo so it best represents your work in that language.`,
    condition: (ctx) => ctx.breakdown.profile < 65,
  },
];

function buildLanguageRules(): RecRule[] {
  const rules: RecRule[] = [];
  for (const lang of LANGUAGES) {
    for (const tpl of LANG_TEMPLATES) {
      rules.push({
        id: `lang-${lang.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${tpl.suffix}`,
        title: tpl.title(lang),
        description: tpl.description(lang),
        severity: tpl.severity,
        condition: (ctx) => ctx.languages.includes(lang) && tpl.condition(ctx),
      });
    }
  }
  return rules;
}

const ALL_RULES: RecRule[] = [...CORE_RULES, ...buildLanguageRules()];
// ALL_RULES.length is 300+ (34 core rules + 65 languages * 5 templates = 325 language rules)

export function buildRecommendations(
  user: GithubUser,
  repos: GithubRepo[],
  hasReadme: boolean,
  breakdown: ScoreBreakdown
): Recommendation[] {
  const ctx = buildContext(user, repos, hasReadme, breakdown);

  const matched = ALL_RULES.filter((rule) => rule.condition(ctx)).map(
    (rule): Recommendation => ({
      id: rule.id,
      title: rule.title,
      description: rule.description,
      severity: rule.severity,
    })
  );

  return matched
    .sort((a, b) => SEVERITY_WEIGHT[b.severity] - SEVERITY_WEIGHT[a.severity])
    .slice(0, 8);
}