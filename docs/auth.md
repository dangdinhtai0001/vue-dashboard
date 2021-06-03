# Cài đặt 
 - axios 
 - nuxt/auth

```
    yarn add @nuxtjs/axios @nuxtjs/auth
```

project này sử dụng nuxt/auth ver 4.9.1

Khai báo tại object modules trên file **nuxt.config.js**

```javascript
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/guide/setup/
    '@nuxtjs/auth'
  ],
  auth: {
    // Options
  }
```
Lưu ý, khi sử dụng module nuxt/auth thì cần phải chắc chắn rằng vuex đã được enable. Cách enable vuex tại [đây](https://nuxtjs.org/docs/2.x/directory-structure/store#activate-the-store). Hoặc đơn giản nhất là tạo 1 dile index.js trong folder **store**

# Middleware
Bạn có thể enable auth middleware cho tất cả (global) hoặc cho mỗi route. Khi auth middleware được enable trên một route và `loggedIn` là `false`, nó sẽ được redirect đến `redirect.login`. (mặc định sẽ là `/login`)

Cấu hình cho mỗi route:
```javascript
export default {
  middleware: 'auth'
}
```

Globally setting in nuxt.config.js:
```javascript
router: {
  middleware: ['auth']
}
```

Ta có thể set auth option cho guest tại mỗi component cụ thể. Khi auth middleware được enable trên một route và `loggedIn` là true, user sẽ được chuyển hướng đến route `redirect.home`. (mặc định là `/`)

```
export default {
  auth: 'guest'
}
```

# Schemes

Scheme là nơi định nghĩa các logic dùng khi xác thực người dùng. Mỗi một strategy là một instance được cấu hình của scheme. Ta có thể có nhiều scheme và strategy trong cùng một project.

`auth.strategies` option là một object. Các key là strategy name và các value là các cấu hình.

`nuxt.config.js`
```javascript
auth: {
  strategies: {
    local: { /* ... */ },
    github: { /* ... */ },
  }
}
```

Chi tiết các option tại [đây](https://auth.nuxtjs.org/api/options)

Theo mặc định, tên instance giống với tên scheme. Nếu muốn linh hoạt hơn bằng cách sử dụng custom scheme của riêng mình hoặc có nhiều trường hợp có nhiều instance của cùng một scheme, ta có thể sử dụng scheme property:

`nuxt.config.js`
```javascript
auth: {
  strategies: {
    local1: { scheme: 'local', /* ... */ },
    local2: { scheme: 'local', /* ... */ },
    custom: { scheme: '~/schemes/customStrategy', /* ... */ },
  }
}
```

# Custom scheme

Trong project này không sử dụng scheme mặc định mà sử dụng một custom scheme. Nó được cấu hình tại file `nuxt.config.js` như sau:

```javascript
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
```
Credentials/token based scheme for flows like `JWT`

Trong đó:
  - **strategies**: Nơi khai báo scheme xử lí logic cho việc xác thực user. 
  - **customStrategy**: Tên scheme. Mặc định bao gồm: Local, RefreshLocal,... Đối với custom scheme thì có thể đặt tùy ý
  - **_scheme**: Áp dụng khi dùng custom scheme. Đường dãn đến file js định nghĩa class thực thi của scheme. Nó có thể đặt ở bất kì đâu, Ví dụ như hiện tại là ở file **CustomScheme.js** tại thư mục **scheme**
  - **token**: Nơi cấu hình cho token options:
    - `property`: Nơi chỉ định trường nào của response json được trả về từ `endpoints.login` sẽ là giá trọ của token
    - `required`: Mặc định là `true`. Đặt là `false` nếu không muốn sử dụng xác thực bằng token.
    - `name`: Mặc định là `Authorization`. Authorization header name dùng trong axios request
    - `type`: Mặc định là `Bearer`
    - `maxAge`: Mặc định là `1800. Expiration time của token, tính bằng giây.
  - **user**: Nơi cáu hình cho user option
    - `property`:
    - `autoFetch`:
    - `scope`:
  - **refreshToken**: Nơi cấu hình cho refresh token:
    - `property`:
    - `data`:
    - `max-age`:
  - **endpoint**: Nơi cấu hình các endpoint dùng cho các  quy trình xác thực người dùng
    - **login**:
    - **logout**:
    - **refresh**:
    - **user**:

# Usages

Sau khi cấu hình thành công ta có thể sử dụng như sau:

Đăng nhập

``` javascript
this.$auth.loginWith('customStrategy', { /* ... */ })
```

Hàm `async login(endpoint) ` của `schemes\CustomeScheme.js` sẽ xử lí quá trình login này

Lấy ra thông tin về token:

```javascript
this.$auth.$storage._state
```

Thông tin về user
```javascript
this.$auth.user
```

Trạng thái đăng nhập
```javascript
this.$auth.loggedIn
```

Kiểm tra xem current user có quyền xác định nào đó (Ví dụ như `user` hay không)
```javascript
this.$auth.hasScope('user')
```

Muốn sử dụng chức năng này thì hoặc api `endpoint.user` phải trả về 1 trường là scope. Nếu như có tên khác thì sửa lại hàm `async fetchUser(endpoint)` trong file `schemes\CustomeScheme.js`.

```javascript
  async fetchUser(endpoint) {
    // Token is required but not available
    if (this.options.tokenRequired && !this.$auth.getToken(this.name)) {
      return;
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({});
      return;
    }

    // Try to fetch user and then set
    const user = await this.$auth.requestWith(
      this.name,
      endpoint,
      this.options.endpoints.user
    );

    // thực hiện map các thông tin từ user vừa lấy được từ api về.
    // phải có property: scope
    // ....
    // const customUser = .....
    // this.$auth.setUser(user);

    this.$auth.setUser(user);
  }
```