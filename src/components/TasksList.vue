<template>
  <ul class="tasks-list">
    <tasks-list-item
      v-for="task in currTasksList"
      :task="task"
      :key="task.id"
      @click="onTaskItemClicked(task)"
    />
  </ul>
</template>

<script>
import TasksListItem from "@/components/TasksListItem";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "tasks-list",

  components: { TasksListItem },

  methods: {
    ...mapMutations({
      setCurrUserTask: "userData/setCurrUserTask",
    }),

    onTaskItemClicked(task) {
      task.date = this.getTimeStampByTaskId(task.id);

      this.setCurrUserTask(task);

      this.$router.push(`/tasks/${task.id}`);
    },
  },

  computed: {
    ...mapGetters({
      currTasksList: "datesAndTasks/currTasksList",
      getTimeStampByTaskId: "userData/getTimeStampByTaskId",
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
