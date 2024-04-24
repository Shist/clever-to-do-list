<template>
  <ul class="tasks-list">
    <tasks-list-item
      v-for="task in currUser.tasks"
      :task="task"
      :key="task.id"
    />
  </ul>
</template>

<script>
import TasksListItem from "@/components/TasksListItem";
import { mapState } from "vuex";

export default {
  name: "tasks-list",
  components: { TasksListItem },
  computed: {
    ...mapState({
      currUser: (state) => state.firebase.currUser,
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
