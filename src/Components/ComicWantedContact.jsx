import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Linkedin,
  Github,
  Mail,
  Coffee,
  Award,
  ExternalLink,
  Lightbulb
} from "lucide-react";
import "../ComponentStyles/ComicWantedContact.css";
import Wanted from "../assets/Images/Wanted.png";

const CONTACT_EMAIL = "ananthu.narashimman@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/ananthunarashimman";
const GITHUB_URL = "https://github.com/AnanthuNarashimman";
const X_URL = "https://x.com/AnanthuN7652";

function ComicWantedContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSend = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await emailjs.send(
        "service_cqrlbzl",
        "template_i0pwg2d",
        {
          from_name: formData.name || "Mysterious Admirer",
          from_email: formData.email || "N/A",
          message: formData.message || "No message included.",
          to_email: CONTACT_EMAIL,
        },
        "oeh2q_ffQz-LApW7T"
      );
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="wanted-contact-section">
      <div className="wanted-background" aria-hidden="true"></div>

      <div className="wanted-content">
        <div className="wanted-poster">
          <div className="poster-header">
            <span className="poster-ribbon">Commit or Alive</span>
            <p className="poster-subtitle">Bounty No. 0110</p>
          </div>

          <h2 className="poster-title">WANTED</h2>
          <p className="poster-tagline">FOR BUILDING COOL TUFFS</p>

          <div className="poster-image-frame">
            <img src={Wanted} alt="Wanted silhouette" className="poster-image" />
            <div className="poster-tape tape-top-left" />
            <div className="poster-tape tape-bottom-right" />
          </div>

          <div className="poster-reward">
            <h3>Reward</h3>
            <div className="reward-badges">
              <span>
                <Coffee size={18} /> Coffee
              </span>
              <span>
                <Lightbulb size={18} /> Ideas
              </span>
              <span>
                <ExternalLink size={18} /> Collaboration
              </span>
            </div>
          </div>
        </div>

        <div className="wanted-contact-panel">
          <div className="torn-strip">Drop me a line on the dusty trail</div>

          <div className="contact-links">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={22} /> LinkedIn
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={22} /> GitHub
            </a>
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X (Twitter)
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <Mail size={22} /> Email
            </a>
          </div>

          <form className="wanted-form" onSubmit={handleSend}>
            <label className="input-strip">
              <span>Alias</span>
              <input
                type="text"
                name="name"
                placeholder="Code Name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            <label className="input-strip">
              <span>Contact Signal</span>
              <input
                type="email"
                name="email"
                placeholder="email@domain.com"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label className="message-bubble">
              <span>Message</span>
              <textarea
                name="message"
                placeholder="What's the mission?"
                value={formData.message}
                onChange={handleChange}
                rows={4}
              />
            </label>

            {status === "success" && (
              <div className="wanted-status wanted-status--success">
                Message delivered! I&apos;ll be in touch.
              </div>
            )}
            {status === "error" && (
              <div className="wanted-status wanted-status--error">
                Something went wrong. Try again or email me directly.
              </div>
            )}
            <button type="submit" className="wanted-send-btn" disabled={isSubmitting}>
              <Mail size={20} />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ComicWantedContact;
