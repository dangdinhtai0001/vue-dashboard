<template>
  <div>
    UserProfile
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "UserProfile",

  data: () => ({}),

  computed: {
    ...mapState(["auth"])
  }
};
</script>
