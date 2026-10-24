import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/next";
import { GridBackground } from "@/components/layout/grid-background";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ProjectFilterProvider } from "@/lib/project-filter";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shouryaupadhyaya.com"),
  title: "Shourya Upadhyaya | Software Engineer",
  description:
    "Software engineer specializing in distributed backend architectures, real-time audio & ML pipelines, and high-performance full-stack systems.",
  keywords: [
    "Shourya Upadhyaya",
    "Software Engineer",
    "Backend Engineer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "Node.js",
    "Go",
    "PostgreSQL",
    "Portfolio",
  ],
  authors: [{ name: "Shourya Upadhyaya" }],
  creator: "Shourya Upadhyaya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.shouryaupadhyaya.com",
    title: "Shourya Upadhyaya | Software Engineer",
    description:
      "Software engineer specializing in distributed backend architectures, real-time audio & ML pipelines, and high-performance full-stack systems.",
    siteName: "Shourya Upadhyaya",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shourya Upadhyaya — Software Engineer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shourya Upadhyaya | Software Engineer",
    description:
      "Software engineer specializing in distributed backend architectures, real-time audio & ML pipelines, and high-performance full-stack systems.",
    creator: "@Shourya60756648",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full dark antialiased",
        inter.variable,
        jetbrainsMono.variable,
      )}
    >
      <body
        suppressHydrationWarning
        className="bg-[#050505] text-[#EAEAEA] min-h-screen selection:bg-white selection:text-black relative font-sans overflow-x-hidden"
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-6 focus:left-6 focus:z-[70] focus:px-4 focus:py-2 focus:rounded-full focus:bg-white focus:text-black focus:font-mono focus:text-xs focus:tracking-widest"
        >
          SKIP TO CONTENT
        </a>
        <ScrollProgress />
        <CustomCursor />
        <GridBackground />
        <ProjectFilterProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ProjectFilterProvider>
        <Analytics />
      </body>
    </html>
  );
}
