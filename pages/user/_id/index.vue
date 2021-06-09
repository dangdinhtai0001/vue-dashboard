<template>
  <v-container fluid class="background" :style="backgroundStyles">
    <v-row align="center" justify="center" class="pa-5 mx-auto">
      <!-- -------------- main column -------------- -->
      <v-col cols="7">
        <!-- ================================== -->
        <v-card outlined height="60vh" class="px-3 py-1 mx-auto">
          <v-card-title>
            <h1 class="text-3xl">Account information</h1>
            <div
              class="mx-auto w-4/5 pt-3 border-b-2 border-500 opacity-25"
            ></div>
          </v-card-title>
          <v-btn outlined small dark @click="switchWindow()"> Next </v-btn>
        </v-card>
        <!-- ================================== -->
      </v-col>
      <!-- -------------- main column -------------- -->
      <v-col cols="4">
        <v-img
          :src="auth.user.avatar"
          height="80vh"
          class="rounded-3xl avatar"
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
    window: 1,
  }),

  computed: {
    ...mapState(["auth"]),
    backgroundStyles() {
      return { "--background-image": "url(" + this.auth.user.avatar + ")" };
    },
  },

  methods: {
    switchWindow() {
      if (this.window === 1) {
        this.window = 2;
      } else {
        this.window = 1;
      }
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
  left: -35px;
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
