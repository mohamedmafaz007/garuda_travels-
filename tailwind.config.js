/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f5f6f9',
          100: '#e8ebf0',
          200: '#d2d7e0',
          300: '#a1abb9',
          400: '#717c91',
          500: '#4b5568',
          600: '#2e3646',
          700: '#1d222e',
          800: '#14171f',
          900: '#0c0e12',
          950: '#060709',
        },
        gold: {
          50: '#fdfbf2',
          100: '#f9f3dc',
          200: '#f3e2a8',
          300: '#eccb68',
          400: '#e2b538',
          500: '#cfa022',
          600: '#a87e12',
          700: '#805e09',
          800: '#5a4004',
          900: '#382701',
        },
        ivory: '#fcfbf8',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
