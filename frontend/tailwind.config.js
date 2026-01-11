/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#e6f0ff",
          100: "#b3d1ff",
          200: "#80b3ff",
          300: "#4d94ff",
          400: "#1a75ff",
          500: "#0056e6",
          600: "#0043b3",
          700: "#003080",
          800: "#001d4d",
          900: "#000a1a",
        },
      },
    },
  },
  plugins: [],
};
