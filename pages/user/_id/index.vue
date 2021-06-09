<template>
  <v-container fluid class="background" :style="backgroundStyles">
    <v-row align="center" justify="center" class="pa-5 mx-auto">
      <!-- -------------- main column -------------- -->
      <v-col cols="7">
        <!-- ================================== -->
        <v-card
          outlined
          height="60vh"
          class="px-3 pl-7 py-1 mx-auto opacity-90"
        >
          <v-card-title class="mt-7">
            <p class="text-4xl font-normal text-capitalize">
              {{ profile.name }}
            </p>
            <div class="w-4/5 pt-3 border-b-2 border-500 opacity-25"></div>
          </v-card-title>

          <v-card-text> {{ profile }} </v-card-text>

          <v-card-actions class="pl-0">
            <v-spacer></v-spacer>
            <v-btn icon fab small> <v-icon large>mdi-facebook</v-icon> </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon fab small> <v-icon large>mdi-twitter</v-icon> </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon fab small> <v-icon large>mdi-github</v-icon> </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon fab small> <v-icon large>mdi-instagram</v-icon> </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon fab small> <v-icon large>mdi-gmail</v-icon> </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon fab small> <v-icon large>mdi-pinterest</v-icon> </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
        <!-- ================================== -->
      </v-col>
      <!-- -------------- main column -------------- -->
      <v-col cols="4">
        <v-img
          :src="auth.user.avatar"
          height="80vh"
          class="rounded-3xl avatar shadow-md border-4"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "UserProfile",

  data: () => ({
    profile: { name: "" },
  }),

  computed: {
    ...mapState(["auth"]),
    backgroundStyles() {
      return { "--background-image": "url(" + this.profile.avatar + ")" };
    },
  },

  async beforeMount() {
    await this.fetchUserData();
  },

  methods: {
    async fetchUserData() {
      let url = "/user?id=" + this.auth.user.id;
      const userData = await this.$axios.$get(url);

      this.profile = { ...userData, ...this.auth.user };
    },
  },
};
</script>

<style scoped>
.avatar-left {
  position: relative;
  right: -30px;
}

.avatar {
  position: relative;
  left: -40px;
}
.background {
  /* background-image: url("https://source.unsplash.com/random/1600x900"); */
  /* background-image: url("https://source.unsplash.com/MP0IUfwrn0A"); */
  background-image: var(--background-image);

  /* Full height */
  height: 95vh;
  width: 100vw;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  position: relative;
  z-index: 1;
}

.background:before {
  /* background-image: url("https://source.unsplash.com/MP0IUfwrn0A"); */
  background-image: var(--background-image);
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
</style>
