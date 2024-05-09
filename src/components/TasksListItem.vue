<template>
  <li class="tasks-list-item">
    <div
      class="tasks-list-item__status-circle"
      :class="{ 'tasks-list-item__status-circle_checked': task.checked }"
    ></div>
    <span class="tasks-list-item__task-title">{{ task.title }}</span>
  </li>
</template>

<script>
export default {
  name: "tasks-list-item",

  props: {
    task: {
      type: Object,
      required: true,
    },
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
    border-radius: 100%;
    border: 4px solid $color-yellow;
    &_checked {
      border: 4px solid $color-light-orange;
      background-color: $color-light-orange;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: -3px;
        left: 3px;
        transform: rotate(45deg);
        width: 6px;
        height: 10px;
        border: solid $color-white;
        border-width: 0 4px 4px 0;
        transform-origin: bottom left;
      }
    }
  }
  &__task-title {
    @include default-text(16px, 16px, $color-black);
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }
}
</style>
