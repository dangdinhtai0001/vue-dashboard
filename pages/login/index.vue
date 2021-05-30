<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card>
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="8">
                  <v-card-text class="mt-7">
                    <h1 class="text-center mb-3">Sign in to</h1>

                    <div class="text-center mt-3">
                      <v-btn
                        v-for="item in social"
                        :key="item.name"
                        class="mx-2"
                        fab
                        outlined
                        small
                      >
                        <v-icon> {{ item.icon }} </v-icon>
                      </v-btn>
                    </div>

                    <h4 class="text-center mt-3">
                      Ensure your username for registration
                    </h4>

                    <v-form>
                      <v-text-field
                        v-model="loginForm.username"
                        label="Username"
                      >
                      </v-text-field>
                      <v-text-field
                        v-model="loginForm.password"
                        label="Password"
                      >
                      </v-text-field>
                    </v-form>

                    <h3 class="text-center mt-3">Forget your password?</h3>
                  </v-card-text>

                  <div class="text-center mt-3 mb-3 tex-uppercase">
                    <v-btn rounded outlined dark @click="signIn">
                      sign in
                    </v-btn>
                  </div>
                </v-col>

                <v-col cols="4" class="primary">
                  <v-card-text class="white--text mt-7">
                    <h1 class="text-center display-3">Hello, Friends !</h1>
                    <h5 class="text-center">
                      Enter your personnal details and start journay with us
                    </h5>
                  </v-card-text>

                  <div class="text-center mt-3 mb-3">
                    <v-btn rounded outlined dark @click="step++">
                      SIGN UP
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col cols="4" class="primary">
                  <v-card-text class="white--text mt-7">
                    <h1 class="text-center display-3">Welcome back !</h1>
                    <h5 class="text-center">
                      To keep connected with us please login with your personnal
                      info
                    </h5>
                  </v-card-text>

                  <div class="text-center mt-3 mb-3">
                    <v-btn rounded outlined dark @click="step--">
                      SIGN IN
                    </v-btn>
                  </div>
                </v-col>

                <v-col cols="8">
                  <v-card-text class="mt-7">
                    <h1 class="text-center mb-3">Create account</h1>

                    <div class="text-center mt-3">
                      <v-btn
                        v-for="item in social"
                        :key="item.name"
                        class="mx-2"
                        fab
                        outlined
                        small
                      >
                        <v-icon> {{ item.icon }} </v-icon>
                      </v-btn>
                    </div>

                    <h4 class="text-center mt-3">
                      Ensure your username for registration
                    </h4>

                    <v-form>
                      <v-text-field
                        v-model="loginForm.username"
                        label="Username"
                      >
                      </v-text-field>
                      <v-text-field
                        v-model="loginForm.password"
                        label="Password"
                      >
                      </v-text-field>
                    </v-form>
                  </v-card-text>

                  <div class="text-center mt-3 mb-3 text-uppercase">
                    <v-btn rounded outlined dark @click="signUp">
                      Sign up
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "auth",
  data: () => ({
    loginForm: { username: "", password: "" },
    step: 1,
  }),

  computed: {
    social() {
      return [
        { name: "facebook", icon: "mdi-facebook" },
        { name: "google", icon: "mdi-google-plus" },
        { name: "github", icon: "mdi-github" },
        { name: "discord", icon: "mdi-discord" },
      ];
    },
  },

  methods: {
    async signIn() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.loginForm,
        });
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    },

    signUp() {},
  },
};
</script>