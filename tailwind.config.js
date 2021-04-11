module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.css",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        inherit: "inherit",
        background: "#727e84",
        accent: "#ebb7e7",
        primary: "#fcf5c3",
        secondary: "#729a98",
        tertiary: "#30404d",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
