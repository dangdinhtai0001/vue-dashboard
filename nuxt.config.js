import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - vue-dashboard",
    title: "vue-dashboard",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Customize the progress-bar color
  loading: { color: "#fff" },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vuelidate.js", mode: "client" },
    { src: "~/plugins/vue-toastification.js", mode: "client" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    // https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    // https://github.com/nuxt-community/router-module
    "@nuxtjs/router"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://auth.nuxtjs.org/guide/setup/
    "@nuxtjs/auth"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL || " http://localhost:8000/api/v0",
    debug: process.env.DEBUG || false,
    proxyHeaders: false,
    credentials: false
  },

  // Auth-next module configuration: https://auth.nuxtjs.org/api/options
  auth: {
    redirect: {
      login: "/login", // User will be redirected to this path if login is required.
      logout: "/login", // User will be redirected to this path if after logout, current route is protected.
      callback: false, //  User will be redirected to this path by the identity provider after login. (Should match configured Allowed Callback URLs (or similar setting) in your app/client with the identity provider)
      home: "/" // User will be redirected to this path after login. (rewriteRedirects will rewrite this path)
    },
    // https://auth.nuxtjs.org/schemes/local
    strategies: {
      customStrategy: {
        _scheme: "~/schemes/CustomScheme",
        token: {
          property: "token.accessToken",
          required: true,
          maxAge: 15
        },
        user: {
          property: "user",
          autoFetch: true,
          scope: "scope"
        },
        refreshToken: {
          property: "token.refreshToken",
          data: "refreshToken",
          maxAge: false
        },
        endpoints: {
          login: { url: "/auth/login", method: "post" },
          refresh: { url: "/auth/refresh", method: "post" },
          logout: { url: "/auth/logout", method: "post" },
          user: { url: "/auth/profile", method: "get" }
        }
      }
    }
  },

  // https://auth.nuxtjs.org/guide/middleware
  router: {
    middleware: ["auth"]
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShaking: true,
    treeShake: true,
    customVariables: [
      "~/assets/variables.scss",
      "~/assets/custom-toastification.scss"
    ],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: "#1976D2",
          secondary: "#424242",
          accent: "#82B1FF",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107"
        }
      }
    }
  },

  // https://github.com/nuxt-community/router-module
  routerModule: {
    /* module options */
    path: "srcDir/router",
    fileName: "router.js",
    keepDefaultRouter: false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
