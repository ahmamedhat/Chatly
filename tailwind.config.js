/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      screens: {
        xs: "375px",
        sm: "600px",
        md: "900px",
        lg: "1200px",
        xl: "1536px",
      },
      colors: {
        icon: "white",
        dark: "rgb(31 41 55)",
        primaryMessage: "#218aff",
        secondaryMessage: "#d8d8d8",
        darkMessage: "#aeb9cc",
        green: "#39ff5a",
        offBlack: "#313639",
        darkTextInput: "#2A303C",
        lightTextInput: "rgb(246, 246,246)",
      },
      maxWidth: {
        contained: "120rem",
      },
      width: {
        iconMd: "2.3rem",
      },
    },
  },
  darkMode: "class",
  plugins: [require("daisyui")],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
