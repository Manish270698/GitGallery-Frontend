/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backggroundImage: {
        "gradient-border": "linear-gradient(to right, #ff7e5f, #feb47b)",
      },
    },
  },
  plugins: [],
};
