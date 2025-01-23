import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2B6CB0",    // Blue - primary actions, navigation
        accent: "#E76F51",     // Orange - emphasis, CTAs
        secondary: "#2A9D8F",  // Teal - success states
        warning: "#FFB938",    // Yellow - icons, accents
        text: "#1D3557",       // Navy - body text
        heading: "#8B4513",    // Brown - headers
        background: "#F5E6D3", // Warm background
        white: "#FFFFFF",      // White
      },
    },
  },
  plugins: [],
} satisfies Config;
