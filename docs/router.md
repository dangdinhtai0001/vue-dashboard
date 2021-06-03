# Tạo mới một route

Nuxtjs cũng sử dụng `vue-router` để routing. Tuy nhiên, không giống như khi làm việc với vuejs bình thường, ta sẽ phải tự cấu hình bằng file. Nuxtjs sẽ tự động cấu hình vue-router dựa theo cấu trúc folder `pages`. Với mỗi `.vue` file tạo ra trong folder `pages` sẽ được nuxtjs cấu hình tahfnh một route. Nó là  `File System Routing`, chi tiết tại [đây](https://nuxtjs.org/docs/2.x/features/file-system-routing).

Tuy nhiên, vẫn có nhiều cách để extend nuxt router
 - [router-extras-module](https://github.com/nuxt-community/router-extras-module): to customize the route parameters in the page
 - Component [@nuxtjs/router](https://github.com/nuxt-community/router-module) to overwrite the Nuxt router and write your own router.js file
 - Use the [router.extendRoutes](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-router#extendroutes) property in your nuxt.config.js

Đối với project này, để đồng nhất ta sẽ tuân theo quy tắc tạo mới thư mục trong `pages` như sau:
```
pages/
--| user/
-----| profile
-------| index.vue
-----| settings
-------| index.vue
-----| index.vue
--| index.vue
```

Với cây thư mục trên ta sẽ có các route sau:
 - `/user/profile`
 - `/user/settings`
 - `/user`
 - `/`

# Redirect 

Hiện tại ta có các route như sau:
 - /user/profile
 - /user/settings

Vậy nếu như muốn route `/user` sẽ redirect đến 1 trong 2 route trên ta thực hiện như sau:

- Tại folder `user`, tạo file index.vue với nội dung như sau:

```vue
<template></template>

<script>
export default {
  layout: "default",
  middleware({ store, redirect }) {
    return redirect("/user/profile");
  },
};
</script>
```

- Trong template không cần phải thêm gì hết. Trong phần script, tạo một `Anonymous middleware` để redirect đến đường dẫn chỉ định. Chi tiết về `Anonymous middleware` tại [đây](https://nuxtjs.org/docs/2.x/components-glossary/pages-middleware)