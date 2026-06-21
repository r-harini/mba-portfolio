"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { driveImage } from "@/lib/cms";
import type { AboutSection } from "@/lib/cms";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   { opacity: 0, y: -6, transition: { duration: 0.2, ease: "easeIn" } },
};

interface AboutProps {
  config: Record<string, string>;
  sections: AboutSection[];
}

export function About({ sections, config }: AboutProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const active = sections.find((s) => s.id === activeId) ?? sections[0];
  const tagline = config.about_tagline ?? "";
  const highlight = config.about_tagline_highlight ?? "";
  const taglineParts = highlight && tagline.includes(highlight)
    ? tagline.split(highlight)
    : null;

  const textRef = useRef<HTMLDivElement>(null);
  const [textHeight, setTextHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (textRef.current) {
      setTextHeight(textRef.current.offsetHeight);
    }
  }, [activeId, active?.content]);

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center py-24 px-8 md:px-14 lg:px-20"
      style={{ background: "#0A0A0A" }}
    >
      <motion.div
        className="mb-14 pt-10"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        <h2
          className="font-sans font-extrabold uppercase"
          style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: "0.95", letterSpacing: "-0.025em", color: "#F8F7F4" }}
        >
          More than &nbsp;
          <span style={{ color: "var(--green)" }}>a résumé</span>
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-px"
        style={{ background: "rgba(248,247,244,0.06)" }}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Rail */}
        <div style={{ background: "#0A0A0A" }}>
          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <button
                key={section.id}
                onClick={() => setActiveId(section.id)}
                className="w-full text-left px-7 py-5 transition-all duration-200 relative"
                style={{
                  background: isActive ? "#111111" : "transparent",
                  borderBottom: "1px solid rgba(248,247,244,0.06)",
                }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "#0D0D0D"; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                {isActive && (
                  <motion.div
                    layoutId="about-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[2px]"
                    style={{ background: "var(--green)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <p className="text-[20px] font-medium transition-colors duration-200" style={{ color: isActive ? "#F8F7F4" : "#5A5955" }}>
                  {section.label}
                </p>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="p-10 md:p-14 relative" style={{ background: "#111111", minHeight: "420px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              variants={contentVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-10"
            >
              <div ref={textRef} className="max-w-[560px]">
                <p className="text-[20px] font-medium tracking-[0.12em] uppercase mb-6" style={{ color: "var(--green)" }}>
                  {active?.label}
                </p>
                <div className="space-y-5">
                  {(active?.content ?? "").split("\n\n").map((para, i) => (
                    <p key={i} className="text-[18px] text-align: justify leading-[1.85]" style={{ color: "#F8F7F4" }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {active?.cover_id && (
                <div
                  className="w-full overflow-hidden flex-shrink-0"
                  style={{
                    border: "1px solid rgba(248,247,244,0.08)",
                    borderRadius: 0,
                    height: textHeight ? `${Math.min(textHeight - 20, 600)}px` : "320px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={driveImage(active.cover_id, 900)}
                    alt={active.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Pull quote */}
      <motion.div
        className="mt-20 md:mt-24"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="w-8 h-[2px] mb-8" style={{ background: "var(--green)" }} />
        <blockquote
          className="font-serif font-bold uppercase"
          style={{ fontSize: "clamp(28px, 3.5vw, 48px)", lineHeight: "1.05", letterSpacing: "-0.025em", color: "#F8F7F4", maxWidth: "800px" }}
        >
          {taglineParts ? (
            <>
              {taglineParts[0]}
              <span style={{ color: "var(--green)" }}>{highlight}</span>
              {taglineParts[1]}
            </>
          ) : tagline}
        </blockquote>
      </motion.div>
    </section>
  );
}