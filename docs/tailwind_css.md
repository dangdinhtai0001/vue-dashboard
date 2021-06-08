# Tailwind, vuetify, nuxtjs

Cài đặt [tailwind](https://tailwindcss.com/) (version 2) kết hợp với vuetify cho ứng dụng. Xem chi tiết cài đặt tailwind tại [đây](https://tailwindcss.nuxtjs.org/), ví dụ mẫu tại [đây](https://github.com/lobo-tuerto/nuxt-vuetify-tailwindcss).

## Cài đặt

1. Điều kiện

- Nuxtjs version >= v2.15.3.

Nâng cấp nuxtjs version bằng

```shell
yarn upgrade nuxt
```

2. Cài đặt

- Add @nuxtjs/tailwindcss and postcss dependencies to your project:

```
yarn add --dev @nuxtjs/tailwindcss postcss@latest
```

- Add it to your buildModules section in your `nuxt.config.js`

```javascript
   export default {
   buildModules: ['@nuxtjs/tailwindcss']
   },

   // https://tailwindcss.nuxtjs.org/options
   tailwindcss: {
   cssPath: '~/assets/css/tailwind.css',
   configPath: 'tailwind.config.js',
   exposeConfig: false,
   config: {}
   },

 // Global CSS: https://go.nuxtjs.dev/config-css
 css: [
   '@/assets/tailwind.css'
 ],

```

- Create your `tailwind.config.js` running:

```
npx tailwindcss init
```

- `tailwind.config.js` content

```javascript
module.exports = {
  purge: [
    './{components,layouts,pages}/**/*.vue'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

## Kết quả

http://localhost:3000/_tailwind/
