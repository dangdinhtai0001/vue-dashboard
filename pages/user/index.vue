<template></template>

<script>
export default {
  layout: "default",
  middleware({ store, redirect }) {
    return redirect("/user/profile");
  },
};
</script>