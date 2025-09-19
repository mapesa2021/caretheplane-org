/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'eco-green': '#10B981',
        'eco-dark': '#059669',
        'eco-light': '#34D399',
        'eco-pale': '#D1FAE5',
      },
    },
  },
  plugins: [],
} 