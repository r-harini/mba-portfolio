import { getSiteConfig, getProjects, getExperience, getAboutSections, getBeyondPhotos } from "@/lib/cms";
import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Experience } from "@/components/home/Experience";
import { About } from "@/components/home/About";
import { BeyondWork } from "@/components/home/BeyondWork";
import { Contact } from "@/components/home/Contact";
import { ScrollChevron } from "@/components/home/ScrollChevron";

export default async function HomePage() {
  // All CMS fetches happen here on the server — parallel, no waterfalls
  const [config, projects,roles, aboutSections,photos] = await Promise.all([
    getSiteConfig(),
    getProjects(),      // featured only for homepage grid
    getExperience(),
    getAboutSections(),
    getBeyondPhotos()
  ]);

  return (
    <main>
      <Hero config={config} />
      <SelectedWork projects={projects}/>
      <Experience roles={roles} />
      <About sections={aboutSections} config={config} />
      <BeyondWork photos={photos} />
      <Contact config={config} />
      <ScrollChevron />
    </main>
  );
}
