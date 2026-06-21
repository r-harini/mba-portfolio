"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Mail, Github, ChevronDown, ScrollText } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";

interface HeroProps {
  config: Record<string, string>;
}

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

export function Hero({ config }: HeroProps) {
  const nameLine1   = config.hero_name_line1;
  const nameLine2   = config.hero_name_line2;
  const nameLine3   = config.hero_name_line3;
  const statement   = config.hero_statement;
  const summary     = config.hero_summary;
  const tags        = (config.hero_tags ?? "").split("|").map((t) => t.trim()).filter(Boolean);
  const linkedinUrl = config.linkedin_url;
  const email       = config.email;
  const githubUrl   = config.github_url;
  const resumeUrl   = config.resume_url;
  const portraitId  = config.portrait_drive_id;

  const SOCIAL_LINKS = [
    { icon: Linkedin,   href: linkedinUrl,       label: "LinkedIn" },
    { icon: Mail,       href: `mailto:${email}`, label: "Email"    },
    { icon: Github,     href: githubUrl,         label: "GitHub"   },
    { icon: ScrollText, href: resumeUrl,         label: "Resume"   },
  ];

  const portraitSrc = portraitId
    ? `https://drive.google.com/thumbnail?id=${portraitId}&sz=w1200`
    : "/portrait.jpg";

  return (
    <section
      id="home"
      className="relative min-h-screen grid grid-cols-1 md:grid-cols-[60%_40%]"
      style={{ background: "#0A0A0A" }}
    >
      <Navbar variant="home" />

      {/* ── LEFT ─────────────────────────────────────────────────── */}
      <motion.div
        className="flex flex-col justify-center min-h-screen px-8 md:px-14 lg:px-20 pt-[72px] pb-20"
        style={{ background: "#0A0A0A" }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          variants={fadeUp}
          className="font-display font-bold uppercase mb-8"
          style={{
            fontSize: "clamp(48px, 5.5vw, 80px)",
            lineHeight: "0.94",
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ color: "var(--green)" }}>{nameLine1}</span>
          <br />
          <span style={{ color: "#F8F7F4" }}>{nameLine2}</span>
          <br />
          <span style={{ color: "#F8F7F4" }}>{nameLine3}</span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="w-full h-px mb-8"
          style={{ background: "rgba(248,247,244,0.08)" }}
        />

        <motion.p
          variants={fadeUp}
          className="font-sans mb-6"
          style={{
            fontSize: "clamp(17px, 1.6vw, 22px)",
            lineHeight: "1.4",
            letterSpacing: "-0.01em",
            color: "#F8F7F4",
            
          }}
        >
          {statement?.split("|").map((line, i, arr) => (
    <span key={i}>
      {line.trim()}
      {i < arr.length - 1 && <br />}
    </span>
  ))}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="font-sans mb-10"
          style={{
            fontSize: "14px",
            lineHeight: "1.85",
            color: "#9A9994",
            maxWidth: "380px",
          }}
        >
          {summary}
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-[10px] mb-12">
          {tags.map((tag) => (
            <IdentityTag key={tag} label={tag} />
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center gap-20">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <SocialIcon key={label} icon={Icon} href={href} label={label} />
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
          src={portraitSrc}
          fill
          alt={`${nameLine1 ?? ""} ${nameLine2 ?? ""} ${nameLine3 ?? ""}`.trim()}
          className="object-cover object-top"
          priority
        />
      </motion.div>
    </section>
  );
}

function SocialIcon({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  href?: string;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
    <a  
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={label}
        className="block transition-colors duration-200"
        style={{ color: hovered ? "var(--green-light)" : "#5A5955" }}
      >
        <Icon size={40} strokeWidth={1.5} />
      </a>

      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 whitespace-nowrap pointer-events-none"
            style={{
              top: "calc(100% + 13px)",
              transform: "translateX(-50%)",
              background: "#111111",
              border: "1px solid rgba(248,247,244,0.08)",
              color: "#F8F7F4",
              fontSize: "15px",
              fontWeight: 500,
              padding: "5px 10px",
              borderRadius: "6px",
            }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

function IdentityTag({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-4 py-[7px] text-[13px] font-medium tracking-[0.07em] uppercase rounded-full select-none cursor-default transition-all duration-200"
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