import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { scanReveals, clearReveals } from "../lib/scrollReveal";
import "../ComponentStyles/ScrollReveal.css";

/**
 * Mounts the page-wide scroll reveal observer. Renders nothing.
 *
 * Lives once, inside the router, and re-scans whenever the route changes so
 * each page registers its own elements and the previous page's are released.
 */
function ScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    // Two frames before measuring. The first lets React's commit paint; the
    // second lets any layout the sections settle on mount finish, so nothing
    // is measured against a height it is about to change.
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => scanReveals());
    });

    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
      clearReveals();
    };
  }, [location.pathname]);

  return null;
}

export default ScrollReveal;
