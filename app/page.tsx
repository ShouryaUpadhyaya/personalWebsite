import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { Stats } from "@/components/stats/stats";
import { Projects } from "@/components/projects/projects";
import { Experience } from "@/components/experience/experience";
import { Writing } from "@/components/writing/writing";
import { TechStack } from "@/components/tech-stack/tech-stack";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Projects />
      <Experience />
      <Writing />
      <TechStack />
      <div className="min-h-[100vh]">
        {/* Placeholder for remaining sections */}
      </div>
    </main>
  );
}
