// Live GitHub data for the Build Log section. Everything here is fetched
// client-side from public, token-free endpoints so the heatmap and the
// stats refresh on every page load with no build step involved.
//
//  - Contributions: github-contributions-api.jogruber.de (scrapes the public
//    contribution graph; same source `react-github-calendar` uses).
//  - Profile + repos: api.github.com (unauthenticated, 60 req/hour per IP —
//    plenty for a portfolio, and we cache in sessionStorage anyway).

export const GITHUB_USERNAME = "AnanthuNarashimman";
export const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

const CONTRIB_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;
const PROFILE_API = `https://api.github.com/users/${GITHUB_USERNAME}`;
const REPOS_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

const CACHE_KEY = "gh-buildlog-v1";
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

const readCache = () => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { savedAt, data } = JSON.parse(raw);
    return Date.now() - savedAt < CACHE_TTL ? data : null;
  } catch {
    return null;
  }
};

const writeCache = (data) => {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ savedAt: Date.now(), data }),
    );
  } catch {
    /* storage unavailable (private mode etc.) — fine, just refetch next time */
  }
};

const fetchJson = async (url) => {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
};

/**
 * Streaks are computed from the daily array (which is sorted ascending).
 * "Current" streak ignores today if today has no commits yet — otherwise the
 * number would drop to 0 every morning.
 */
const computeStreaks = (days) => {
  let longest = 0;
  let run = 0;
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0;
    if (run > longest) longest = run;
  }

  let current = 0;
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i -= 1; // today may still be empty
  for (; i >= 0 && days[i].count > 0; i -= 1) current += 1;

  return { current, longest };
};

const busiestDay = (days) =>
  days.reduce(
    (best, day) => (day.count > best.count ? day : best),
    { date: null, count: 0 },
  );

const topLanguages = (repos, limit = 4) => {
  const tally = {};
  for (const repo of repos) {
    if (!repo.language || repo.fork) continue;
    tally[repo.language] = (tally[repo.language] || 0) + 1;
  }
  return Object.entries(tally)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
};

/**
 * Resolves to:
 * {
 *   contributions: Activity[]   // { date, count, level } — ready for the calendar
 *   totalLastYear, currentStreak, longestStreak, busiest: { date, count },
 *   publicRepos, followers, stars, languages: [{ name, count }],
 *   partial: boolean            // true when profile/repos failed but graph loaded
 * }
 */
export async function fetchGithubBuildLog() {
  const cached = readCache();
  if (cached) return cached;

  // The graph is the headline; profile/repos are nice-to-have, so a failure
  // there degrades to "partial" instead of taking the whole panel down.
  const contrib = await fetchJson(CONTRIB_API);
  const days = contrib.contributions ?? [];

  let profile = null;
  let repos = [];
  let partial = false;
  try {
    [profile, repos] = await Promise.all([
      fetchJson(PROFILE_API),
      fetchJson(REPOS_API),
    ]);
  } catch {
    partial = true;
  }

  const { current, longest } = computeStreaks(days);

  const data = {
    contributions: days,
    totalLastYear:
      contrib.total?.lastYear ?? days.reduce((sum, d) => sum + d.count, 0),
    currentStreak: current,
    longestStreak: longest,
    busiest: busiestDay(days),
    publicRepos: profile?.public_repos ?? null,
    followers: profile?.followers ?? null,
    stars: repos.length
      ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
      : null,
    languages: topLanguages(repos),
    partial,
  };

  writeCache(data);
  return data;
}

export const formatDay = (iso) => {
  if (!iso) return "";
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
