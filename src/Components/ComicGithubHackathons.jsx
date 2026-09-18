// Build Log: live GitHub contribution heatmap + stats, followed by the
// hackathon diaries strip and the "invite me" call-to-action.
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ActivityCalendar } from "react-activity-calendar";
import "react-activity-calendar/tooltips.css";
import {
  Github,
  GitCommitHorizontal,
  Flame,
  Zap,
  FolderGit2,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Trophy,
  RefreshCw,
} from "lucide-react";

import { fetchGithubBuildLog, formatDay, GITHUB_URL, GITHUB_USERNAME } from "../lib/github";
import { hackathons } from "../data/hackathons";
import HackathonCard from "./HackathonCard";
import HackathonInviteModal from "./HackathonInviteModal";
import "../ComponentStyles/ComicGithubHackathons.css";

// Parchment -> yellow -> red. Flat, no gradients; sits on the white panel.
const HEAT_THEME = {
  light: ["#efe8d2", "#ffe135", "#ffb300", "#ff6d00", "#ff1744"],
};

const fmt = (n) => (n === null || n === undefined ? "—" : n.toLocaleString("en-US"));

function StatTile({ icon, tone, value, label }) {
  const Icon = icon;
  return (
    <div className="gh-stat">
      <span className={`gh-stat-icon gh-stat-icon--${tone}`}>
        <Icon size={18} strokeWidth={2.5} />
      </span>
      <span className="gh-stat-body">
        <span className="gh-stat-value">{value}</span>
        <span className="gh-stat-label">{label}</span>
      </span>
    </div>
  );
}

function ComicGithubHackathons() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [blockSize, setBlockSize] = useState(12);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [railHeight, setRailHeight] = useState(null);
  const [stepPx, setStepPx] = useState(0);
  const heatRef = useRef(null);
  const railRef = useRef(null);
  const slideRefs = useRef([]);

  // Live fetch on mount (cached in sessionStorage for 30 min — see lib/github)
  useEffect(() => {
    let cancelled = false;
    fetchGithubBuildLog()
      .then((result) => !cancelled && setData(result))
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  // Smaller squares on phones so the whole year needs less side-scrolling
  useEffect(() => {
    const query = window.matchMedia("(max-width: 600px)");
    const sync = () => setBlockSize(query.matches ? 10 : 12);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // When the heatmap is wider than the panel, start at the recent end
  useEffect(() => {
    const el = heatRef.current;
    if (!el || !data) return;
    el.scrollLeft = el.scrollWidth;
  }, [data, blockSize]);

  // The rail is transform-driven rather than a scroll container, so the slide
  // is one continuous eased move instead of a snap that cuts off mid-scroll.
  const lastIndex = hackathons.length - 1;

  // The rail takes the height of whichever card is showing, rather than
  // stretching every card to match the longest one. Without this, the tallest
  // entry (EVM Capital) sets the height for all eight, leaving a dead gap
  // between the text and the place badge on every shorter card — worst on
  // phones, where the two note columns stack and the difference doubles.
  useLayoutEffect(() => {
    const slide = slideRefs.current[activeCard];
    if (!slide) return undefined;

    const measure = () => setRailHeight(slide.getBoundingClientRect().height);
    measure();

    // Re-measure on reflow: viewport resize, late-loading webfonts, wrapping
    const observer = new ResizeObserver(measure);
    observer.observe(slide);
    return () => observer.disconnect();
  }, [activeCard]);

  // One slide plus the rail gap, in pixels. The rail moves in px rather than
  // percentages so a drag in progress and the settle afterwards share units.
  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    const measure = () => {
      const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
      setStepPx(rail.getBoundingClientRect().width + gap);
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  const clamp = (index) => Math.min(lastIndex, Math.max(0, index));

  const step = (dir) => setActiveCard((prev) => clamp(prev + dir));

  const jumpTo = (index) => setActiveCard(index);

  // ── Swipe ──────────────────────────────────────────────────────────
  // The rail follows the finger instead of waiting for the lift: writing the
  // transform straight onto the node keeps the drag off React's render path,
  // so a move costs one style write rather than a re-render of eight cards.
  const drag = useRef({ active: false, axis: null, x: 0, y: 0, dx: 0, at: 0, prevDx: 0, prevAt: 0 });

  const handleTouchStart = (event) => {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    drag.current = {
      active: true,
      axis: null,
      x: touch.clientX,
      y: touch.clientY,
      dx: 0,
      at: event.timeStamp,
      prevDx: 0,
      prevAt: event.timeStamp,
    };
  };

  const handleTouchMove = (event) => {
    const d = drag.current;
    const rail = railRef.current;
    if (!d.active || !rail) return;

    const touch = event.touches[0];
    const dx = touch.clientX - d.x;
    const dy = touch.clientY - d.y;

    // Lock to an axis once the finger has committed, so a vertical flick
    // through the strip scrolls the page instead of nudging the rail.
    if (!d.axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      d.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (d.axis === "x") rail.style.transition = "none";
    }
    if (d.axis !== "x") return;

    // Half-speed past either end: the rail gives, but tells you it is the end
    const overscroll =
      (activeCard === 0 && dx > 0) || (activeCard === lastIndex && dx < 0);
    // Velocity is read from the last leg only, so a slow drag that ends in a
    // flick still throws — an average over the whole gesture would swallow it.
    d.prevDx = d.dx;
    d.prevAt = d.at;
    d.dx = overscroll ? dx * 0.35 : dx;
    d.at = event.timeStamp;
    rail.style.transform = `translate3d(${-activeCard * stepPx + d.dx}px, 0, 0)`;
  };

  const handleTouchEnd = (event) => {
    const d = drag.current;
    const rail = railRef.current;
    d.active = false;
    if (d.axis !== "x" || !rail) return;

    // A short flick counts as much as a long drag
    const elapsed = Math.max(1, d.at - d.prevAt);
    const held = event.timeStamp - d.at > 100; // finger parked before lifting
    const flick = !held && Math.abs((d.dx - d.prevDx) / elapsed) > 0.35;
    const next =
      flick || Math.abs(d.dx) > stepPx * 0.2
        ? clamp(activeCard + (d.dx < 0 ? 1 : -1))
        : activeCard;

    // Hand the transform back to the stylesheet's easing for the settle
    rail.style.transition = "";
    rail.style.transform = `translate3d(${-next * stepPx}px, 0, 0)`;
    if (next !== activeCard) setActiveCard(next);
  };

  const closeInvite = useCallback(() => setInviteOpen(false), []);

  return (
    <div className="buildlog">
      <div className="buildlog-inner">
        {/* Section header */}
        <div className="buildlog-header">
          <div className="buildlog-title-wrap">
            <span className="buildlog-title-bg" aria-hidden="true" />
            <h2 className="buildlog-title">Build Log</h2>
          </div>
          <p className="buildlog-caption">
            Every square is a night I didn&apos;t sleep. Every card is a weekend I definitely didn&apos;t.
          </p>
        </div>

        {/* ── GitHub panel ─────────────────────────────────────────── */}
        <section className="gh-panel" aria-label="GitHub activity">
          <div className="gh-panel-top">
            <a
              className="gh-handle"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} strokeWidth={2.5} />
              <span>@{GITHUB_USERNAME}</span>
            </a>
            <span className={`gh-live${data ? " is-live" : ""}`}>
              <RefreshCw size={12} strokeWidth={3} />
              {error ? "Signal lost" : data ? "Live from GitHub" : "Fetching…"}
            </span>
          </div>

          <div className="gh-heatmap" ref={heatRef}>
            {error ? (
              <p className="gh-error">
                GitHub isn&apos;t answering right now.{" "}
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  See the graph on GitHub
                </a>
                .
              </p>
            ) : (
              <ActivityCalendar
                data={data?.contributions ?? []}
                loading={!data}
                blockSize={blockSize}
                blockMargin={4}
                blockRadius={2}
                fontSize={12}
                colorScheme="light"
                theme={HEAT_THEME}
                showTotalCount={false}
                showWeekdayLabels={["mon", "wed", "fri"]}
                labels={{ legend: { less: "Quiet", more: "On fire" } }}
                tooltips={{
                  activity: {
                    text: (a) =>
                      `${a.count === 0 ? "No" : a.count} contribution${a.count === 1 ? "" : "s"} on ${formatDay(a.date)}`,
                    placement: "top",
                    withArrow: true,
                  },
                }}
              />
            )}
          </div>

          <div className="gh-stats">
            <StatTile
              icon={GitCommitHorizontal}
              tone="red"
              value={fmt(data?.totalLastYear)}
              label="Contributions · past year"
            />
            <StatTile
              icon={Flame}
              tone="orange"
              value={data ? `${fmt(data.currentStreak)}d` : "—"}
              label="Current streak"
            />
            <StatTile
              icon={Zap}
              tone="yellow"
              value={data ? `${fmt(data.longestStreak)}d` : "—"}
              label="Longest streak"
            />
            <StatTile
              icon={FolderGit2}
              tone="blue"
              value={fmt(data?.publicRepos)}
              label="Public repos"
            />
            <StatTile
              icon={Users}
              tone="green"
              value={fmt(data?.followers)}
              label="Followers"
            />
            <StatTile
              icon={Star}
              tone="cyan"
              value={fmt(data?.stars)}
              label="Stars earned"
            />
          </div>

          {data && (
            <div className="gh-footer">
              {data.busiest?.count > 0 && (
                <span className="gh-footer-fact">
                  <strong>Busiest day:</strong> {data.busiest.count} contributions on{" "}
                  {formatDay(data.busiest.date)}
                </span>
              )}
              {data.languages.length > 0 && (
                <ul className="gh-langs" aria-label="Most used languages">
                  {data.languages.map((lang) => (
                    <li key={lang.name}>
                      {lang.name} <em>{lang.count}</em>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>

        {/* ── Hackathon strip ──────────────────────────────────────── */}
        <section className="hack-strip" aria-label="Hackathon diaries">
          <div className="hack-strip-head">
            <div className="hack-strip-heading">
              <Trophy size={22} strokeWidth={2.5} />
              <h3>Hackathon Diaries</h3>
            </div>
            <div className="hack-strip-actions">
              <button
                type="button"
                className="hack-nav"
                onClick={() => step(-1)}
                disabled={activeCard === 0}
                aria-label="Previous hackathon"
              >
                <ChevronLeft size={20} strokeWidth={3} />
              </button>
              <button
                type="button"
                className="hack-nav"
                onClick={() => step(1)}
                disabled={activeCard === lastIndex}
                aria-label="Next hackathon"
              >
                <ChevronRight size={20} strokeWidth={3} />
              </button>
              <Link to="/hackathons" className="hack-all-link">
                All entries <ArrowRight size={16} strokeWidth={3} />
              </Link>
            </div>
          </div>

          {/* One rail carrying every card, moved by transform. The viewport's
              side padding leaves room for the cards' hard shadows so they are
              never shaved off at the edge. */}
          <div
            className="hack-viewport"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            <div
              className="hack-rail"
              ref={railRef}
              style={{
                transform: `translate3d(${-activeCard * stepPx}px, 0, 0)`,
                height: railHeight ? `${railHeight}px` : undefined,
              }}
            >
              {hackathons.map((h, index) => (
                <div
                  key={h.slug}
                  className="hack-slide"
                  ref={(el) => {
                    slideRefs.current[index] = el;
                  }}
                  aria-hidden={index !== activeCard}
                  inert={index !== activeCard}
                >
                  <HackathonCard hackathon={h} />
                </div>
              ))}
            </div>
          </div>

          <div className="hack-pips" role="tablist" aria-label="Hackathon entries">
            {hackathons.map((h, index) => (
              <button
                key={h.slug}
                type="button"
                role="tab"
                aria-selected={index === activeCard}
                aria-label={h.name}
                className={`hack-pip${index === activeCard ? " is-active" : ""}`}
                style={{ "--hack-accent": h.accent }}
                onClick={() => jumpTo(index)}
              />
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <div className="buildlog-cta">
          <div className="buildlog-cta-copy">
            <span className="buildlog-cta-kicker">Open invite</span>
            <h3 className="buildlog-cta-title">Got one coming up?</h3>
            <p className="buildlog-cta-text">
              An organiser hunting for builders, or a team one person short —
              either works. Tell me what you&apos;re building and when, and
              I&apos;ll tell you if I&apos;m in.
            </p>
          </div>

          <button
            type="button"
            className="buildlog-cta-btn"
            onClick={() => setInviteOpen(true)}
          >
            <span className="buildlog-cta-btn-icon">
              <Trophy size={19} strokeWidth={2.5} />
            </span>
            Invite me to a hackathon
          </button>
        </div>
      </div>

      <HackathonInviteModal open={inviteOpen} onClose={closeInvite} />
    </div>
  );
}

export default ComicGithubHackathons;
