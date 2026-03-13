/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#24B3BD",
        "brand-dim": "#1a8a93",
        "brand-glow": "rgba(36,179,189,0.15)",
        surface: "#0a0a0a",
        "surface-1": "#111111",
        "surface-2": "#1a1a1a",
        "surface-3": "#222222",
        border: "#2a2a2a",
        "border-bright": "#333333",
        muted: "#666666",
        subtle: "#444444",
      },
      fontFamily: {
        heading: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "pulse-brand": "pulse-brand 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "score-fill": "score-fill 1.5s ease-out forwards",
        "fade-up": "fade-up 0.5s ease-out forwards",
        "agent-scan": "agent-scan 1.5s linear infinite",
      },
      keyframes: {
        "pulse-brand": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "score-fill": {
          from: { "stroke-dashoffset": "339" },
          to: { "stroke-dashoffset": "var(--score-offset)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "agent-scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};
