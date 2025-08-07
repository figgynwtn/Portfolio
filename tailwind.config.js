/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
      },
        colors: {
          'neon-primary': '#1a1a1a',
          'neon-secondary': '#121212',
          'neon': '#1a1a1a'
        },
        keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}