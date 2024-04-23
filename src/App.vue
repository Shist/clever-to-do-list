<template>
  <div class="global-container">
    <router-view />
    <info-snackbar />
  </div>
</template>

<script>
import InfoSnackbar from "@/components/InfoSnackbar";

export default {
  name: "app",
  components: { InfoSnackbar },
};
</script>

<style lang="scss">
@import "@/styles/global";
</style>
