/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'vcr': ['VCR','sans-serif']
      },
      colors: {
        'ground': '#d0b115',
        'rock': '#a8924a',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
