<template>
  <button class="burger-btn"></button>
</template>

<script>
export default {
  name: "burger-menu",
};
</script>

<style scoped lang="scss">
@import "@/styles/global";

.burger-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent url("@/assets/icons/burger-btn.svg") no-repeat center /
    cover;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
