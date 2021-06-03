<template>
  <div>
    User setting
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "UserSettings",

  data: () => ({}),

  computed: {
    ...mapState(["auth"])
  }
};
</script>
