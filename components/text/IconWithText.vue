<template>
  <div>
    <p>
      <v-icon class="mr-1"> {{ pIcon }} </v-icon>
      <span :class="pTextClass"> {{pText}} </span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["pIcon", "pText", "pTextClass"]
};
</script>
