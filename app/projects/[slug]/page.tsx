import { notFound } from "next/navigation";
import { portfolio } from "@/data/portfolio";
import { caseStudies } from "@/data/case-studies";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Mermaid } from "@/components/projects/mermaid";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { CommandPalette } from "@/components/ui/command-palette";
import { CaseStudyView } from "@/components/case-study/case-study-view";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title}: Case Study | Shourya Upadhyaya`,
    description: `${project.tagline} ${project.description}`,
    openGraph: {
      title: `${project.title}: Case Study | Shourya Upadhyaya`,
      description: `${project.tagline} ${project.description}`,
      url: `https://www.shouryaupadhyaya.com/projects/${project.slug}`,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title}: Case Study | Shourya Upadhyaya`,
      description: `${project.tagline} ${project.description}`,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  const project = portfolio.projects.find((p) => p.slug === slug);
  const study = caseStudies[slug];

  if (!project || !study) {
    notFound();
  }

  let content = "";
  if (project.readmeUrl) {
    const filePath = path.join(process.cwd(), "public", project.readmeUrl);
    try {
      content = fs.readFileSync(filePath, "utf-8");
    } catch {
      content = "";
    }
  }

  return (
    <>
      <CommandPalette />
      <Navbar />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-12">
        <main id="main">
          <CaseStudyView project={project} study={study}>
            {content ? (
              <div
                className="prose prose-invert prose-neutral max-w-none
                prose-img:rounded-2xl prose-img:border prose-img:border-white/10
                prose-headings:text-white prose-headings:font-medium prose-headings:tracking-tight
                prose-p:text-white/70 prose-p:font-light prose-p:leading-relaxed
                prose-li:text-white/70 prose-li:font-light
                prose-a:text-white prose-a:underline prose-a:decoration-white/30 hover:prose-a:decoration-white
                prose-strong:text-white prose-strong:font-medium
                prose-blockquote:border-l-white/30 prose-blockquote:bg-white/[0.02] prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:rounded-r-lg
                prose-pre:bg-[#080808] prose-pre:border prose-pre:border-white/[0.06]
                prose-th:bg-white/[0.04] prose-th:p-3 prose-td:p-3 prose-td:border-t prose-td:border-white/[0.06]"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    img: (props) => (
                      <div className="relative w-full overflow-hidden rounded-2xl my-8">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={props.src}
                          alt={props.alt || "Project diagram"}
                          className="w-full object-cover rounded-2xl m-0 border border-white/10"
                        />
                      </div>
                    ),
                    code: ({
                      inline,
                      className,
                      children,
                      ...props
                    }: {
                      inline?: boolean;
                      className?: string;
                      children?: React.ReactNode;
                    }) => {
                      const match = /language-(\w+)/.exec(className || "");
                      if (!inline && match && match[1] === "mermaid") {
                        return (
                          <Mermaid
                            chart={String(children).replace(/\n$/, "")}
                          />
                        );
                      }
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            ) : null}
          </CaseStudyView>
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return portfolio.projects
    .filter((p) => p.slug)
    .map((project) => ({
      slug: project.slug,
    }));
}
