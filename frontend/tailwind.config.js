/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#012e33',
        secondary: '#66CCCC',
        tertiary: '#33757C',
        container: '#dbe7e6'
      },
    },
  },
  plugins: [],
};
