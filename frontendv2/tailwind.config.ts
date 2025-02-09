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
        primary:  {
          DEFAULT: "#1D4ED8", // Base Primary Blue
          50: "#EFF6FF",  // Lightest Blue
          100: "#DBEAFE", // Lighter Blue
          200: "#BFDBFE", // Light Blue
          300: "#93C5FD", // Soft Blue
          400: "#60A5FA", // Medium Blue
          500: "#3B82F6", // Primary Blue
          600: "#2563EB", // Darker Primary
          700: "#1D4ED8", // Dark Blue
          800: "#1E40AF", // Deeper Blue
          900: "#1E3A8A", // Darkest Blue
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
