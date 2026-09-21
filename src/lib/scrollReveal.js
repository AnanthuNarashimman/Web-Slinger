/**
 * Scroll reveals.
 *
 * Elements marked with `data-reveal` start hidden and animate in when they
 * come into view. The value picks a direction: "up" (the default), "left",
 * "right", "scale" or "fade". `data-reveal-delay="1".."6"` staggers a group.
 *
 * Four decisions that keep this cheap:
 *
 * 1. ONE observer for the whole page. Every marked element shares the single
 *    instance below, so a page with two hundred targets still has one
 *    observer, not two hundred.
 *
 * 2. Only `opacity`, `translate` and `scale` animate. All three run on the
 *    compositor, so a reveal costs no layout and no repaint.
 *
 * 3. No `will-change`. Browsers already promote an element for the duration
 *    of a transform or opacity transition. Declaring it permanently on every
 *    marked element would instead hold a compositor layer for each one for
 *    the life of the page, which is how this kind of effect usually ends up
 *    costing more memory than it saves.
 *
 * 4. The exit does not animate. An element is only un-revealed once it is
 *    completely out of view, and the hidden state carries no transition, so
 *    it snaps back off-screen rather than spending frames animating something
 *    nobody can see. What you notice is that it plays again on the way back.
 *
 * `translate` and `scale` are used rather than `transform` on purpose. Plenty
 * of elements here carry a tilt or a skew in their own `transform`, and
 * animating that property would flatten it — the same bug the hero badges
 * used to have. On their own properties the two never collide.
 *
 * ONE CAVEAT when adding new targets. Like `transform`, a `translate` or
 * `scale` value other than `none` makes the element a containing block, so a
 * `position: fixed` descendant would anchor to it instead of to the viewport.
 * Nothing marked today has one — the two modals both render through a portal,
 * and the TV's ambient glow sits outside the marked subtree — but a full
 * screen overlay added inside a marked element later would be pinned to that
 * element. Mark a wrapper that excludes the overlay, or portal the overlay.
 *
 * Nothing above the fold is marked. The hero plays its own entrance, and
 * hiding first-screen content here would push out the largest contentful
 * paint for the sake of an animation nobody scrolls to see.
 */

const READY_CLASS = "reveal-ready";
const REVEAL_CLASS = "is-revealed";

// How much of an element must be showing before it plays.
const ENTER_RATIO = 0.15;

let observer = null;
let hasScanned = false;
const watched = new Set();

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isSupported = () =>
  typeof window !== "undefined" && "IntersectionObserver" in window;

/**
 * The hidden state in CSS is scoped to this class, and this class is only
 * ever added by script. If the bundle fails to load, is blocked, or the
 * browser is too old, nothing is hidden and the page reads normally.
 *
 * It is set at import time rather than in an effect so it is in place before
 * React's first paint. Setting it later would show every element for a frame
 * and then hide it, which reads as a flash.
 */
if (typeof document !== "undefined" && isSupported() && !prefersReducedMotion()) {
  document.documentElement.classList.add(READY_CLASS);

  // Failsafe. Adding the class up front is what avoids the flash, but it also
  // means that if the scan below never runs — a render that throws, a mount
  // that never happens — everything marked would stay hidden for good. One
  // timer, fired once, undoes that. Content staying visible matters more than
  // the animation.
  window.setTimeout(() => {
    if (!hasScanned) document.documentElement.classList.remove(READY_CLASS);
  }, 3000);
}

const onIntersect = (entries) => {
  for (const entry of entries) {
    const element = entry.target;

    if (entry.isIntersecting) {
      // A block taller than the viewport can never reach ENTER_RATIO, because
      // even fully covering the screen it is only showing a fraction of
      // itself. Those play as soon as any part of them is on screen.
      const tallerThanViewport =
        entry.boundingClientRect.height > window.innerHeight * 0.9;

      if (tallerThanViewport || entry.intersectionRatio >= ENTER_RATIO) {
        element.classList.add(REVEAL_CLASS);
      }
      continue;
    }

    element.classList.remove(REVEAL_CLASS);
  }
};

/**
 * Register every `data-reveal` element under `root` with the shared observer.
 * Safe to call more than once: elements already being watched are skipped, so
 * React's double-invoked effects in development cost nothing.
 */
export const scanReveals = (root = document) => {
  if (typeof document === "undefined") return;

  const targets = root.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  hasScanned = true;

  // No observer, or the user asked for less motion: show everything and stop.
  if (!isSupported() || prefersReducedMotion()) {
    document.documentElement.classList.remove(READY_CLASS);
    return;
  }

  if (!observer) {
    observer = new IntersectionObserver(onIntersect, {
      threshold: [0, ENTER_RATIO],
    });
  }

  for (const element of targets) {
    if (watched.has(element)) continue;
    watched.add(element);
    observer.observe(element);
  }
};

/**
 * Drop every registration. Called on navigation so the set does not hold
 * references to elements from a page that has since unmounted.
 */
export const clearReveals = () => {
  if (observer) observer.disconnect();
  watched.clear();
};
