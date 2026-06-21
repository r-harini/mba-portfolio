"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const SECTION_ORDER = ["home", "work", "experience", "about", "beyond", "contact"];

export function ScrollChevron() {
  const [currentSection, setCurrentSection] = useState("home");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = SECTION_ORDER
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick whichever observed section has the largest visible area right now
        type VisibleSection = { id: string; ratio: number };
let mostVisible: VisibleSection | null = null;

entries.forEach((entry) => {
  if (entry.isIntersecting) {
    const ratio = entry.intersectionRatio;
    if (mostVisible === null || ratio > mostVisible.ratio) {
      const next: VisibleSection = { id: entry.target.id, ratio };
      mostVisible = next;
    }
  }
});

if (mostVisible !== null) {
  const result: VisibleSection = mostVisible;
  setCurrentSection(result.id);
}
      },
      { threshold: [0.3, 0.5, 0.7] }
    );

    sections.forEach((section) => observerRef.current?.observe(section));

    return () => observerRef.current?.disconnect();
  }, []);

  const currentIndex = SECTION_ORDER.indexOf(currentSection);
  const nextSection = SECTION_ORDER[currentIndex + 1];
  const isLast = !nextSection;

  return (
    <div
      className="fixed bottom-8 z-10 pointer-events-none"
      style={{ left: "50%", transform: "translateX(-50%)" }}
    >
      <AnimatePresence>
        {!isLast && (
          <motion.a
            key={nextSection}
            href={`#${nextSection}`}
            aria-label="Scroll to next section"
            className="pointer-events-auto flex flex-col items-center opacity-40 hover:opacity-90 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col items-center"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={50} strokeWidth={1.25} style={{ color: "var(--green)" }} />
              <ChevronDown
                size={50}
                strokeWidth={1.25}
                className="-mt-[30px]"
                style={{ color: "var(--green)", opacity: 0.4 }}
              />
            </motion.div>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}