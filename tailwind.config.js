module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        fade: {
          from: { opacity: 0.4 },
          to: { opacity: 1 }
        }
      },
      animation: {
        fade: 'fade 1.5s'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
