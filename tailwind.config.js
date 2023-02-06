/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "375px",
        sm: "600px",
        md: "900px",
        lg: "1200px",
        xl: "1536px",
      },
      colors: {
        icon: "white",
        primaryMessage: "#218aff",
        secondaryMessage: "#d8d8d8",
        green: "#39ff5a",
      },
      maxWidth: {
        contained: "120rem",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
