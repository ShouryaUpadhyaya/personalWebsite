import { notFound } from "next/navigation";
import { portfolio } from "@/data/portfolio";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  
  const project = portfolio.projects.find((p) => p.slug === slug);

  if (!project || !project.readmeUrl) {
    notFound();
  }

  const filePath = path.join(process.cwd(), "public", project.readmeUrl);
  let content = "";
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    content = "Failed to load project details.";
  }

  return (
    <div className="min-h-screen bg-black text-white py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <Link 
          href="/#projects"
          className="inline-flex items-center text-neutral-400 hover:text-white transition-colors mb-12 font-mono text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>
        
        <div className="prose prose-invert prose-neutral max-w-none 
          prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl
          prose-headings:text-white prose-headings:font-bold
          prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-a:transition-colors
          prose-strong:text-white prose-strong:font-semibold
          prose-blockquote:border-l-indigo-500 prose-blockquote:bg-white/5 prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:rounded-r-lg
          prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-white/10
          prose-th:bg-white/5 prose-th:p-3 prose-td:p-3 prose-td:border-t prose-td:border-white/10">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              img: (props) => (
                <div className="relative w-full overflow-hidden rounded-2xl my-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={props.src}
                    alt={props.alt || "Project image"}
                    className="w-full object-cover rounded-2xl m-0 border border-white/10"
                  />
                </div>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return portfolio.projects
    .filter(p => p.slug)
    .map((project) => ({
      slug: project.slug,
    }));
}
