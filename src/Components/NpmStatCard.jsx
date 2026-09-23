import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Package, Download, ArrowUpRight, Rocket } from "lucide-react";
import "../ComponentStyles/NpmStatCard.css";

const PACKAGES = [
  {
    name: "tracetel",
    description:
      "Turns every Composio tool call into a proper OpenTelemetry span — streamed into Agnost, SigNoz, Datadog or any OTel backend.",
    downloads: "983",
    tags: ["OpenTelemetry", "Composio"],
    accent: "#cb3837",
    url: "https://www.npmjs.com/package/tracetel",
  },
  {
    name: "@flash_dev/agent-smith",
    description:
      "A goal-fidelity watchdog for AI coding agents. Flags every risky action that contradicts what you said you were building.",
    downloads: "105",
    tags: ["AI Agents", "Governance"],
    accent: "#2979ff",
    url: "https://www.npmjs.com/package/@flash_dev/agent-smith",
  },
];

function NpmStatCard() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef(null);
  const panelRef = useRef(null);
  const closeTimer = useRef(0);

  // Drives the layout switch: anchored popover on desktop, sheet on mobile
  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const sync = () => setIsMobile(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Dismiss on outside tap, Escape, or scrolling the page behind the sheet
  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      const insideCard = wrapperRef.current?.contains(event.target);
      const insidePanel = panelRef.current?.contains(event.target);
      if (!insideCard && !insidePanel) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    // Only the page scrolling counts — scrolling *within* the sheet doesn't
    // move the window, so it won't trigger this.
    const handleScroll = () => setOpen(false);

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    if (isMobile) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("wheel", handleScroll, { passive: true });
    }

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [open, isMobile]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Small grace period so the pointer can travel card -> popover without closing
  const canHover = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const handleEnter = () => {
    clearTimeout(closeTimer.current);
    if (canHover()) setOpen(true);
  };

  const handleLeave = () => {
    if (canHover()) closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  const panel = (
    <div
      ref={panelRef}
      className={`npm-popover${open ? " is-open" : ""}${isMobile ? " is-sheet" : ""}`}
      role="dialog"
      aria-label="Published npm packages"
    >
      <div className="npm-popover-header">
        <span className="npm-popover-title">Shipped to npm</span>
        <span className="npm-popover-badge">2 packages</span>
      </div>

      <ul className="npm-package-list">
        {PACKAGES.map((pkg) => (
          <li key={pkg.name}>
            <a
              className="npm-package"
              href={pkg.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ "--pkg-accent": pkg.accent }}
            >
              <span className="npm-package-top">
                <span className="npm-package-name">{pkg.name}</span>
                <ArrowUpRight size={16} strokeWidth={3} className="npm-package-go" />
              </span>

              <span className="npm-package-desc">{pkg.description}</span>

              <span className="npm-package-meta">
                <span className="npm-chip">
                  <Download size={12} strokeWidth={3} /> {pkg.downloads}
                </span>
                {pkg.tags.map((tag) => (
                  <span key={tag} className="npm-chip npm-chip--accent">
                    {tag}
                  </span>
                ))}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="npm-popover-footer">
        <Rocket size={14} strokeWidth={2.75} className="npm-footer-icon" />
        <span>
          Going for <strong>1K+</strong> — give one a spin if it sounds useful!
        </span>
      </p>

      {!isMobile && <span className="npm-popover-tail" aria-hidden="true" />}
    </div>
  );

  return (
    <div
      className="npm-stat-wrapper"
      ref={wrapperRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        className={`stat-card npm-stat-card${open ? " is-open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        onFocus={handleEnter}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <span className="stat-icon stat-icon-npm">
          <Package size={20} strokeWidth={2.5} />
        </span>
        <span className="stat-info">
          <span className="stat-number">1k+</span>
          <span className="stat-label">
            npm
            <br />
            Downloads
          </span>
        </span>
        <span className="npm-stat-hint" aria-hidden="true" />
      </button>

      {/* On mobile the panel is portalled to <body>: .hero-content creates a
          stacking context (z-index:10), which would otherwise trap the sheet
          beneath the floating hero badges no matter how high its z-index goes. */}
      {isMobile
        ? createPortal(
            <>
              <div
                className={`npm-popover-backdrop${open ? " is-open" : ""}`}
                aria-hidden="true"
                onClick={() => setOpen(false)}
              />
              {panel}
            </>,
            document.body,
          )
        : panel}
    </div>
  );
}

export default NpmStatCard;
