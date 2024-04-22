<template>
  <div class="main-page">
    <div class="main-page__headline-burger-btn-wrapper">
      <h1 class="main-page__headline">Tasker</h1>
      <burger-menu />
    </div>
    <dates-list />
    <!-- <app-button>+ Create new task</app-button> -->
  </div>
</template>

<script>
import BurgerMenu from "@/components/BurgerMenu";
import DatesList from "@/components/DatesList";

export default {
  components: { BurgerMenu, DatesList },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.main-page {
  flex-grow: 1;
  @extend %default-wrapper;
  &__headline-burger-btn-wrapper {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .main-page__headline {
      @include default-headline(36px, 36px, $color-black);
    }
  }
}
</style>
