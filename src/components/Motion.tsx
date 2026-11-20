"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Animaciones que necesitan JS (ver DISENO.md, "Movimiento"):
 * - `.rv`: aparece al entrar en pantalla (añade `.seen`).
 * - `[data-n]`: la cifra cuenta desde 0 hasta su valor. `data-delay` (ms) retrasa el inicio.
 * El HTML del servidor ya trae los valores finales: sin JS, todo se ve completo.
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    if (reduce || !("IntersectionObserver" in window)) {
      document.documentElement.classList.remove("anim");
      reveal.forEach((el) => el.classList.add("seen"));
      return;
    }
    document.documentElement.classList.add("anim");

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("seen");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -6% 0px" },
    );
    reveal.forEach((el) => io.observe(el));

    const frames: number[] = [];
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-n]"));
    counters.forEach((el, k) => {
      const target = Number(el.dataset.n);
      if (!Number.isFinite(target)) return;
      const start = performance.now() + Number(el.dataset.delay ?? 400) + k * 60;
      const dur = 900;
      el.textContent = "0";
      const tick = (t: number) => {
        const p = Math.min(1, Math.max(0, (t - start) / dur));
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frames.push(requestAnimationFrame(tick));
      };
      frames.push(requestAnimationFrame(tick));
    });

    return () => {
      io.disconnect();
      frames.forEach(cancelAnimationFrame);
      counters.forEach((el) => {
        if (el.dataset.n) el.textContent = el.dataset.n;
      });
    };
  }, [pathname]);

  return null;
}
