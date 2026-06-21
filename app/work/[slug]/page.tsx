import { Navbar } from "@/components/ui/Navbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects, driveImage } from "@/lib/cms";
import { fetchDoc } from "@/lib/docs";
import "./project-body.css"

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const projects = await getProjects();
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const bodyHtml = await fetchDoc(project.doc_id);
  const tags = project.tags ? project.tags.split("|").map((t) => t.trim()) : [];
  const related = projects.filter((p) => p.id !== project.id).slice(0, 4);

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ background: "#0A0A0A", color: "#F8F7F4" }}
    >
      <Navbar variant="page" />

      {project.cover_drive_id && (
  <div className="w-full" style={{ height: "240px", overflow: "hidden", marginTop: "72px" }}>
    <img
      src={driveImage(project.cover_drive_id, 1600)}
      alt={project.title}
      className="w-full h-full object-cover"
    />
  </div>
)}

<div className="flex-1 px-8 md:px-20 py-12">
  <Link
    href="/#work"
    className="inline-flex items-center gap-2 text-[18px] font-medium mt-8 mb-12 transition-colors duration-200 relative z-[60]"
    style={{ color: "#5A5955" }}
  >
    <ArrowLeft size={15} strokeWidth={1.75} />
    Back to work
  </Link>

        <p
          className="text-[15px] font-medium tracking-[0.14em] uppercase mb-4"
          style={{ color: "var(--green)" }}
        >
          {project.project_type}
        </p>

        <h1
          className="font-serif font-bold mb-4"
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: "1.05",
            letterSpacing: "-0.02em",
            color: "#F8F7F4",
          }}
        >
          {project.title}
        </h1>

        <p
          className="text-[18px] leading-[1.6] mb-8"
          style={{ color: "#9A9994", maxWidth: "640px" }}
        >
          {project.subtitle}
        </p>

        <div className="flex flex-wrap gap-2 mb-16">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[13px] font-medium tracking-[0.05em] uppercase px-[10px] py-[4px] rounded-full"
              style={{ background: "rgba(254, 255, 254, 0.08)", color: "#d1c07b" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
  className="grid grid-cols-1 md:grid-cols-[1170px_280px] gap-16"
  style={{ justifyContent: "start" }}
>
  <div
    className="project-body"
    style={{ maxWidth: "1200px" }}
    dangerouslySetInnerHTML={{ __html: bodyHtml }}
  />

          <aside
            style={{
              position: "sticky",
              top: "100px",
              alignSelf: "start",
              borderLeft: "1px solid rgba(248,247,244,0.1)",
              paddingLeft: "24px",
            }}
          >
          <p
            className="text-[18px] font-medium tracking-[0.12em] uppercase mb-5"
            style={{ color: "#5A5955" }}
          >
            Related projects
          </p>
          <div>
            {related.map((r, i) => {
              const isLast = i === related.length - 1;
              return (
                <Link key={r.id} href={`/work/${r.id}`} className="group flex gap-4">
                  <span
                    className="text-[20px] font-bold flex-shrink-0"
                    style={{ color: "rgba(248,247,244,0.2)", paddingTop: "2px" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="flex-1 transition-colors duration-200"
                    style={{
                      borderBottom: isLast ? "none" : "1px solid rgba(248,247,244,0.06)",
                      paddingBottom: isLast ? "0" : "16px",
                      marginBottom: isLast ? "0" : "24px",
                    }}
                  >
                    <p
                      className="text-[20px] font-medium mb-[6px] transition-colors duration-200"
                      style={{ color: "#F8F7F4" }}
                    >
                      {r.title}
                    </p>
                    <p
                      className="text-[15px] font-medium tracking-[0.06em] uppercase"
                      style={{ color: "var(--green)" }}
                    >
                      {r.project_type}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </aside>
        </div>
      </div>
    </main>
  );
}