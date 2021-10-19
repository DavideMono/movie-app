export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Movie Browser',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/fontawesome',
    '@nuxtjs/i18n'
  ],

  fontawesome: {
    icons: {
      solid: ['faClock', 'faHistory', 'faMoneyBill', 'faArrowLeft', 'faArrowRight']
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['lodash-es']
  },

  i18n: {
    // locales: ['en', 'it'],
    locales: ['en'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          searchPlaceholder: 'Search by movie title',
          popular: 'Popular',
          playing: 'Now playing',
          rated: 'Top rated',
          upcoming: 'Upcoming',
          genres: 'Genres: {genres}',
          releaseDate: 'Release Date: {date}',
          duration: 'Duration: {duration}',
          budget: 'Budget: {budget}',
          cast: 'Cast',
          gallery: 'Gallery',
          recommendations: 'If you like {title}, you will appreciate:',
          resultFor: 'Results for: {search}'
        }
        // it: {
        //   searchPlaceholder: 'Cerca per titolo'
        // }
      }
    }
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/:category',
        name: 'home-category',
        component: resolve(__dirname, 'pages/index.vue')
      })
    }
  }
}
