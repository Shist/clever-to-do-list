<template>
  <div class="task-by-id-page">
    <h1 class="task-by-id-page__headline">Task by ID page</h1>
  </div>
</template>

<script>
export default {
  name: "task-by-id-page",
};
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.task-by-id-page {
  display: flex;
  flex-direction: column;
  &__headline {
    @include default-headline(36px, 36px, $color-black);
  }
}
</style>
