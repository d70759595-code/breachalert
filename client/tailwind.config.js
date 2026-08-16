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
        "bg-primary": "#070707",
        "bg-secondary": "#0D0D0D",
        "bg-card": "#121212",
        "bg-card-hover": "#181818",
        
        "on-background": "#F5F5F5",
        "on-surface": "#F5F5F5",
        "on-surface-variant": "#969696",
        "muted-text": "#626262",
        "outline-variant": "#424754",

        primary: "#FF6A2A",
        "primary-bright": "#FF7A3D",
        "primary-glow": "rgba(255, 90, 30, 0.35)",

        error: "#FF4D4D",
        danger: "#FF4D4D",
        success: "#45D483",
        tertiary: "#FF985C",
      },
      fontFamily: {
        display: ["Inter", "Geist", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};