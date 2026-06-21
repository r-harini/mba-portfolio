"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const PHOTOS = [
  {
    id: "himalayas",
    title: "Trekking the Himalayas",
    caption: "12,500 feet · no Slack · great decisions",
    story: "I took two weeks off between Capgemini and JioStar to trek to Kedarkantha. No laptop. No notifications. 12,500 feet of silence and the clearest thinking I've done in years. I came back with one conviction: the best ideas don't come at desks.",
    aspect: "2/3",
    bg: "linear-gradient(160deg, #1a2e1a 0%, #2d4a2d 100%)",
  },
  {
    id: "cooking",
    title: "Cooking as product design",
    caption: "Recipe as spec · kitchen as scrum",
    story: "I cook mostly South Indian — the kind where tamarind, heat, and timing interact in ways that reward both intuition and experimentation. Recipe as spec. Mise en place as planning. The moment you deviate from the recipe is when you learn something. Same as building software.",
    aspect: "4/3",
    bg: "linear-gradient(160deg, #2e1a0a 0%, #4a2e10 100%)",
  },
  {
    id: "reading",
    title: "Reading slowly",
    caption: "Pen in hand · margins full of arguments",
    story: "I read slowly and annotate everything. The margins of my books look like product briefs. Current stack rotates between behavioral economics, media industry analysis, and whatever Substack rabbit hole I'm in. The Mom Test has lived in my bag for two years.",
    aspect: "1/1",
    bg: "linear-gradient(160deg, #1a1a2e 0%, #2a2a4a 100%)",
  },
  {
    id: "dota",
    title: "Competitive Dota 2",
    caption: "Resource allocation · disguised as gaming",
    story: "I played competitive Dota 2 for three years. What sounds like a guilty pleasure is actually a crash course in resource allocation, role clarity, and real-time decision-making under pressure. Every team fight is a prioritization exercise. I'll defend this forever.",
    aspect: "4/3",
    bg: "linear-gradient(160deg, #0a0a2e 0%, #1a1a4a 100%)",
  },
  {
    id: "pittsburgh",
    title: "Pittsburgh in the fall",
    caption: "CMU in October · the cut · Saturday mornings",
    story: "CMU's campus in October is genuinely beautiful in a way that feels unearned for a city famous for bridges and grey skies. I spend Saturday mornings walking the cut with coffee. It's become my version of a weekly reset — part thinking time, part proof that leaving your desk is not wasted time.",
    aspect: "3/4",
    bg: "linear-gradient(160deg, #2e1e0a 0%, #4a3010 100%)",
  },
  {
    id: "running",
    title: "Running at 6am",
    caption: "4 mornings a week · non-negotiable",
    story: "I run four mornings a week — not for the metrics, but because a 6am run is the one thing on my calendar that nobody else controls. It's also where I do my best abstract problem-solving. Something about moving forward without a screen in front of you.",
    aspect: "1/1",
    bg: "linear-gradient(160deg, #1e1e1e 0%, #2e2e2e 100%)",
  },
  {
    id: "music",
    title: "Music as a mood system",
    caption: "Carnatic in the morning · ambient at work",
    story: "My listening is deeply context-dependent. Carnatic classical in the morning, ambient or lo-fi when I'm in flow, something loud and fast when I need energy. I grew up learning Carnatic vocals and still find it the most intellectually demanding music I've encountered.",
    aspect: "4/3",
    bg: "linear-gradient(160deg, #2e0a1e 0%, #4a1030 100%)",
  },
  {
    id: "travel",
    title: "Slow travel",
    caption: "No itinerary · always a notebook",
    story: "I travel slowly and without much of an agenda. The best trips I've taken have involved getting somewhere and then figuring out what's interesting rather than following a list. I always have a notebook. The observations I write on the first day in a new place are usually the most interesting ones.",
    aspect: "2/3",
    bg: "linear-gradient(160deg, #0a1e2e 0%, #103040 100%)",
  },
];

// Split into 3 columns for masonry
function buildColumns(items: typeof PHOTOS, count: number) {
  const cols: (typeof PHOTOS)[] = Array.from({ length: count }, () => []);
  items.forEach((item, i) => cols[i % count].push(item));
  return cols;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  show:   { opacity: 1, scale: 1,    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   { opacity: 0, scale: 0.96, transition: { duration: 0.2, ease: "easeIn" } },
};

export function BeyondWork() {
  const [selected, setSelected] = useState<typeof PHOTOS[0] | null>(null);
  const columns = buildColumns(PHOTOS, 3);

  return (
    <section
      id="beyond"
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
          When I&apos;m not
          <br />
          <span style={{ color: "var(--green)" }}>at the desk</span>
        </h2>
      </motion.div>

      {/* Masonry grid — 3 columns */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ show: { transition: { staggerChildren: 0.07 } } }}
      >
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-3">
            {col.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onClick={() => setSelected(photo)}
              />
            ))}
          </div>
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50"
              style={{ background: "rgba(0,0,0,0.85)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />

            {/* Modal box */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="pointer-events-auto grid grid-cols-1 md:grid-cols-2 overflow-hidden"
                style={{
                  width: "min(75vw, 900px)",
                  maxHeight: "85vh",
                  background: "#111111",
                  borderRadius: "12px",
                  border: "1px solid rgba(248,247,244,0.08)",
                }}
              >
                {/* Image side */}
                <div
                  className="w-full"
                  style={{
                    background: selected.bg,
                    minHeight: "280px",
                    aspectRatio: "1",
                  }}
                />

                {/* Content side */}
                <div className="p-10 flex flex-col justify-between relative">
                  {/* Close */}
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
                    <p
                      className="text-[11px] font-medium tracking-[0.12em] uppercase mb-4"
                      style={{ color: "var(--green)" }}
                    >
                      {selected.caption}
                    </p>
                    <h3
                      className="font-sans font-bold mb-6"
                      style={{
                        fontSize: "clamp(20px, 2vw, 26px)",
                        lineHeight: "1.15",
                        letterSpacing: "-0.02em",
                        color: "#F8F7F4",
                      }}
                    >
                      {selected.title}
                    </h3>
                    <p
                      className="text-[14px] leading-[1.85]"
                      style={{ color: "#9A9994" }}
                    >
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

function PhotoCard({
  photo,
  onClick,
}: {
  photo: typeof PHOTOS[0];
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariant}
      className="relative overflow-hidden cursor-pointer"
      style={{ borderRadius: "8px" }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo placeholder */}
      <div
        style={{
          background: photo.bg,
          aspectRatio: photo.aspect,
          width: "100%",
        }}
      />

      {/* Overlay — fades in on hover */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-5"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)",
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22 }}
      >
        <p
          className="font-sans font-bold mb-1"
          style={{
            fontSize: "15px",
            lineHeight: "1.2",
            color: "#F8F7F4",
            letterSpacing: "-0.01em",
          }}
        >
          {photo.title}
        </p>
        <p
          className="text-[11px] tracking-[0.04em]"
          style={{ color: "rgba(248,247,244,0.55)" }}
        >
          {photo.caption}
        </p>
      </motion.div>

      {/* Green corner accent on hover */}
      <motion.div
        className="absolute top-0 left-0 w-[2px]"
        style={{ background: "var(--green)" }}
        animate={{ height: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </motion.div>
  );
}
