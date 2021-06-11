<template>
  <v-container fluid class="background fill-height" :style="backgroundStyles">
    <v-row align="center" justify="center" class="pa-5 mx-auto">
      <!-- <v-col cols="3"></v-col> -->
      <!-- -------------- main column -------------- -->
      <v-col cols="5">
        <!-- ================================== -->
        <v-card
          outlined
          height="50vh"
          width="50vw"
          class="px-3 pl-7 py-1 mx-auto opacity-90"
        >
          <v-card-title class="mt-3">
            <p class="text-3xl font-bold text-capitalize">
              {{ profile.name }}
            </p>
            <div class="w-4/5 pt-1 border-b-2 border-500 opacity-25"></div>
          </v-card-title>
        </v-card>
        <!-- ================================== -->
      </v-col>
      <!-- -------------- main column -------------- -->
      <v-col cols="4">
        <v-img
          :src="auth.user.avatar"
          height="70vh"
          class="rounded-3xl avatar shadow-md border-4"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import IconWithText from "~/components/text/IconWithText.vue";
export default {
  name: "UserProfile",

  components: {
    IconWithText: () => import("~/components/text/IconWithText.vue"),
  },

  data: () => ({
    profile: { name: "" },
  }),

  computed: {
    ...mapState(["auth"]),
    backgroundStyles() {
      return { "--background-image": "url(" + this.profile.avatar + ")" };
    },

    computedScopeString() {
      return this.profile.scopes;
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
  /* height: 94vh;
  width: 100vw; */

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
