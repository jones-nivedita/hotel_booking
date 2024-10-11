/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-navy': '#4d597a',
        'silver': '#bbbbbb',
        'dark-purple-navy': '#394566',
        'beige': '#F5F5DC',
      }
    },
  },
  plugins: [],
}

