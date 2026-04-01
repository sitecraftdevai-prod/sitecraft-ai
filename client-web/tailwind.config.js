/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C9FF31',
        surface: '#141414',
        accent: '#C9FF31',
      },
    },
  },
  plugins: [],
}
