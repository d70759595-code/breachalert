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
        background: "#10131a",
        "on-background": "#e1e2ec",
        surface: "#10131a",
        "surface-container-lowest": "#0b0e15",
        "surface-container-low": "#191b23",
        "surface-container": "#1d2027",
        "surface-container-high": "#272a31",
        "surface-container-highest": "#32353c",
        "surface-variant": "#32353c",
        "on-surface": "#e1e2ec",
        "on-surface-variant": "#c2c6d6",
        outline: "#8c909f",
        "outline-variant": "#424754",
        primary: "#3b82f6",
        "primary-container": "#4d8eff",
        error: "#ffb4ab",
        "error-container": "#93000a",
        tertiary: "#ffb786",
        "tertiary-container": "#df7412",
        success: "#34d399",
      },
      fontFamily: {
        display: ["Geist", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};