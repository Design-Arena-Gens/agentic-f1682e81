/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#dcebff',
          200: '#b7d7ff',
          300: '#8bbfff',
          400: '#5ca3ff',
          500: '#2d86ff',
          600: '#1a6bdb',
          700: '#1556ad',
          800: '#124887',
          900: '#113e70'
        }
      }
    }
  },
  plugins: []
};

