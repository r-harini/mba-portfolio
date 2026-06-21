"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ExperienceRole } from "@/lib/cms";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const panelVariants = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } },
};

interface ExperienceProps {
  roles: ExperienceRole[];
}

export function Experience({ roles }: ExperienceProps) {
  const [activeId, setActiveId] = useState(roles[0]?.id ?? "");
  const active = roles.find((r) => r.id === activeId) ?? roles[0];

  const highlights = active?.highlights?.split("|").map((h) => h.trim()).filter(Boolean) ?? [];
  const metrics = active?.metrics?.split("|").map((m) => {
    const [value, label] = m.split("::").map((s) => s.trim());
    return { value, label };
  }).filter((m) => m.value && m.label) ?? [];

  return (
    <section
      id="experience"
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
          Where I&apos;ve
          <br />
          <span style={{ color: "var(--green)" }}>grown</span>
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-px"
        style={{ background: "rgba(248,247,244,0.06)" }}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Rail */}
        <div style={{ background: "#0A0A0A" }}>
          {roles.map((role) => {
            const isActive = role.id === activeId;
            return (
              <button
                key={role.id}
                onClick={() => setActiveId(role.id)}
                className="w-full text-left px-7 py-6 transition-all duration-200 relative"
                style={{
                  background: isActive ? "#111111" : "transparent",
                  borderBottom: "1px solid rgba(248,247,244,0.06)",
                }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "#0D0D0D"; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                {isActive && (
                  <motion.div
                    layoutId="rail-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[2px]"
                    style={{ background: "var(--green)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <p className="text-[25px] font-semibold mb-1" style={{ color: isActive ? "#F8F7F4" : "#9A9994" }}>
                  {role.company}
                </p>
                <p className="text-[17px] mb-2" style={{ color: isActive ? "#9A9994" : "#5A5955" }}>
                  {role.role_title}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-[11px]" style={{ color: "#5A5955" }}>
                    {role.start_date} — {role.end_date}
                  </p>
                  <span
                    className="text-[12px] font-medium tracking-[0.06em] uppercase px-2 py-[3px] rounded-full"
                    style={{
                      background: role.type === "Education" ? "rgba(0,124,0,0.12)" : "rgba(248,247,244,0.05)",
                      color: role.type === "Education" ? "var(--green)" : "#5A5955",
                    }}
                  >
                    {role.type}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Panel */}
        <div className="p-10 md:p-14 relative overflow-hidden" style={{ background: "#111111", minHeight: "480px" }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeId} variants={panelVariants} initial="hidden" animate="show" exit="exit">
              <p className="text-[15px] font-medium tracking-[0.12em] uppercase mb-3" style={{ color: "var(--green)" }}>
                {active?.company} · {active?.location}
              </p>
              <h3
                className="font-sans font-bold mb-4"
                style={{ fontSize: "clamp(22px, 2.5vw, 32px)", lineHeight: "1.1", letterSpacing: "-0.02em", color: "#F8F7F4" }}
              >
                {active?.role_title}
              </h3>
              <p className="text-[18px] leading-[1.6] mb-8" style={{ color: "#9A9994"}}>
                {active?.headline}
              </p>

              <div className="w-full h-px mb-8" style={{ background: "rgba(248,247,244,0.07)" }} />

              <p className="text-[16px] leading-[1.85] mb-10" style={{ color: "#9A9994" }}>
                {active?.narrative}
              </p>

              <ul className="mb-10 space-y-3" style={{ }}>
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[6px] w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: "var(--green)" }} />
                    <span className="text-[16px] leading-[1.7]" style={{ color: "#9A9994" }}>{h}</span>
                  </li>
                ))}
              </ul>

              {metrics.length > 0 && (
                <div className="flex flex-wrap gap-8 pt-8" style={{ borderTop: "1px solid rgba(248,247,244,0.07)" }}>
                  {metrics.map((m) => (
                    <div key={m.label}>
                      <p
                        className="font-sans font-bold mb-1"
                        style={{ fontSize: "clamp(24px, 2.5vw, 36px)", lineHeight: "1", letterSpacing: "-0.03em", color: "#F8F7F4" }}
                      >
                        {m.value}
                      </p>
                      <p className="text-[13px] tracking-[0.04em] uppercase" style={{ color: "#5A5955" }}>
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
