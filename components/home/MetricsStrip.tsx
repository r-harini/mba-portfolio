"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const METRICS = [
  {
    value: "$17M",
    label: "Revenue impact",
    context: "ROI across data initiatives",
  },
  {
    value: "1.5M",
    label: "Users reached",
    context: "AI recommendation engine",
  },
  {
    value: "22%",
    label: "Growth driven",
    context: "Regional subscriber expansion",
  },
  {
    value: "$250M",
    label: "Portfolio managed",
    context: "Annual operating budget",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function MetricsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      id="metrics"
      ref={ref}
      className="bg-bg grid grid-cols-2 md:grid-cols-4"
      aria-label="Impact metrics"
    >
      <motion.div
        className="contents"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {METRICS.map((metric, i) => (
          <motion.div
            key={metric.label}
            variants={item}
            className={`
              px-8 md:px-12 py-12 md:py-14
              ${
                i < METRICS.length - 1
                  ? "border-b md:border-b-0 md:border-r border-[rgba(0,124,0,0.12)]"
                  : ""
              }
              ${i === 1 ? "border-b md:border-b-0" : ""}
            `}
          >
            {/* VALUE */}
            <p
              className="font-sans leading-none tracking-[-0.05em] mb-3"
              style={{
                fontSize: "clamp(36px, 4vw, 52px)",
                color: "var(--green)",
                fontWeight: 800,
              }}
            >
              {metric.value}
            </p>

            {/* LABEL */}
            <p
              className="text-[13px] leading-[1.45] mb-1"
              style={{ color: "var(--ink)" }}
            >
              {metric.label}
            </p>

            {/* CONTEXT */}
            <p
              className="text-[10px] tracking-[0.08em] uppercase"
              style={{ color: "var(--ink-3)" }}
            >
              {metric.context}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}