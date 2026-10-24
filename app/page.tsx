import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about/about";
import { Projects } from "@/components/projects/projects";
import { Experience } from "@/components/experience/experience";
import { TechStack } from "@/components/tech-stack/tech-stack";
import { Writing } from "@/components/writing/writing";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";
import { CommandPalette } from "@/components/ui/command-palette";

export default function Home() {
  return (
    <>
      <CommandPalette />
      <Navbar />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-12">
        <main id="main">
          <Hero />
          <About />
          <Projects />
          <Experience />
          <TechStack />
          <Writing />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
