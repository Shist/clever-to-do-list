<template>
  <ul class="tasks-list">
    <tasks-list-item
      v-for="task in tasksObj.tasks"
      :task="task"
      :key="task.id"
    />
  </ul>
</template>

<script>
import TasksListItem from "@/components/TasksListItem";

export default {
  name: "tasks-list",
  components: { TasksListItem },
  data() {
    return {
      tasksObj: {
        userUid: "3pFkRLfhgub4multDXK9gNuGoMM2",
        tasks: [
          {
            id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            date: "April 25, 2024 at 12:00:00 AM UTC+3",
            checked: true,
            title: "First Task",
            description: "Some description of the first task...",
          },
        ],
      },
    };
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
