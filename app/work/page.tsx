"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { getProjects } from "@/lib/cms";
import type { Project } from "@/lib/cms";

const CARD_TINTS = [
  "#080E09", "#09100A", "#070D08", "#0A100B", "#060E08", "#08100A",
];

const FILTERS = ["All", "Case Study", "Case Competition", "Teardown", "Data Analysis"];

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function ViewAllWorkPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.project_type === activeFilter);

  return (
    <main className="min-h-screen" style={{ background: "#0A0A0A", color: "#F8F7F4" }}>
      <Navbar variant="page" />

      <div className="px-8 md:px-20 pt-32 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[18px] font-medium mb-12 transition-colors duration-200"
          style={{ color: "#5A5955" }}
        >
          <ArrowLeft size={15} strokeWidth={1.75} />
          Back to home
        </Link>

        <h1
          className="font-serif font-bold mb-10"
          style={{
            fontSize: "clamp(36px, 4.5vw, 56px)",
            lineHeight: "1.05",
            letterSpacing: "-0.02em",
            color: "#F8F7F4",
          }}
        >
          All work
        </h1>

        <div className="flex flex-wrap gap-[10px] mb-14">
          {FILTERS.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="text-[15px] font-medium px-[18px] py-[8px] rounded-full transition-all duration-200"
                style={
                  isActive
                    ? { background: "var(--green)", color: "#0A0A0A" }
                    : { color: "#9A9994", border: "1px solid rgba(248,247,244,0.14)" }
                }
              >
                {filter}
              </button>
            );
          })}
        </div>

        {!loading && filtered.length === 0 && (
          <p className="text-[15px]" style={{ color: "#5A5955" }}>
            No projects in this category yet.
          </p>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: "rgba(248,247,244,0.06)" }}
          variants={gridContainer}
          initial="hidden"
          animate="show"
        >
          {filtered.map((project, i) => (
            <ViewAllCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </main>
  );
}

function ViewAllCard({ project, index }: { project: Project; index: number }) {
  const tags = project.tags ? project.tags.split("|").map((t) => t.trim()) : [];
  const indexLabel = String(index + 1).padStart(2, "0");
  const tint = CARD_TINTS[index % CARD_TINTS.length];

  return (
    <motion.div variants={cardVariant}>
      <Link
        href={`/work/${project.id}`}
        className="group block h-full p-8 md:p-9 transition-all duration-300 relative overflow-hidden"
        style={{ background: tint }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#0F1A10";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = tint;
        }}
      >
        <div
          className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
          style={{
            background: "radial-gradient(circle at top left, rgba(0,124,0,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="flex items-center justify-between mb-8">
          <span
            className="font-sans font-bold text-[13px] tracking-[0.1em]"
            style={{ color: "rgba(248,247,244,0.15)" }}
          >
            {indexLabel}
          </span>
          <span
            className="text-[13px] font-medium tracking-[0.1em] uppercase"
            style={{ color: "var(--green)" }}
          >
            {project.category}
          </span>
        </div>

        <h3
          className="font-sans font-bold mb-4"
          style={{
            fontSize: "clamp(18px, 1.6vw, 30px)",
            lineHeight: "1.15",
            letterSpacing: "-0.02em",
            color: "#F8F7F4",
          }}
        >
          {project.title}
        </h3>

        <p className="text-[17px] leading-[1.7] mb-8" style={{ color: "#9A9994" }}>
          {project.subtitle}
        </p>

        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="flex flex-wrap gap-[6px] mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[13px] font-medium tracking-[0.05em] uppercase px-[10px] py-[4px] rounded-full"
                  style={{ background: "rgba(0,124,0,0.08)", color: "#5A5955" }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-[15px] font-medium" style={{ color: "var(--green-light)" }}>
              {project.impact_metric}
            </p>
          </div>

          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300 opacity-0 group-hover:opacity-100"
            style={{ background: "var(--green)" }}
          >
            <ArrowUpRight size={15} strokeWidth={2} color="#F8F7F4" />
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px transition-all duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: "var(--green)" }}
        />
      </Link>
    </motion.div>
  );
}