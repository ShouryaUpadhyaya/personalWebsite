import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="pt-12 pb-24 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="font-mono text-[10px] tracking-widest text-white/50">
        &copy; {new Date().getFullYear()} {profile.name.toUpperCase()} &middot;{" "}
        {profile.location.toUpperCase()}
      </div>

      <div className="flex flex-wrap justify-center gap-8 font-mono text-xs tracking-widest text-white/55">
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors duration-300"
        >
          RÉSUMÉ
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition-colors duration-300"
        >
          GITHUB
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition-colors duration-300"
        >
          LINKEDIN
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="hover:text-white transition-colors duration-300"
        >
          EMAIL
        </a>
      </div>
    </footer>
  );
}
