import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { Projects } from "@/components/projects/projects";
import { Experience } from "@/components/experience/experience";
import { Writing } from "@/components/writing/writing";
import { TechStack } from "@/components/tech-stack/tech-stack";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-neutral-800">
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <Writing />
      <TechStack />
      <Contact />
      <Footer />
    </main>
  );
}
