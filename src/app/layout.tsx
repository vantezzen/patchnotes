import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@next/third-parties/google";

const font = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Patch Notes",
  description: "Mix, Match, and Master the Art of Random Words",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased bg-brand-50 min-h-screen w-screen`}
      >
        {children}

        <Toaster />
        <GoogleAnalytics gaId="G-133GENRPLV" />
      </body>
    </html>
  );
}
