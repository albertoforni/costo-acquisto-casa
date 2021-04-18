module.exports = {
  purge: ["src/**/*.tsx", "public/index.html"],
  dark: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
