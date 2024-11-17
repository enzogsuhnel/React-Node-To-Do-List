/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F15206",
        background: "#0D0D0D",
        darkergreen: "#1e9767",
        lightgreen: "#d4fdd8",
        error: "#F53D32",
        success: "#13AFFF",
        waning: "#FFB90D",
      },
    },
  },
  plugins: [],
};
