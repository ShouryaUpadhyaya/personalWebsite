import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div className="min-h-[100vh]">
        {/* Placeholder for remaining sections */}
      </div>
    </main>
  );
}
