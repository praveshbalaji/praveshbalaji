/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A1929",
        surface: "#101F33",
        surface2: "#14273D",
        line: "#22405C",
        lineSoft: "#17324A",
        ink: "#E7ECF3",
        muted: "#8CA0BC",
        muted2: "#5D7592",
        cyan: "#4FD1C5",
        amber: "#FFB454",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      perspective: {
        "1000": "1000px",
      },
    },
  },
  plugins: [],
};
