module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx,sass}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      padding: ['first', 'last'],
      margin: ['first', 'last'],

    }
  },
  plugins: [
  ]
}
