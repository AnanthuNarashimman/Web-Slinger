import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setSmoothScroll } from "../lib/smoothScroll";

/**
 * Momentum scrolling for pointer devices.
 *
 * Deliberately left OFF for touch: native mobile scrolling already has
 * momentum, and hijacking it costs battery and feels laggy. Also disabled
 * for users who ask for reduced motion.
 */
function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      // expo-out: fast pickup, long glide to rest — the "premium" feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // keep native touch scrolling
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    setSmoothScroll(lenis);

    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      setSmoothScroll(null);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default SmoothScroll;
