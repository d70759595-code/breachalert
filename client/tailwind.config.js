/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#070707",
        "on-background": "#F5F5F5",
        surface: "#090909",
        "surface-container-lowest": "#070707",
        "surface-container-low": "#0C0C0C",
        "surface-container": "#111111",
        "surface-container-high": "#141414",
        "surface-container-highest": "#181818",
        "surface-variant": "#181818",
        "on-surface": "#F5F5F5",
        "on-surface-variant": "#929292",
        outline: "#2A2A2A",
        "outline-variant": "#1F1F1F",
        primary: "#FF6A2A",
        "primary-container": "#FF783A",
        error: "#FF3B30",
        "error-container": "#4A0E0B",
        tertiary: "#FFB020",
        "tertiary-container": "#5C3D00",
        success: "#35D07F",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};