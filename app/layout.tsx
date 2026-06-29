import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shourya Upadhyaya | Lead Full-Stack Developer",
  description: "Portfolio of Shourya Upadhyaya, building production-ready scalable systems and beautiful user interfaces.",
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
      className={cn("h-full dark antialiased", geistSans.variable, geistMono.variable, inter.variable)}
    >
      <body className="min-h-full flex flex-col font-sans bg-neutral-950 text-neutral-50 selection:bg-neutral-800">
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
