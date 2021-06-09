<template></template>

<script>
export default {
  layout: "default",
  middleware({ store, redirect }) {
    let path = "/user/" + store.$auth.$state.user.id;
    return redirect(path);
  },
};
</script>