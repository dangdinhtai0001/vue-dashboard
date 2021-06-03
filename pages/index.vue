<template>
  <div>
    <p>{{ this.$auth.user }}</p>
    <p>{{ this.$auth.loggedIn }}</p>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(this.$auth.$storage._state);
    // console.log(this.$auth.$storage);

    console.log(this.$auth.hasScope('user'));
    console.log(this.$auth.scope);
  },
};
</script>