import { Playfair_Display } from "next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0A",
        surface: "#141414",
        ink: {
          DEFAULT: "#F8F7F4",
          2: "#9A9994",
          3: "#5A5955",
        },
        green: {
          DEFAULT: "#007C00",
          muted: "#004D00",
          light: "#0FBF0F",
        },
      },
      fontFamily: {
        serif: ["var(--font-syne)", "system-ui", "sans-serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"]
        // sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero-name": [
          "clamp(72px, 8.5vw, 120px)",
          { lineHeight: "0.92", letterSpacing: "-0.03em" },
        ],
        "hero-statement": [
          "clamp(18px, 1.8vw, 24px)",
          { lineHeight: "1.4", letterSpacing: "-0.01em" },
        ],
        "section-title": [
          "clamp(36px, 4vw, 56px)",
          { lineHeight: "1.0", letterSpacing: "-0.025em" },
        ],
      },
    },
  },
  plugins: [],
};

export default config;