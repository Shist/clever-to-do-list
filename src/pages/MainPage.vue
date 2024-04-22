<template>
  <div class="main-page">
    <div class="main-page__headline-burger-btn-wrapper">
      <h1 class="main-page__headline">Tasks</h1>
      <burger-menu />
    </div>
    <dates-list class="main-page__dates-list" />
    <h2 class="main-page__tasks-list-headline">3 tasks for 22.04.2024 (Mon)</h2>
    <tasks-list class="main-page__tasks-list" />
    <app-button class="main-page__btn-add-task">+ Create new task</app-button>
  </div>
</template>

<script>
import BurgerMenu from "@/components/BurgerMenu";
import DatesList from "@/components/DatesList";
import TasksList from "@/components/TasksList";

export default {
  name: "main-page",
  components: { BurgerMenu, DatesList, TasksList },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.main-page {
  flex-grow: 1;
  @extend %default-wrapper;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  &__headline-burger-btn-wrapper {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .main-page__headline {
      @include default-headline(36px, 36px, $color-black);
    }
  }
  &__dates-list {
    margin-bottom: 40px;
  }
  &__tasks-list-headline {
    margin-bottom: 30px;
    @include default-headline(24px, 24px, $color-black);
  }
  &__tasks-list {
    margin-bottom: 30px;
    max-height: 260px;
  }
  &__btn-add-task {
    margin-top: auto;
    align-self: center;
  }
}
</style>
