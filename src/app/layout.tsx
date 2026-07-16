import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://nextboi.dev",
  ),
  title: {
    default: "NextBoi - Premium Next.js 16 & Bun Boilerplate",
    template: "%s | NextBoi",
  },
  description:
    "A state-of-the-art developer boilerplate equipped with shadcn/ui, Tailwind CSS v4, and React Compiler support.",
  keywords: [
    "next.js 16",
    "bun",
    "tailwind css v4",
    "shadcn ui",
    "react compiler",
    "react 19",
    "boilerplate",
    "starter kit",
  ],
  authors: [{ name: "NextBoi Team" }],
  creator: "NextBoi Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nextboi.dev",
    siteName: "NextBoi",
    title: "NextBoi - Premium Next.js 16 & Bun Boilerplate",
    description:
      "Launch your next project with a state-of-the-art template configured for speed, pre-baked with shadcn/ui, Tailwind CSS v4, and modern aesthetics.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextBoi - Premium Next.js 16 & Bun Boilerplate",
    description:
      "A state-of-the-art developer boilerplate equipped with shadcn/ui, Tailwind CSS v4, and React Compiler support.",
    creator: "@nextboi",
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
      className={`${plusJakarta.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground font-sans relative overflow-x-hidden"
        suppressHydrationWarning
      >
        {/* Background glow effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none">
          <div className="absolute top-[-100px] left-[-100px] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-primary/5 dark:bg-primary/10 blur-[80px] sm:blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-[-100px] right-[-100px] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-[80px] sm:blur-[120px] animate-pulse-slow" />
        </div>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <Navbar />
            <main className="flex-1 flex flex-col relative z-10">
              {children}
            </main>
            <Footer />
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
