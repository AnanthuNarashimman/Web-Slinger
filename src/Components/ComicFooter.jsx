import { Github, Linkedin, Mail } from "lucide-react";
import "../ComponentStyles/ComicFooter.css";

const CONTACT_EMAIL = "ananthu.narashimman@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/ananthunarashimman";
const GITHUB_URL = "https://github.com/AnanthuNarashimman";
const X_URL = "https://x.com/AnanthuN7652";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Journey", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { icon: <Github size={20} />, label: "GitHub", href: GITHUB_URL },
  { icon: <Linkedin size={20} />, label: "LinkedIn", href: LINKEDIN_URL },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    label: "X",
    href: X_URL,
  },
  { icon: <Mail size={20} />, label: "Email", href: `mailto:${CONTACT_EMAIL}` },
];

function ComicFooter() {
  return (
    <footer className="comic-footer">
      <p className="footer-quote" data-reveal>
        Keeping the web
        <br />
        a little better than I found it.
      </p>

      <div className="footer-bottom" data-reveal data-reveal-delay="2">
        <nav className="footer-nav">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="footer-nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-socials">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default ComicFooter;
