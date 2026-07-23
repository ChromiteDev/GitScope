export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  topics: string[];
  size: number;
  pushed_at: string;
  updated_at: string;
  created_at: string;
  archived: boolean;
  has_wiki: boolean;
  license: { spdx_id: string; name: string } | null;
}

export interface ScoreBreakdown {
  activity: number;
  quality: number;
  diversity: number;
  community: number;
  profile: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  severity: "info" | "suggestion" | "important";
}

export interface AnalysisResult {
  user: GithubUser;
  repos: GithubRepo[];
  score: number;
  breakdown: ScoreBreakdown;
  rating: string;
  languages: { name: string; value: number }[];
  topRepos: GithubRepo[];
  recommendations: Recommendation[];
  totalStars: number;
  totalForks: number;
  hasProfileReadme: boolean;
}
