import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about/about";
import { Problem } from "@/components/problem/problem";
import { Projects } from "@/components/projects/projects";
import { Testimonials } from "@/components/testimonials/testimonials";
import { Experience } from "@/components/experience/experience";
import { Education } from "@/components/education/education";
import { FAQ } from "@/components/faq/faq";
import { Writing } from "@/components/writing/writing";
import { TechStack } from "@/components/tech-stack/tech-stack";
import { Guarantee } from "@/components/guarantee/guarantee";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-neutral-800">
      <Navbar />
      <Hero />
      <About />
      <Problem />
      <Projects />
      <Testimonials />
      <Experience />
      <Education />
      <FAQ />
      <Writing />
      <TechStack />
      <Guarantee />
      <Contact />
      <Footer />
    </main>
  );
}
