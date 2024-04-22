<template>
  <div>
    <h1>Tasker</h1>
    <h2 class="test description">Да начнётся разработка проекта</h2>
    <app-button>+ Create new task</app-button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.description {
  @include default-headline(24px, 24px, red);
}
</style>
