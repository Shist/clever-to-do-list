<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "app-button",
};
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.btn {
  @include default-btn(300px, $color-white, $color-orange);
}
</style>
