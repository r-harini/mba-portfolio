"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Mail, Github, FileText, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";

const IDENTITY_TAGS = [
  "Tepper MBA",
  "Product Intern",
  "Senior Data Engineer",
  "CS Graduate",
];

const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://linkedin.com/in/harini", label: "LinkedIn" },
  { icon: Mail,     href: "mailto:harini@andrew.cmu.edu",   label: "Email"    },
  { icon: Github,   href: "https://github.com/harini",      label: "GitHub"   },
  { icon: FileText, href: "/resume.pdf",                    label: "Resume"   },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: "easeOut", delay: 0.15 } },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen grid grid-cols-1 md:grid-cols-[60%_40%]"
      style={{ background: "#0A0A0A" }}
    >
      {/* Navbar — fixed, full width, variant=home uses anchor hrefs */}
      <Navbar variant="home" />

      {/* ── LEFT ─────────────────────────────────────────────────── */}
      <motion.div
        className="flex flex-col justify-center min-h-screen px-8 md:px-14 lg:px-20 pt-[72px] pb-20"
        style={{ background: "#0A0A0A" }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="font-sans font-extrabold uppercase mb-8"
          style={{
            fontSize: "clamp(48px, 5.5vw, 80px)",
            lineHeight: "0.94",
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ color: "var(--green)" }}>Harini</span>
          <br />
          <span style={{ color: "#F8F7F4" }}>Ramesh</span>
          <br />
          <span style={{ color: "#F8F7F4" }}>Chandran</span>
        </motion.h1>

        {/* Hairline rule */}
        <motion.div
          variants={fadeUp}
          className="w-full h-px mb-8"
          style={{ background: "rgba(248,247,244,0.08)" }}
        />

        {/* Positioning statement */}
        <motion.p
          variants={fadeUp}
          className="font-sans mb-6"
          style={{
            fontSize: "clamp(17px, 1.6vw, 22px)",
            lineHeight: "1.4",
            letterSpacing: "-0.01em",
            color: "#F8F7F4",
            maxWidth: "420px",
          }}
        >
          Building products at the intersection of
          strategy, AI, and human behavior.
        </motion.p>

        {/* Summary */}
        {/* <motion.p
          variants={fadeUp}
          className="font-sans mb-10"
          style={{
            fontSize: "14px",
            lineHeight: "1.85",
            color: "#9A9994",
            maxWidth: "380px",
          }}
        >
          MBA candidate at Carnegie Mellon Tepper. Background in software
          engineering, data analytics, and product-led problem solving.
          Technical depth in product decisions — business fluency in
          engineering rooms.
        </motion.p> */}

        {/* Identity tags */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-[10px] mb-12">
          {IDENTITY_TAGS.map((tag) => (
            <IdentityTag key={tag} label={tag} />
          ))}
        </motion.div>

        {/* Social icons */}
        <motion.div variants={fadeUp} className="flex items-center gap-6">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="transition-colors duration-200"
              style={{ color: "#5A5955" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--green-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#5A5955")}
            >
              <Icon size={30} strokeWidth={1.5} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* ── RIGHT: portrait ──────────────────────────────────────── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="hidden md:block relative overflow-hidden"
        style={{ background: "#000", minHeight: "100vh" }}
      >
        <Image
          src="/portrait.jpg"
          fill
          alt="Harini Ramesh Chandran"
          className="object-cover object-top"
          priority
        />
      </motion.div>

      {/* ── Double chevron — true viewport center ────────────────── */}
      <div
        className="fixed bottom-8 z-10 pointer-events-none"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        <a
          href="#work"
          aria-label="Scroll to next section"
          className="pointer-events-auto flex flex-col items-center opacity-40 hover:opacity-90 transition-opacity duration-300"
        >
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={60} strokeWidth={1.25} style={{ color: "var(--green)" }} />
            <ChevronDown size={60} strokeWidth={1.25} className="-mt-8" style={{ color: "var(--green)", opacity: 0.4 }} />
          </motion.div>
        </a>
      </div>
    </section>
  );
}

function IdentityTag({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-4 py-[7px] text-[15px] font-medium tracking-[0.07em] uppercase rounded-full select-none cursor-default transition-all duration-200"
      style={{
        border: "1px solid rgba(0,124,0,0.35)",
        color: "var(--green-light)",
        background: "transparent",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "var(--green)";
        el.style.color = "#F8F7F4";
        el.style.borderColor = "var(--green)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "transparent";
        el.style.color = "var(--green-light)";
        el.style.borderColor = "rgba(0,124,0,0.35)";
      }}
    >
      {label}
    </span>
  );
}
