<template>
  <div>
    <h1>Добро пожаловать на главную страницу</h1>
    <h2 class="test description">Да начнётся разработка проекта</h2>
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
