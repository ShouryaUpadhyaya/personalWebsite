import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { Stats } from "@/components/stats/stats";
import { Projects } from "@/components/projects/projects";
import { Experience } from "@/components/experience/experience";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Projects />
      <Experience />
      <div className="min-h-[100vh]">
        {/* Placeholder for remaining sections */}
      </div>
    </main>
  );
}
