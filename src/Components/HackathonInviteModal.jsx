// "Invite me to a hackathon" dialog. Same EmailJS service/template/key as
// the contact section so both land in the same inbox; the hackathon details
// are folded into the message body because the template only knows
// from_name / from_email / message.
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import emailjs from "@emailjs/browser";
import { X, Send, Trophy } from "lucide-react";
import { getSmoothScroll } from "../lib/smoothScroll";

const CONTACT_EMAIL = "ananthu.narashimman@gmail.com";

const EMPTY = { name: "", email: "", event: "", when: "", message: "" };

const DEFAULT_MESSAGE =
  "Hey Ananthu! We're putting a team together and could use someone who ships. Interested?";

function HackathonInviteModal({ open, onClose }) {
  const [form, setForm] = useState({ ...EMPTY, message: DEFAULT_MESSAGE });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [sending, setSending] = useState(false);
  const firstFieldRef = useRef(null);

  // Lock the page behind the dialog (both native and Lenis), Esc closes.
  useEffect(() => {
    if (!open) return undefined;

    const lenis = getSmoothScroll();
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const focusTimer = setTimeout(() => firstFieldRef.current?.focus(), 60);

    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [open, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Tell me who's asking";
    if (!form.email.trim()) next.email = "I need a way to reply";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "That email looks off";
    if (!form.event.trim()) next.event = "Which hackathon?";
    if (!form.message.trim()) next.message = "Say a little something";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setStatus(null);

    const body = [
      "[Hackathon invite]",
      `Event: ${form.event.trim()}`,
      form.when.trim() ? `When: ${form.when.trim()}` : null,
      "",
      form.message.trim(),
    ]
      .filter((line) => line !== null)
      .join("\n");

    try {
      await emailjs.send(
        "service_cqrlbzl",
        "template_i0pwg2d",
        {
          from_name: form.name,
          from_email: form.email,
          message: body,
          to_email: CONTACT_EMAIL,
        },
        "oeh2q_ffQz-LApW7T",
      );
      setStatus("success");
      setForm({ ...EMPTY, message: DEFAULT_MESSAGE });
      setErrors({});
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="hack-modal-backdrop" onClick={onClose}>
      <div
        className="hack-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hack-modal-title"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        <button
          type="button"
          className="hack-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} strokeWidth={3} />
        </button>

        <div className="hack-modal-head">
          <span className="hack-modal-kicker">
            <Trophy size={14} strokeWidth={2.75} /> Call for backup
          </span>
          <h3 id="hack-modal-title" className="hack-modal-title">
            Invite me to a hackathon
          </h3>
          <p className="hack-modal-sub">
            Organiser, teammate, or just someone with a wild idea — drop the
            details and I&apos;ll get back within a day.
          </p>
        </div>

        {status === "success" ? (
          <div className="hack-modal-done" aria-live="polite">
            <strong>THWIP!</strong> Invite received. Talk soon.
            <button type="button" className="hack-btn hack-btn--ghost" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form className="hack-form" onSubmit={handleSubmit} noValidate>
            <div className="hack-form-row">
              <label className="hack-field">
                <span>Your name</span>
                <input
                  ref={firstFieldRef}
                  type="text"
                  name="name"
                  placeholder="Organiser / teammate"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <em className="hack-error">{errors.name}</em>}
              </label>

              <label className="hack-field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@domain.com"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <em className="hack-error">{errors.email}</em>}
              </label>
            </div>

            <div className="hack-form-row">
              <label className="hack-field">
                <span>Hackathon</span>
                <input
                  type="text"
                  name="event"
                  placeholder="Event name"
                  value={form.event}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.event)}
                />
                {errors.event && <em className="hack-error">{errors.event}</em>}
              </label>

              <label className="hack-field">
                <span>
                  When <small>(optional)</small>
                </span>
                <input
                  type="text"
                  name="when"
                  placeholder="Dates / city or online"
                  value={form.when}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label className="hack-field">
              <span>Message</span>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message && <em className="hack-error">{errors.message}</em>}
            </label>

            {status === "error" && (
              <p className="hack-form-error" aria-live="polite">
                <strong>OOF!</strong> Couldn&apos;t send. Try again or mail me at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            )}

            <div className="hack-form-actions">
              <button type="button" className="hack-btn hack-btn--ghost" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="hack-btn hack-btn--primary" disabled={sending}>
                <Send size={18} strokeWidth={2.75} />
                {sending ? "Sending..." : "Send invite"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default HackathonInviteModal;
