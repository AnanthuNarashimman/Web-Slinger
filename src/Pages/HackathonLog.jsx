// /hackathons — the full hackathon diaries, one long-form panel per event.
// Same "issue" framing as /arsenal; Esc or the back button return to the
// Build Log section on the portfolio.
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy } from "lucide-react";
import { hackathons } from "../data/hackathons";
import HackathonCard from "../Components/HackathonCard";
import HackathonInviteModal from "../Components/HackathonInviteModal";
import { scrollTo } from "../lib/smoothScroll";
import "../ComponentStyles/ComicGithubHackathons.css";
import "../PageStyles/HackathonLog.css";

const BACK_STATE = { scrollTo: "github" };

function HackathonLog() {
  const navigate = useNavigate();
  const [inviteOpen, setInviteOpen] = useState(false);
  const closeInvite = useCallback(() => setInviteOpen(false), []);

  useEffect(() => {
    scrollTo(0, { immediate: true });

    const onKey = (e) => {
      // Let the modal own Esc while it's open
      if (e.key === "Escape" && !inviteOpen) navigate("/", { state: BACK_STATE });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, inviteOpen]);

  return (
    <div className="hacklog-page">
      <div className="hacklog-halftone" aria-hidden="true" />

      <div className="hacklog-inner">
        <Link to="/" state={BACK_STATE} className="hacklog-back-btn">
          <ArrowLeft size={20} strokeWidth={3} />
          <span>BACK TO STORY</span>
        </Link>

        <header className="hacklog-header">
          <span className="hacklog-issue">ISSUE #02</span>
          <h1 className="hacklog-title">Hackathon Diaries</h1>
          <p className="hacklog-caption">
            {hackathons.length} weekends of shipping on the clock. What got built, and what actually stuck.
          </p>
        </header>

        <div className="hacklog-list">
          {hackathons.map((h, index) => (
            <div key={h.slug} className="hacklog-entry">
              <span className="hacklog-entry-no" aria-hidden="true">
                #{String(index + 1).padStart(2, "0")}
              </span>
              <HackathonCard hackathon={h} full />
            </div>
          ))}
        </div>

        <footer className="hacklog-footer">
          <p className="hacklog-footer-text">NEXT ISSUE: could be yours.</p>
          <div className="hacklog-footer-actions">
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
            <Link to="/" state={BACK_STATE} className="hacklog-back-btn">
              <ArrowLeft size={18} strokeWidth={3} />
              <span>BACK TO STORY</span>
            </Link>
          </div>
        </footer>
      </div>

      <HackathonInviteModal open={inviteOpen} onClose={closeInvite} />
    </div>
  );
}

export default HackathonLog;
