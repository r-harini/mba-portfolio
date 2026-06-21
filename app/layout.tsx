import type { Metadata } from "next";
import { Syne, DM_Sans, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const playfairDisplay = Playfair_Display({
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"], // 👈 bold black only
  variable: "--font-montserrat",

});

const syne = Syne({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harini Ramesh Chandran — Product · Strategy · AI",
  description:
    "MBA candidate at CMU Tepper. Building at the intersection of strategy, AI, and human behavior. Former data engineer, product thinker.",
  openGraph: {
    title: "Harini Ramesh Chandran",
    description: "Product · Strategy · AI — CMU Tepper MBA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${playfairDisplay.variable} ${montserrat.variable}`}>
      <body className="bg-bg text-ink font-sans antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
