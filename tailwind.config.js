/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'neon-primary': '#1a1a1a',
          'neon-secondary': '#121212',
          'neon': '#1a1a1a'
        },
      },
    },
    plugins: [],
  }