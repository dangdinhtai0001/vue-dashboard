# Default
Mặc định nuxtjs sẽ hỗ trợ routing thông qua việc sắp xếp các file trong folder pages, chi tiết xem tại [đây](https://nuxtjs.org/docs/2.x/features/file-system-routing).

Tuy nhiên, vẫn có nhiều cách để extend nuxt router
 - [router-extras-module](https://github.com/nuxt-community/router-extras-module): to customize the route parameters in the page
 - [@nuxtjs/router](https://github.com/nuxt-community/router-module): to overwrite the Nuxt router and write your own router.js file
 - [router.extendRoutes](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-router#extendroutes): property in your nuxt.config.js