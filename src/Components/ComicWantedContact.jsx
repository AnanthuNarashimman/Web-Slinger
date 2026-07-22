import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Linkedin,
  Github,
  Mail,
  Coffee,
  ExternalLink,
  Lightbulb,
  Send,
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
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Alias is required";
    if (!formData.email.trim()) {
      newErrors.email = "Contact signal is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setStatus(null);

    try {
      await emailjs.send(
        "service_cqrlbzl",
        "template_i0pwg2d",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: CONTACT_EMAIL,
        },
        "oeh2q_ffQz-LApW7T",
      );
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="wanted-contact-section">
      <div className="wanted-background" aria-hidden="true"></div>
      <div className="wanted-speedlines" aria-hidden="true"></div>

      <div className="wanted-content">
        <div className="wanted-poster">
          <div className="poster-paper">
            {/* Aged "case closed" stamp, angled over the paper */}
            <span className="poster-stamp" aria-hidden="true">
              Open Case
            </span>

            <div className="poster-header">
              <span className="poster-ribbon">Commit or Alive</span>
              <p className="poster-subtitle">Bounty No. 0110</p>
            </div>

            <h2 className="poster-title">WANTED</h2>
            <p className="poster-tagline">FOR BUILDING COOL STUFF</p>

            <div className="poster-image-frame">
              <img
                src={Wanted}
                alt="Wanted poster portrait"
                className="poster-image"
              />
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

            <p className="poster-fineprint">
              Last seen shipping code at 3 A.M. Approach with snacks.
            </p>
          </div>
        </div>

        <div className="wanted-contact-panel">
          <div className="torn-strip">Drop me a line on the dusty trail</div>

          <div className="contact-links">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link contact-link--linkedin"
            >
              <Linkedin size={22} /> LinkedIn
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link contact-link--github"
            >
              <Github size={22} /> GitHub
            </a>
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link contact-link--x"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X (Twitter)
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="contact-link contact-link--mail"
            >
              <Mail size={22} /> Email
            </a>
          </div>

          <form className="wanted-form" onSubmit={handleSend} noValidate>
            <label className="input-strip">
              <span>Alias</span>
              <input
                type="text"
                name="name"
                placeholder="Code Name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && (
                <span className="wanted-error">{errors.name}</span>
              )}
            </label>

            <label className="input-strip">
              <span>Contact Signal</span>
              <input
                type="email"
                name="email"
                placeholder="email@domain.com"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && (
                <span className="wanted-error">{errors.email}</span>
              )}
            </label>

            <label className="message-bubble">
              <span>Message</span>
              <textarea
                name="message"
                placeholder="What's the mission?"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message && (
                <span className="wanted-error">{errors.message}</span>
              )}
              <span className="bubble-tail" aria-hidden="true" />
            </label>

            <div className="wanted-status-slot" aria-live="polite">
              {status === "success" && (
                <div className="wanted-status wanted-status--success">
                  <strong>BAM!</strong> Message delivered — I&apos;ll be in touch.
                </div>
              )}
              {status === "error" && (
                <div className="wanted-status wanted-status--error">
                  <strong>OOF!</strong> Something went wrong. Try again or email
                  me directly.
                </div>
              )}
            </div>

            <button
              type="submit"
              className="wanted-send-btn"
              disabled={isSubmitting}
            >
              <Send size={20} className="send-icon" />
              {isSubmitting ? "Sending..." : "Send Message"}
              <span className="send-sfx" aria-hidden="true">
                THWIP!
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ComicWantedContact;
