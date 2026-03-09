import "../ComponentStyles/ComicFooter.css";

function ComicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="comic-footer">
      <div className="comic-footer-halftone"></div>

      <div className="comic-footer-content">
        {/* Speech bubble with message */}
        <div className="comic-footer-bubble">
          <svg viewBox="0 0 320 100" className="comic-footer-bubble-svg">
            <path
              d="M20,10 Q10,10 10,20 L10,65 Q10,75 20,75 L140,75 L155,95 L160,75 L300,75 Q310,75 310,65 L310,20 Q310,10 300,10 Z"
              fill="#FFD700"
              stroke="#000"
              strokeWidth="4"
            />
          </svg>
          <span className="comic-footer-bubble-text">
            Thanks for visiting!
          </span>
        </div>

        {/* Main footer info */}
        <div className="comic-footer-info">
          <p className="comic-footer-name">Ananthu Narashimman</p>
        </div>

        {/* Social links */}
        <div className="comic-footer-socials">
          <a
            href="https://x.com/AnanthuN7652"
            target="_blank"
            rel="noopener noreferrer"
            className="comic-footer-social-link"
            aria-label="X (Twitter)"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://github.com/AnanthuNarashimman"
            target="_blank"
            rel="noopener noreferrer"
            className="comic-footer-social-link"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/ananthunarashimman"
            target="_blank"
            rel="noopener noreferrer"
            className="comic-footer-social-link"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="mailto:ananthu.narashimman@gmail.com"
            className="comic-footer-social-link"
            aria-label="Email"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Corner badges */}
      <div className="comic-footer-badge comic-footer-badge-left">&#9733;</div>
      <div className="comic-footer-badge comic-footer-badge-right">&#9733;</div>
    </footer>
  );
}

export default ComicFooter;
