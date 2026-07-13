import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/next";
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shouryaupadhyaya.com"),
  title: "Shourya Upadhyaya | Full-Stack Developer",
  description:
    "Portfolio of Shourya Upadhyaya, building production-ready scalable systems and beautiful user interfaces.",
  keywords: [
    "Shourya Upadhyaya",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "Node.js",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Shourya Upadhyaya" }],
  creator: "Shourya Upadhyaya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.shouryaupadhyaya.com",
    title: "Shourya Upadhyaya | Full-Stack Developer",
    description:
      "Portfolio of Shourya Upadhyaya, building production-ready scalable systems and beautiful user interfaces.",
    siteName: "Shourya Upadhyaya Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shourya Upadhyaya — Full-Stack Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shourya Upadhyaya | Full-Stack Developer",
    description:
      "Portfolio of Shourya Upadhyaya, building production-ready scalable systems and beautiful user interfaces.",
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
        geistSans.variable,
        geistMono.variable,
      )}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans bg-neutral-950 text-neutral-50 selection:bg-neutral-800 relative"
      >
        {/* Global animated background gradient */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-neutral-950 to-neutral-950"></div>
        <TooltipProvider>{children}</TooltipProvider>
        <Analytics />
      </body>
    </html>
  );
}
