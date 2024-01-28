/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      color:{
        'background-color': '#20242C'
      },
      fontFamily: {
        'bebas': ['"Bebas Neue"', 'cursive'],
        'neuton': ['Neuton', 'serif'],
        'honk': ['Honk', 'cursive'],
      }
    },
  },
  plugins: [],
}


