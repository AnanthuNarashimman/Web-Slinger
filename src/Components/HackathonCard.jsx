// One hackathon entry. `full` renders the slightly larger long-form version
// used on the /hackathons page; the default is the strip card, which is also
// full-width — the two differ only in type scale.
//
// A `variant` on the data (currently "ethglobal" and "monad") swaps the card
// into that event's own colours and adds a standout flag.
import { useMemo } from "react";
import { Calendar, Github, ExternalLink, Star } from "lucide-react";

// Same colour ramp as the contribution heatmap, reused as corner confetti.
const HEAT_DOTS = ["#efe8d2", "#ffe135", "#ffb300", "#ff6d00", "#ff1744"];

// Stable pseudo-random (FNV-1a seed + xorshift): a given card always draws the
// same pattern, so the decoration doesn't reshuffle on every re-render.
function dotColors(seed, count) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }

  const out = [];
  for (let i = 0; i < count; i += 1) {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = (h ^ (h >>> 13)) >>> 0;
    out.push(HEAT_DOTS[h % HEAT_DOTS.length]);
  }
  return out;
}

function DotGrid({ seed, corner, cols, rows }) {
  const colors = useMemo(
    () => dotColors(`${seed}-${corner}`, cols * rows),
    [seed, corner, cols, rows],
  );

  return (
    <span
      className={`hack-dots hack-dots--${corner}`}
      style={{ "--dot-cols": cols }}
      aria-hidden="true"
    >
      {colors.map((color, index) => (
        <span key={index} className="hack-dot" style={{ background: color }} />
      ))}
    </span>
  );
}

function HackathonCard({ hackathon, full = false }) {
  const {
    slug,
    name,
    tagline,
    date,
    location,
    result,
    accent,
    variant,
    summary,
    built,
    learnt,
    links,
  } = hackathon;

  const className = [
    "hack-card",
    full ? "hack-card--full" : "",
    variant ? `hack-card--${variant}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={className} style={{ "--hack-accent": accent }}>
      <DotGrid seed={slug} corner="tr" cols={6} rows={3} />
      <DotGrid seed={slug} corner="bl" cols={5} rows={2} />

      <header className="hack-card-head">
        <div className="hack-card-badges">
          <span className="hack-card-result">{result}</span>
          {variant && (
            <span className="hack-card-epic">
              <Star size={12} strokeWidth={3} fill="currentColor" /> One of the greats
            </span>
          )}
        </div>

        <h4 className="hack-card-name">{name}</h4>
        <span className="hack-card-tagline">{tagline}</span>

        <ul className="hack-card-meta">
          <li>
            <Calendar size={14} strokeWidth={2.75} /> {date}
          </li>
        </ul>
      </header>

      <p className="hack-card-summary">{summary}</p>

      <div className="hack-card-notes">
        <div className="hack-note">
          <span className="hack-note-label">What I built</span>
          <p>{built}</p>
        </div>
        <div className="hack-note">
          <span className="hack-note-label">What I learnt</span>
          <p>{learnt}</p>
        </div>
      </div>


      <footer className="hack-card-foot">
        {/* Scrawled place name — the "I was there" signature on the page */}
        <span className="hack-card-place">
          {location}
          <svg
            className="hack-card-underline"
            viewBox="0 0 160 12"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M3,8.5 C28,3.5 52,10.5 80,6 C108,1.8 134,9.5 157,4.5" />
          </svg>
        </span>

        {links && (links.repo || links.project) && (
          <div className="hack-card-links">
            {links.repo && (
              <a
                href={links.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} repository`}
                title="Repository"
              >
                <Github size={16} strokeWidth={2.5} />
              </a>
            )}
            {links.project && (
              <a
                href={links.project}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} live project`}
                title="Live project"
              >
                <ExternalLink size={16} strokeWidth={2.5} />
              </a>
            )}
          </div>
        )}
      </footer>
    </article>
  );
}

export default HackathonCard;
