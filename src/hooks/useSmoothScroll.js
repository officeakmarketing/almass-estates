import { useEffect } from 'react';

/**
 * useSmoothScroll
 * Simple & reliable approach:
 *   - Intercepts wheel events and cancels native scroll
 *   - Accumulates delta into a target Y
 *   - Lerps window.scrollY toward the target via rAF
 *   - Stops the rAF loop when idle (diff < 0.1) to eliminate
 *     constant 60fps reflows when nothing is scrolling
 *
 * @param {number} lerp  0.06 = silky · 0.08 = cinematic · 0.14 = snappy
 */
export default function useSmoothScroll(lerp = 0.09) {
  useEffect(() => {
    let currentY = window.scrollY;
    let targetY  = window.scrollY;
    let rafId    = null;
    let isRunning = false;

    const maxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    // Start the rAF loop only when needed
    const startLoop = () => {
      if (isRunning) return;
      isRunning = true;
      loop();
    };

    // ── rAF lerp loop — cancels itself when idle ────────────────────
    const loop = () => {
      const diff = targetY - currentY;
      if (Math.abs(diff) > 0.1) {
        currentY += diff * lerp;
        window.scrollTo(0, currentY);
        rafId = requestAnimationFrame(loop);
      } else {
        // Snap to exact target and stop looping — saves 60fps reflows
        currentY  = targetY;
        window.scrollTo(0, currentY);
        isRunning = false;
        rafId     = null;
      }
    };

    // ── Wheel: accumulate delta, clamp to page bounds ────────────────
    const onWheel = (e) => {
      e.preventDefault();
      targetY = Math.max(0, Math.min(targetY + e.deltaY * 1.2, maxScroll()));
      startLoop();
    };

    // ── Touch support ─────────────────────────────────────────────────
    let touchStartY = 0;
    const onTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const onTouchMove  = (e) => {
      e.preventDefault();
      const delta = (touchStartY - e.touches[0].clientY) * 2;
      touchStartY  = e.touches[0].clientY;
      targetY = Math.max(0, Math.min(targetY + delta, maxScroll()));
      startLoop();
    };

    // ── Anchor-link smooth scroll ─────────────────────────────────────
    const onAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      targetY = Math.max(
        0,
        Math.min(el.getBoundingClientRect().top + currentY - 80, maxScroll())
      );
      startLoop();
    };

    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });
    document.addEventListener('click',    onAnchorClick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
      document.removeEventListener('click',    onAnchorClick);
    };
  }, [lerp]);
}
