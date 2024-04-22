<template>
  <div class="tasks-list">
    <tasks-list-item />
    <tasks-list-item />
    <tasks-list-item />
  </div>
</template>

<script>
import TasksListItem from "@/components/TasksListItem";

export default {
  components: { TasksListItem },
  setup() {
    return {};
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/global";

.tasks-list {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 20px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: $tablet-l) {
    padding: 10px 10px;
  }
}
</style>
