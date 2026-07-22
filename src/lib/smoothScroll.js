// Module-level handle on the Lenis instance so any component can drive scrolling
// without prop-drilling. Null whenever smooth scroll is inactive (touch devices,
// reduced-motion users, or before mount) — every helper falls back to native.

let instance = null;

export const setSmoothScroll = (lenis) => {
  instance = lenis;
};

export const getSmoothScroll = () => instance;

/**
 * Scroll to a target (element, selector, or Y offset).
 * `immediate` jumps without animating — used for route changes and bar drags.
 */
export const scrollTo = (target, { offset = 0, immediate = false } = {}) => {
  if (instance) {
    instance.scrollTo(target, { offset, immediate });
    return;
  }

  // Native fallback
  if (typeof target === "number") {
    window.scrollTo({ top: target + offset, behavior: immediate ? "auto" : "smooth" });
    return;
  }

  const element =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!element) return;

  window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY + offset,
    behavior: immediate ? "auto" : "smooth",
  });
};
