"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  {
    id: "who",
    label: "Who I am",
    content: `I'm an engineer who learned to think like a strategist — and a strategist who never forgot how to build. Five years of writing code that powered decisions for tens of millions of people left me with a deep respect for what technology can do, and an equally deep curiosity about why it so often misses the mark.

I grew up in India, studied computer science at VIT, and spent my early career turning raw data into systems that actually changed how businesses operated. But somewhere along the way, I realized the most interesting problems weren't technical — they were human. Why do people use some products every day and abandon others after a week? Who decides what gets built, and how do they know they're right?

Those questions brought me to Carnegie Mellon Tepper. Not to escape engineering — but to understand it from the other side of the table.`,
  },
  {
    id: "why-pm",
    label: "Why PM?",
    content: `Product management chose me before I chose it. As a data engineer at JioStar, I kept finding myself in conversations I technically wasn't invited to — roadmap discussions, strategy reviews, debates about what to build next. Nobody asked me to be there. I just couldn't stay away.

I was the person who'd finish building a pipeline and immediately ask: "Who's going to use this? What decision does it enable? Are we measuring the right thing?" Eventually, my managers stopped treating those questions as interruptions and started treating them as contributions.

PM is the role where technical depth and business judgment have to coexist. I've spent five years building the technical depth. The MBA is where I'm building the judgment.`,
  },
  {
    id: "exploring",
    label: "What I'm exploring",
    content: `Right now I'm obsessed with two questions that keep colliding: how do AI features get decided inside product teams, and how do enterprise users actually learn to trust AI recommendations?

The first question is about process — the messy reality of how "we should use AI for this" becomes a shipped feature. I've seen it from the engineering side: the model exists, but nobody knows what problem it's solving. I want to understand how the best PM teams avoid that trap.

The second is about behavior. Enterprise AI adoption is slower and stranger than the hype suggests. Users don't distrust AI because it's wrong — they distrust it because they don't understand how it decides. That's a product problem, not a technical one. I'm researching it and I don't have the answer yet.`,
  },
  {
    id: "matters",
    label: "What matters to me",
    content: `Clarity. I have very little patience for complexity that exists to impress rather than to solve. The best systems — products, arguments, teams — are the ones where everything present has a reason to be there and nothing important is missing.

Honest feedback loops. I learned early that the most valuable thing you can do for someone is tell them the true version of what you see. I try to do that, and I look for environments that do it back.

Building things that last past the demo. It's easy to make something look good in a presentation. It's hard to make something that works at 3am when nobody's watching. I care about the second thing.`,
  },
  {
    id: "passionate",
    label: "What I'm passionate about",
    content: `The intersection of media, technology, and human attention. I spent three years at one of India's largest streaming platforms watching how content decisions — what to commission, how to surface it, who to recommend it to — shaped what 40 million people watched on a given evening. That kind of scale is humbling and fascinating in equal measure.

Outside of work: I cook seriously (South Indian, mostly, with occasional chaotic experiments), run four mornings a week because it's the one hour nobody can schedule over, and read slowly with a pen in hand. I played competitive Dota 2 for longer than I'll admit in a professional context, and I think it taught me more about resource allocation and team dynamics than most MBA case studies.`,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   { opacity: 0, y: -6, transition: { duration: 0.2, ease: "easeIn" } },
};

export function About() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const active = SECTIONS.find((s) => s.id === activeId)!;

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center py-24 px-8 md:px-14 lg:px-20"
      style={{ background: "#0A0A0A" }}
    >
      {/* Heading */}
      <motion.div
        className="mb-14 pt-10"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        <h2
          className="font-sans font-extrabold uppercase"
          style={{
            fontSize: "clamp(36px, 4vw, 56px)",
            lineHeight: "0.95",
            letterSpacing: "-0.025em",
            color: "#F8F7F4",
          }}
        >
          More than &nbsp;
          <span style={{ color: "var(--green)" }}>a résumé</span>
        </h2>
      </motion.div>

      {/* Layout: tabs + content */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-px"
        style={{ background: "rgba(248,247,244,0.06)" }}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* ── Left tab rail ─────────────────────────────────────── */}
        <div style={{ background: "#0A0A0A" }}>
          {SECTIONS.map((section) => {
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
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.background = "#0D0D0D";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="about-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[2px]"
                    style={{ background: "var(--green)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <p
                  className="text-[20px] font-medium transition-colors duration-200"
                  style={{ color: isActive ? "#F8F7F4" : "#5A5955" }}
                >
                  {section.label}
                </p>
              </button>
            );
          })}
        </div>

        {/* ── Right content panel ───────────────────────────────── */}
        <div
          className="px-10 pb-10 pt-6 md:px-14 md:pb-14 md:pt-8 relative"
          style={{ background: "#111111", minHeight: "420px" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              variants={contentVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="max-w-[620px]"
            >
              {/* Section label */}
              <p
                className="text-[20px] font-medium tracking-[0.12em] uppercase mb-6"
                style={{ color: "var(--green)" }}
              >
                {active.label}
              </p>

              {/* Content — split into paragraphs */}
              <div className="space-y-5">
                {active.content.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-[18px] leading-[1.85]"
                    style={{ color: "#F8F7F4" }}
                  >
                    {para}
                  </p>
                ))}
              </div>
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
        <div
          className="w-8 h-[2px] mb-8"
          style={{ background: "var(--green)" }}
        />
        <blockquote
          className="font-serif font-bold uppercase"
          style={{
            fontSize: "clamp(28px, 3.5vw, 48px)",
            lineHeight: "1.05",
            letterSpacing: "-0.025em",
            color: "#F8F7F4",
            maxWidth: "800px",
          }}
        >
          "I came to Tepper not to{" "}
          <span style={{ color: "var(--green)" }}>pivot</span>
          {" "}— but to add a layer."
        </blockquote>
      </motion.div>
    </section>
  );
}
