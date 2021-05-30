<template>
  <v-container class="fill-height background" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card width="60vw" class="mx-auto" elevation="12">
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
                    <v-form class="px-7" v-model="signInValid">
                      <v-text-field
                        label="Username"
                        prepend-inner-icon="mdi-account"
                        v-model="signInForm.username"
                        :error-messages="signInUsernameErrors"
                        @input="$v.signInForm.username.$touch()"
                        @blur="$v.signInForm.username.$touch()"
                      ></v-text-field>

                      <v-text-field
                        v-model="signInForm.password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        counter
                        prepend-inner-icon="mdi-key"
                        @click:append="showPassword = !showPassword"
                        :error-messages="signInPasswordErrors"
                        @input="$v.signInForm.password.$touch()"
                        @blur="$v.signInForm.password.$touch()"
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
                    <v-btn rounded outlined dark @click="switchForm()">
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
                    <v-btn rounded outlined @click="switchForm()"> SIGN IN </v-btn>
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
                    <v-form class="px-7" v-model="signUpValid">
                      <v-text-field
                        label="Username"
                        prepend-inner-icon="mdi-account"
                        v-model="signUpForm.username"
                        :error-messages="signUpUsernameErrors"
                        @input="$v.signUpForm.username.$touch()"
                        @blur="$v.signUpForm.username.$touch()"
                      ></v-text-field>

                      <v-text-field
                        v-model="signUpForm.password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        counter
                        prepend-inner-icon="mdi-key"
                        @click:append="showPassword = !showPassword"
                        :error-messages="signUpPasswordErrors"
                        @input="$v.signUpForm.password.$touch()"
                        @blur="$v.signUpForm.password.$touch()"
                      ></v-text-field>

                      <v-text-field
                        v-model="signUpForm.confirmPassword"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm password"
                        counter
                        prepend-inner-icon="mdi-key"
                        @click:append="showPassword = !showPassword"
                        :error-messages="signUpConfirmPasswordErrors"
                        @input="$v.signUpForm.confirmPassword.$touch()"
                        @blur="$v.signUpForm.confirmPassword.$touch()"
                      ></v-text-field>
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
import { required, sameAs } from "vuelidate/lib/validators";

export default {
  layout: "auth",

  mixins: [validationMixin],

  validations: {
    signInForm: {
      username: { required },
      password: { required },
    },
    signUpForm: {
      username: { required },
      password: { required },
      confirmPassword: { required, sameAsPassword: sameAs("password") },
    },
  },

  data: () => ({
    signInForm: { username: "", password: "" },
    signUpForm: { username: "", password: "", confirmPassword: "" },
    step: 1,
    signInValid: false,
    signUpValid: false,
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

    signInUsernameErrors() {
      const errors = [];
      if (!this.$v.signInForm.username.$dirty) return errors;
      !this.$v.signInForm.username.required &&
        errors.push("This field is required.");
      return errors;
    },

    signInPasswordErrors() {
      const errors = [];
      if (!this.$v.signInForm.password.$dirty) return errors;
      !this.$v.signInForm.password.required &&
        errors.push("This field is required.");
      return errors;
    },

    signUpUsernameErrors() {
      const errors = [];
      if (!this.$v.signUpForm.username.$dirty) return errors;
      !this.$v.signUpForm.username.required &&
        errors.push("This field is required.");
      return errors;
    },

    signUpPasswordErrors() {
      const errors = [];
      if (!this.$v.signUpForm.password.$dirty) return errors;
      !this.$v.signUpForm.password.required &&
        errors.push("This field is required.");
      return errors;
    },

    signUpConfirmPasswordErrors() {
      const errors = [];
      if (!this.$v.signUpForm.confirmPassword.$dirty) return errors;

      !this.$v.signUpForm.confirmPassword.required &&
        errors.push("This field is required.");
      !this.$v.signUpForm.confirmPassword.sameAsPassword &&
        errors.push("The password entered does not match.");
      return errors;
    },
  },

  methods: {
    async signIn() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.signInForm,
        });
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    },

    signUp() {
      this.$toast("I'm a toast!");
    },

    switchForm() {
      if (this.step === 1) {
        this.step = 2;
      } else {
        this.step = 1;
      }

      this.$v.$reset();
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