"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowDown } from "lucide-react";
import type { BeyondPhoto } from "@/lib/cms";

const CARD_BGS = [
  "linear-gradient(160deg, #1a2e1a 0%, #2d4a2d 100%)",
  "linear-gradient(160deg, #2e1a0a 0%, #4a2e10 100%)",
  "linear-gradient(160deg, #1a1a2e 0%, #2a2a4a 100%)",
  "linear-gradient(160deg, #0a0a2e 0%, #1a1a4a 100%)",
  "linear-gradient(160deg, #2e1e0a 0%, #4a3010 100%)",
  "linear-gradient(160deg, #1e1e1e 0%, #2e2e2e 100%)",
  "linear-gradient(160deg, #2e0a1e 0%, #4a1030 100%)",
  "linear-gradient(160deg, #0a1e2e 0%, #103040 100%)",
];

function buildColumns(items: BeyondPhoto[], count: number) {
  const cols: BeyondPhoto[][] = Array.from({ length: count }, () => []);
  items.forEach((item, i) => cols[i % count].push(item));
  return cols;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  show:   { opacity: 1, scale: 1,    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   { opacity: 0, scale: 0.96, transition: { duration: 0.2, ease: "easeIn" } },
};

interface BeyondWorkProps {
  photos: BeyondPhoto[];
}

export function BeyondWork({ photos }: BeyondWorkProps) {
  const [selected, setSelected] = useState<BeyondPhoto | null>(null);
  const columns = buildColumns(photos, 4);

  return (
    <section
      id="beyond"
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
          When I&apos;m not
          <br />
          <span style={{ color: "var(--green)" }}>at the desk</span>
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ show: { transition: { staggerChildren: 0.07 } } }}
      >
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-3">
            {col.map((photo, pi) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                bgFallback={CARD_BGS[(ci * 3 + pi) % CARD_BGS.length]}
                onClick={() => setSelected(photo)}
              />
            ))}
          </div>
        ))}
      </motion.div>

      {/* Closing element — unifies the uneven masonry column endpoints */}
      <motion.div
        className="text-center mx-auto"
        style={{ maxWidth: "480px", paddingTop: "32px", marginTop: "48px", borderTop: "1px solid rgba(248,247,244,0.08)" }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p
          className="font-sans italic"
          style={{ fontSize: "25px", fontWeight: 500, color: "#9A9994", lineHeight: "1.5", margin: "0 0 24px" }}
        >
           All of it, all of them, shaped who I am.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 transition-opacity duration-200"
          style={{ fontSize: "18px", fontWeight: 500, color: "var(--green-light)", textDecoration: "none", letterSpacing: "0.02em" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Let&apos;s talk
          <ArrowDown size={14} strokeWidth={1.75} />
        </a>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-50"
              style={{ background: "rgba(0,0,0,0.85)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="pointer-events-auto grid grid-cols-1 md:grid-cols-2 overflow-hidden"
                style={{
                  width: "min(90vw, 1200px)",
                  maxHeight: "90vh",
                  background: "#111111",
                  borderRadius: "12px",
                  border: "1px solid rgba(248,247,244,0.08)",
                }}
              >
                <div
                  style={{
                    minHeight: "280px",
                    aspectRatio: "1",
                    position: "relative",
                    overflow: "hidden",
                    background: CARD_BGS[photos.findIndex((p) => p.id === selected.id) % CARD_BGS.length],
                  }}
                >
                  {selected.drive_image_id && (
                    <img
                      src={`https://drive.google.com/thumbnail?id=${selected.drive_image_id}&sz=w800`}
                      alt={selected.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                <div className="p-10 flex flex-col justify-between relative">
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-6 right-6 transition-colors duration-200"
                    style={{ color: "#5A5955" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F8F7F4")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#5A5955")}
                    aria-label="Close"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                  <div>
                    <p className="text-[13px] font-medium tracking-[0.12em] uppercase mb-4" style={{ color: "var(--green)" }}>
                      {selected.caption}
                    </p>
                    <h3
                      className="font-sans font-bold mb-6"
                      style={{ fontSize: "clamp(25px, 2vw, 26px)", lineHeight: "1.15", letterSpacing: "-0.02em", color: "#F8F7F4" }}
                    >
                      {selected.title}
                    </h3>
                    <p className="text-[17px] leading-[1.85]" style={{ color: "#9A9994" }}>
                      {selected.story}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

function PhotoCard({ photo, bgFallback, onClick }: { photo: BeyondPhoto; bgFallback: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const cardVariant = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <motion.div
      variants={cardVariant}
      className="relative overflow-hidden cursor-pointer"
      style={{ borderRadius: "8px" }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          aspectRatio: photo.aspect || "4/3",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          background: bgFallback,
        }}
      >
        {photo.drive_image_id && (
          <img
            src={`https://drive.google.com/thumbnail?id=${photo.drive_image_id}&sz=w800`}
            alt={photo.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
            referrerPolicy="no-referrer"
          />
        )}
      </div>
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-5"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22 }}
      >
        <p className="font-sans font-bold mb-1" style={{ fontSize: "15px", lineHeight: "1.2", color: "#F8F7F4", letterSpacing: "-0.01em" }}>
          {photo.title}
        </p>
        <p className="text-[11px] tracking-[0.04em]" style={{ color: "rgba(248,247,244,0.55)" }}>
          {photo.caption}
        </p>
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 w-[2px]"
        style={{ background: "var(--green)" }}
        animate={{ height: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </motion.div>
  );
}