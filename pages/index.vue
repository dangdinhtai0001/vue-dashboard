<template>
  <div>
    <p> {{this.$auth.user}} </p>
    <p> {{this.$auth.loggedIn}} </p>
    <p> {{this.$auth.$state}} </p>
  </div>
</template>

<script>
export default {

}
</script>