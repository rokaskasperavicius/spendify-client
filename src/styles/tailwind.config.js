/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-transparent': 'rgba(255, 253, 252, 1)',
        background: '#fffdfc',

        primary: '#163b23',
        // primary: '#004c4c',
        'primary-focus': '#13321E',

        secondary: '#f9f871',
        // secondary: '#FFFEB7',
        // secondary: 'white',

        'secondary-focus': '#EEED6D',

        error: '#FF9900',
        // error: '#fb3b3b',
        'error-red': '#CC0000',
      },

      fontFamily: {
        primary: ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
