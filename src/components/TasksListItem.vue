<template>
  <div class="tasks-list-item">
    <div class="tasks-list-item__status-circle"></div>
    <span class="tasks-list-item__task-title">Make something incredible</span>
  </div>
</template>

<script>
export default {
  name: "tasks-list-item",
  setup() {
    return {};
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/global";

.tasks-list-item {
  padding: 10px;
  max-width: 100%;
  display: flex;
  align-items: center;
  column-gap: 5px;
  border: 2px solid $color-white;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(1.05);
    border: 2px solid $color-black;
  }
  &__status-circle {
    height: 30px;
    width: 30px;
    min-width: 30px;
    border: 4px solid $color-yellow;
    border-radius: 100%;
  }
  &__task-title {
    @include default-text(16px, 16px, $color-black);
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }
}
</style>
