/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Ubuntu: "Ubuntu",
        Montserrat: "Montserrat",
      },
      colors: {
        primary: "#0F52BA",
      },
    },
  },
  plugins: [],
};
