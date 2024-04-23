<template>
  <div class="sign-up-page">
    <h1 class="sign-up-page__headline">Sign Up</h1>
  </div>
</template>

<script>
export default {
  name: "sign-up-page",
};
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.sign-up-page {
  display: flex;
  flex-direction: column;
  &__headline {
    @include default-headline(36px, 36px, $color-black);
  }
}
</style>
