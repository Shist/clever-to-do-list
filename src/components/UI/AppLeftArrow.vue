<template>
  <button class="left-arrow"></button>
</template>

<script>
export default {
  name: "app-left-arrow",
};
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.left-arrow {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: none;
  background: transparent url("@/assets/icons/left-arrow.svg") no-repeat center /
    cover;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
  }
  &:disabled {
    transform: none;
    background-color: $color-light-gray;
    filter: grayscale(50%);
  }
}
</style>
