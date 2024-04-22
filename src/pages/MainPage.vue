<template>
  <div class="main-page">
    <div class="main-page__headline-burger-btn-wrapper">
      <h1 class="main-page__headline">Tasker</h1>
      <burger-menu></burger-menu>
    </div>
    <app-button>+ Create new task</app-button>
  </div>
</template>

<script>
import BurgerMenu from "@/components/BurgerMenu";

export default {
  components: { BurgerMenu },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.main-page {
  flex-grow: 1;
  @extend %default-wrapper;
  &__headline-burger-btn-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .main-page__headline {
      @include default-headline(36px, 36px, $color-black);
    }
  }
}
</style>
