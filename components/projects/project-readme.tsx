"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ProjectReadme({ url }: { url: string }) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReadme() {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (res.ok) {
          const text = await res.text();
          setContent(text);
        } else {
          setContent("Failed to load project details.");
        }
      } catch (err) {
        setContent("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    }

    if (url) {
      fetchReadme();
    }
  }, [url]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="prose prose-invert prose-neutral max-w-none prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-headings:text-white prose-a:text-indigo-400 hover:prose-a:text-indigo-300">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
