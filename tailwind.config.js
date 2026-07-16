/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74",
          400: "#fb9a3c", 500: "#ff9933", 600: "#ea7c1a", 700: "#c25e10",
          800: "#9a4a15", 900: "#7c3d15",
        },
        india: {
          green: "#138808", greenDark: "#0f6b06", greenLight: "#e7f5e5",
          navy: "#000080", navyLight: "#e6e6f2",
        },
      },
      screens: { xs: "420px" },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        pop: "0 10px 30px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
