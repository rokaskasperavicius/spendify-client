export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-transparent': 'rgba(255, 253, 252, 1)',
        background: '#fffdfc',

        primary: '#163b23',
        'primary-focus': '#13321E',

        secondary: '#f9f871',
        'secondary-focus': '#EEED6D',

        error: '#FF9900',
        'error-red': '#CC0000',
      },

      fontFamily: {
        primary: ['Work Sans', 'sans-serif'],
        secondary: ['Crimson Text', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
