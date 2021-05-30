<template>
  <v-container class="fill-height background" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card width="50vw" class="mx-auto" elevation="12">
          <!-- ******************************************* SIGN IN ******************************************* -->
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="7">
                  <v-card-text class="mt-7">
                    <h1 class="text-center mb-7 text-capitalize">
                      Sign in to {{ appName }}
                    </h1>

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

                    <p class="text-center mt-3 headline">
                      Ensure your username/ password for sign in
                    </p>
                    <!-- ************************ SIGN IN FORM ************************ -->
                    <v-form class="px-7" v-model="signValid">
                      <v-text-field
                        label="Username"
                        prepend-inner-icon="mdi-account"
                        v-model="loginForm.username"
                        :error-messages="usernameErrors"
                        @input="$v.loginForm.username.$touch()"
                        @blur="$v.loginForm.username.$touch()"
                      ></v-text-field>

                      <v-text-field
                        v-model="loginForm.password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        counter
                        prepend-inner-icon="mdi-key"
                        @click:append="showPassword = !showPassword"
                        :error-messages="passwordErrors"
                        @input="$v.loginForm.password.$touch()"
                        @blur="$v.loginForm.password.$touch()"
                      ></v-text-field>
                    </v-form>
                    <!-- ************************ SIGN IN FORM ************************ -->
                  </v-card-text>

                  <div class="text-center mt-3 mb-3 tex-uppercase">
                    <v-btn rounded outlined @click="signIn"> sign in </v-btn>
                  </div>
                  <p class="text-center mt-3 headline">Forget your password?</p>
                </v-col>

                <v-col cols="5" class="primary">
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
            <!-- ******************************************* SIGN IN ******************************************* -->
            <!-- ******************************************* SIGN UP ******************************************* -->

            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col cols="5" class="primary">
                  <v-card-text class="white--text mt-7">
                    <h1 class="text-center display-3">Welcome back !</h1>
                    <h5 class="text-center">
                      To keep connected with us please login with your personnal
                      info
                    </h5>
                  </v-card-text>

                  <div class="text-center mt-3 mb-3">
                    <v-btn rounded outlined @click="step--"> SIGN IN </v-btn>
                  </div>
                </v-col>

                <v-col cols="7">
                  <v-card-text class="mt-7">
                    <h1 class="text-center mb-7">Create account</h1>

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

                    <p class="text-center mt-3 headline">
                      Ensure your username for registration
                    </p>
                    <!-- ************************ SIGN UP FORM ************************ -->
                    <v-form class="px-7">
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
                    <!-- ************************ SIGN UP FORM ************************ -->
                  </v-card-text>

                  <div class="text-center mt-3 mb-3 text-uppercase">
                    <v-btn rounded outlined @click="signUp"> Sign up </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <!-- ******************************************* SIGN UP ******************************************* -->
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  layout: "auth",

  mixins: [validationMixin],

  validations: {
    loginForm: {
      username: { required },
      password: { required },
    },
  },

  data: () => ({
    loginForm: { username: "", password: "" },
    step: 1,
    signValid: false,
    showPassword: false,
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

    appName() {
      return process.env.VUE_APP_TITLE;
    },

    usernameErrors() {
      const errors = [];
      if (!this.$v.loginForm.username.$dirty) return errors;
      !this.$v.loginForm.username.required &&
        errors.push("Phải nhập thông tin cho trường này.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.loginForm.password.$dirty) return errors;
      !this.$v.loginForm.password.required &&
        errors.push("Phải nhập thông tin cho trường này.");
      return errors;
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

    signUp() {
      console.log(process.env.VUE_APP_TITLE);
    },
  },
};
</script>

<style scoped>
.background:before {
  background-image: url(~assets/auth_background.jpg);
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

.background:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: brightness(1.25) blur(5px);
}

.background > * {
  position: relative;
  z-index: 1;
}
</style>