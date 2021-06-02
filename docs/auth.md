## Các module cần thiết:
 - axios 
 - nuxt/auth

```
    yarn add @nuxtjs/axios @nuxtjs/auth
```

project này sử dụng nuxt/auth ver 4.9.1

## Cấu hình 2 module vừa cài đặt tại **nuxt.config.js**

 - Khai báo module

```javascript
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/guide/setup/
    '@nuxtjs/auth'
  ],
```

 - Cấu hình module axios

```javascript
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL || ' http://localhost:8000/api/v0',
    debug: process.env.DEBUG || false,
    proxyHeaders: false,
    credentials: false,
  },
```

 - Cấu hình module @nuxtjs/auth

```javascript
 // Auth-next module configuration: https://auth.nuxtjs.org/api/options
  auth: {
    redirect: {
      login: '/login', // User will be redirected to this path if login is required.
      logout: '/login', // User will be redirected to this path if after logout, current route is protected.
      callback: false, //  User will be redirected to this path by the identity provider after login. (Should match configured Allowed Callback URLs (or similar setting) in your app/client with the identity provider)
      home: '/' // User will be redirected to this path after login. (rewriteRedirects will rewrite this path)
    },
    // https://auth.nuxtjs.org/schemes/local
    strategies: {
      customStrategy: {
        _scheme: '~/schemes/CustomScheme',
        token: {
          property: 'token.accessToken',
          maxAge: 15
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        refreshToken: {
          property: 'token.refreshToken',
          data: 'refreshToken',
          maxAge: false
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          refresh: { url: '/auth/refresh', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/profile', method: 'get' }
        }
      },
    }
  },
```

Đối với module nuxt/auth thì cần cấu hình thêm 1 middleware

```javascript
  // https://auth.nuxtjs.org/guide/middleware
  router: {
    middleware: ['auth']
  },
```

## Mô tả chi tiết cấu hình module nuxt/auth

Module nuxt/auth cung cấp các scheme mặc định với khá đầy đủ các chức năng cần thiết. Tuy nhiên, khi các thiết lập mặc định không đủ để giải quyết bài toán hiện tại, ta có thể tự cấu hình 1 scheme riêng. Như đoạn cấu hình trên ta có khai báo 1 custom scheme.

```
    strategies: {
      customStrategy: {
        _scheme: '~/schemes/CustomScheme',
    ....
```

 - **strategies**: Nơi khai báo scheme thực thi. 
 - **customStrategy**: Tên scheme. Mặc định bao gồm: Local, RefreshLocal,... Đối với custom scheme thì có thể đặt tùy ý
 - **_scheme** : Áp dụng khi dùng custom scheme. Đường dãn đến file js định nghĩa class thực thi của scheme. Nó có thể đặt ở bất kì đâu, Ví dụ nhu hiện tại là ở  thư mục scheme

 ## Custom scheme class

Hàm khi thực hiện fetch user

``` javascript
  async fetchUser(endpoint) {
    // Token is required but not available
    if (this.options.tokenRequired && !this.$auth.getToken(this.name)) {
      return
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }

    // Try to fetch user and then set
    const user = await this.$auth.requestWith(
      this.name,
      endpoint,
      this.options.endpoints.user
    );

    // Transform the user object
    const customUser = {
      ...user,
      scope: user.role
    };

    delete customUser.role;


    this.$auth.setUser(customUser)
  }
```
    - Tong


Hàm khi thực hiện đăng nhập

``` javascript
  async login(endpoint) {
    if (!this.options.endpoints.login) {
      return
    }

    // Ditch any leftover local tokens before attempting to log in
    await this.$auth.reset()

    const { response, result } = await this.$auth.request(
      endpoint,
      this.options.endpoints.login,
      true
    )

    if (this.options.tokenRequired) {
      const token = this.options.tokenType
        ? this.options.tokenType + ' ' + result.accessToken
        : result.accessToken

      this.$auth.setToken(this.name, token)
      this._setToken(token)
    }


    if (this.options.autoFetchUser) {
      await this.fetchUser()
    }

    return response
  }
```
