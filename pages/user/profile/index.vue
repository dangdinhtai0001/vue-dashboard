<template>
  <v-container fluid class="background" :style="backgroundStyles">
    <v-row align="center" justify="center" class="pa-5 mx-auto">
      <!-- -------------- main column -------------- -->
      <v-col cols="7">
        <v-card outlined height="60vh" class="ml-7 mx-auto"> </v-card>
      </v-col>
      <!-- -------------- main column -------------- -->
      <v-col cols="4">
        <div>
          <v-img
            :src="auth.user.avatar"
            height="80vh"
            class="rounded-3xl avatar"
          ></v-img>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "UserProfile",

  data: () => ({
  }),

  computed: {
    ...mapState(["auth"]),
    backgroundStyles() {
      return { "--background-image": "url(" + this.auth.user.avatar + ")"};
    }
  }
};
</script>

<style scoped>
.avatar {
  position: relative;
  left: -30px;
}
.background {
  /* background-image: url("https://source.unsplash.com/random/1600x900"); */
  /* background-image: url("https://source.unsplash.com/MP0IUfwrn0A"); */
  background-image: var(--background-image);

  /* Full height */
  height: 100vh;
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
