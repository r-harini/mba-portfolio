"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Handle anchor links for section navigation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;

      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      // lenis.scrollTo(el, { offset: -72, duration: 1.4 });
      lenis.scrollTo(el, {
      offset: -72,
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 3), // smoother decel
      lock: true, // prevents mid-scroll interference
      });
    };

    document.addEventListener("click", handleAnchorClick);

    const sections = Array.from(document.querySelectorAll("section"));

  let isScrolling = false;

  const snapToSection = (direction: number) => {

    if (isScrolling) return;

    const scrollY = window.scrollY;

    const currentIndex = sections.findIndex((sec) => {

      const top = sec.getBoundingClientRect().top + scrollY;

      return scrollY < top + sec.clientHeight;

    });

    const nextIndex = Math.min(

      Math.max(currentIndex + direction, 0),

      sections.length - 1

    );

    const target = sections[nextIndex];

    if (!target) return;

    isScrolling = true;

    lenis.scrollTo(target, {

      offset: -72,

      duration: 1.4,

    });

    setTimeout(() => {

      isScrolling = false;

    }, 1200);

  };

  const onWheel = (e: WheelEvent) => {

    if (Math.abs(e.deltaY) < 10) return;

    if (e.deltaY > 0) snapToSection(1);

    else snapToSection(-1);

  };

  window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
