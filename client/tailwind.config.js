const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#FFD700",
        },
        customgreen: {
          DEFAULT: "#1b8381",
        },
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      border: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
