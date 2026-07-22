import { useCallback, useEffect, useRef, useState } from "react";
import { getSmoothScroll, scrollTo } from "../lib/smoothScroll";
import "../ComponentStyles/ComicScrollbar.css";

// Laptop-and-up only; below this the native scrollbar (or touch scrolling) wins.
const MIN_WIDTH = 1024;
const MIN_THUMB = 48;

function ComicScrollbar() {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const frameRef = useRef(0);
  const dragRef = useRef(null);
  const idleRef = useRef(true);

  const [enabled, setEnabled] = useState(false);

  // Only take over on wide viewports with a precise pointer
  useEffect(() => {
    const query = window.matchMedia(
      `(min-width: ${MIN_WIDTH}px) and (pointer: fine)`,
    );
    const sync = () => setEnabled(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Marker class lets CSS hide the native bar only while we're driving
  useEffect(() => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add("has-comic-scrollbar");
      return () => root.classList.remove("has-comic-scrollbar");
    }
    return undefined;
  }, [enabled]);

  /**
   * Writes straight to the DOM rather than through state: this runs on every
   * scroll frame, and a setState per frame means a React render per frame,
   * which is what makes momentum scrolling stutter.
   */
  const update = useCallback(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;

    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    const trackHeight = track.clientHeight;

    if (scrollable <= 1 || trackHeight <= 0) {
      if (!idleRef.current) {
        track.classList.add("is-idle");
        idleRef.current = true;
      }
      return;
    }

    if (idleRef.current) {
      track.classList.remove("is-idle");
      idleRef.current = false;
    }

    const height = Math.max(
      MIN_THUMB,
      Math.round(trackHeight * (window.innerHeight / doc.scrollHeight)),
    );
    const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
    const offset = Math.round(progress * (trackHeight - height));

    thumb.style.height = `${height}px`;
    thumb.style.transform = `translate3d(0, ${offset}px, 0)`;
  }, []);

  // Coalesce bursts into one write per frame
  const scheduleUpdate = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(update);
  }, [update]);

  useEffect(() => {
    if (!enabled) return undefined;

    update();

    // Lenis emits during its own rAF loop, so we stay a frame in sync with it
    // instead of trailing the native scroll event.
    const lenis = getSmoothScroll();
    if (lenis) lenis.on("scroll", update);
    else window.addEventListener("scroll", scheduleUpdate, { passive: true });

    window.addEventListener("resize", scheduleUpdate);

    // Sections mount and images load after first paint, changing page height
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(document.body);

    return () => {
      cancelAnimationFrame(frameRef.current);
      if (lenis) lenis.off("scroll", update);
      else window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      observer.disconnect();
    };
  }, [enabled, update, scheduleUpdate]);

  // Map a pointer position on the track to a document scroll position
  const scrollToPointer = useCallback((clientY, grabOffset) => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const thumbHeight = dragRef.current?.thumbHeight ?? MIN_THUMB;
    const range = rect.height - thumbHeight;
    if (range <= 0) return;

    const top = clientY - rect.top - grabOffset;
    const progress = Math.min(1, Math.max(0, top / range));
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;

    // immediate: the thumb should track the cursor 1:1, not ease behind it
    scrollTo(progress * scrollable, { immediate: true });
  }, []);

  const handleThumbPointerDown = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    const thumbRect = event.currentTarget.getBoundingClientRect();
    dragRef.current = {
      grabOffset: event.clientY - thumbRect.top,
      thumbHeight: thumbRect.height,
    };
    event.currentTarget.classList.add("is-dragging");
  };

  const handleThumbPointerMove = (event) => {
    if (!dragRef.current) return;
    scrollToPointer(event.clientY, dragRef.current.grabOffset);
  };

  const endDrag = (event) => {
    if (!dragRef.current) return;
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    event.currentTarget.classList.remove("is-dragging");
  };

  // Clicking the bare track jumps so the thumb centres on the cursor
  const handleTrackPointerDown = (event) => {
    if (event.target !== event.currentTarget) return;
    const thumbHeight = thumbRef.current?.offsetHeight ?? MIN_THUMB;
    dragRef.current = { thumbHeight };
    scrollToPointer(event.clientY, thumbHeight / 2);
    dragRef.current = null;
  };

  if (!enabled) return null;

  return (
    <div
      ref={trackRef}
      className="comic-scrollbar-track is-idle"
      onPointerDown={handleTrackPointerDown}
      aria-hidden="true"
    >
      <div
        ref={thumbRef}
        className="comic-scrollbar-thumb"
        onPointerDown={handleThumbPointerDown}
        onPointerMove={handleThumbPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <span className="comic-scrollbar-grip" />
      </div>
    </div>
  );
}

export default ComicScrollbar;
