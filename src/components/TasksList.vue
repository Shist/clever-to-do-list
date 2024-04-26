<template>
  <ul class="tasks-list">
    <tasks-list-item
      v-for="task in currTasksList"
      :task="task"
      :key="task.id"
      @click="this.$router.push(`/tasks/${task.id}`)"
    />
  </ul>
</template>

<script>
import TasksListItem from "@/components/TasksListItem";
import { mapGetters } from "vuex";

export default {
  name: "tasks-list",
  components: { TasksListItem },
  computed: {
    ...mapGetters({
      currTasksList: "datesAndTasks/currTasksList",
    }),
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
