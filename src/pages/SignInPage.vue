<template>
  <div class="sign-in-page">
    <h1 class="sign-in-page__headline">Sign In</h1>
  </div>
</template>

<script>
export default {
  name: "sign-in-page",
};
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.sign-in-page {
  display: flex;
  flex-direction: column;
  &__headline {
    @include default-headline(36px, 36px, $color-black);
  }
}
</style>
