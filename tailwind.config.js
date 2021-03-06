const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
    "./pages/content.{js,ts,jsx,tsx}",
    "./pages/categories.{js,ts,jsx,tsx}",
    "./pages/tags.{js,ts,jsx,tsx}",
    "./pages/series.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"'],
        body: ["Poppins"],
        sans: ["Poppins"],
      },
      colors: {
        teal: "#4ef6c7",
        secondary: "#4ef6c7b3",
        tertiary: "#4ef6c766",
        "off-black": "#1b1b1b",
      },
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
