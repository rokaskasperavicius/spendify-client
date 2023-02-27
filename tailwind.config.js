/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#163b23',
        secondary: '#f9f871',
        error: '#FF9900', //'#B38A58',
      },
    },
  },
  plugins: [],
}
