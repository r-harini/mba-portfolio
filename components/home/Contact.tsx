"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, Github, FileText, ArrowUpRight, Calendar, ScrollText } from "lucide-react";

interface ContactProps {
  config: Record<string, string>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const linkVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function Contact({ config }: ContactProps) {
  const calendarUrl  = config.calendar_url;
  const linkedinUrl  = config.linkedin_url;
  const email        = config.email;
  const githubUrl    = config.github_url;
  const resumeUrl    = config.resume_url;

  const LINKS = [
    { icon: ScrollText, label: "Resume",        sub: "Download latest version",        href: resumeUrl,          external: false, download: true  },
    { icon: Linkedin, label: "LinkedIn",      sub: "Connect or send a DM",          href: linkedinUrl,        external: true  },
    { icon: Mail,     label: email,           sub: "Best for thoughtful outreach",   href: `mailto:${email}`,  external: false },
    { icon: Github,   label: "GitHub",        sub: "Code, notebooks, side projects", href: githubUrl,          external: true  },
    
  ];

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center py-24 px-8 md:px-14 lg:px-20"
      style={{ background: "#0A0A0A" }}
    >
      <motion.div
        className="mb-16 pt-10"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        <h2
          className="font-sans font-extrabold uppercase"
          style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: "0.95", letterSpacing: "-0.025em", color: "#F8F7F4" }}
        >
          Let&apos;s
          <br />
          <span style={{ color: "var(--green)" }}>connect</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

        {/* Left — intro + calendar */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
          <p className="text-[18px] leading-[1.75] mb-10" style={{ color: "#9A9994" }}>
            I'm always up for conversations about product, AI, and the messy realities of building things people actually use. 
            <br/>
            <br/>
            If you're recruiting, I'd love to talk about full-time roles.
          </p>

          <div
            className="rounded-[10px] p-8"
            style={{ border: "1px solid rgba(248,247,244,0.08)", background: "#111111" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,124,0,0.15)" }}
              >
                <Calendar size={16} strokeWidth={1.5} style={{ color: "var(--green)" }} />
              </div>
              <div>
                <p className="text-[23px] font-medium" style={{ color: "#F8F7F4" }}>Book 30 minutes</p>
                <p className="text-[17px]" style={{ color: "#5A5955" }}>
                  {calendarUrl ? "Pick a time that works" : "Calendar link coming soon"}
                </p>
              </div>
            </div>

            <div className="w-full h-px mb-6" style={{ background: "rgba(248,247,244,0.06)" }} />

            {calendarUrl ? (
              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[17px] font-medium transition-colors duration-200"
                style={{ color: "var(--green-light)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F8F7F4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--green-light)")}
              >
                Book a time <ArrowUpRight size={17} strokeWidth={1.75} />
              </a>
            ) : (
              <p className="text-[13px] leading-[1.7]" style={{ color: "#5A5955" }}>
                I'm available for 30-minute intro calls — product roles,
                recruiting conversations, and interesting collaborations.
              </p>
            )}
          </div>
        </motion.div>

        {/* Right — links */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col gap-3"
        >
          {LINKS.map(({ icon: Icon, label, sub, href, external, download }) => (
            <motion.a
              key={label}
              variants={linkVariant}
              href={href}
              target={external ? "_blank" : undefined}
              download={download ? true : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-5 p-5 rounded-[10px] transition-all duration-200"
              style={{ border: "1px solid rgba(248,247,244,0.06)", background: "transparent", textDecoration: "none" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#111111";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,124,0,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,247,244,0.06)";
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(248,247,244,0.05)" }}
              >
                <Icon size={25} strokeWidth={1.5} style={{ color: "#5A5955" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[20px] font-medium truncate" style={{ color: "#F8F7F4" }}>{label}</p>
                <p className="text-[18px]" style={{ color: "#5A5955" }}>{sub}</p>
              </div>
              <ArrowUpRight
                size={15}
                strokeWidth={1.75}
                className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: "var(--green)" }}
              />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Sign-off */}
      <motion.div
        className="mt-24 pt-10"
        style={{ borderTop: "1px solid rgba(248,247,244,0.06)" }}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p
          className="font-sans font-bold "
          style={{ fontSize: "clamp(22px, 2.5vw, 32px)", letterSpacing: "-0.02em", lineHeight: "1.1", color: "rgba(248,247,244,0.12)" }}
        >
          Harini Ramesh Chandran · Pittsburgh, PA · {new Date().getFullYear()}
        </p>
      </motion.div>
    </section>
  );
}
