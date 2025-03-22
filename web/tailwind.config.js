
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#000000",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#333333",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#555555",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#8B0000",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#333333",
          foreground: "#CCCCCC",
        },
        accent: {
          DEFAULT: "#444444",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#222222",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#333333",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        mono: ['monospace'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
