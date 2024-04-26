<template>
  <div class="task-by-id-page">
    <div class="task-by-id-page__back-btn-headline-wrapper">
      <button class="task-by-id-page__back-btn"></button>
      <h1 class="task-by-id-page__headline">Task by ID page</h1>
    </div>
    <tasks-list-item
      v-if="currTask"
      :task="currTask"
      class="task-by-id-page__task-item"
    />
    <textarea class="task-by-id-page__task-description"></textarea>
    <div class="task-by-id-page__bottom-btns-wrapper">
      <div class="task-by-id-page__delete-edit-btns-wrapper">
        <button class="task-by-id-page__delete-btn"></button>
        <button class="task-by-id-page__edit-btn"></button>
      </div>
      <button class="task-by-id-page__change-completness-btn"></button>
    </div>
  </div>
</template>

<script>
import TasksListItem from "@/components/TasksListItem";
import fetchTasksMixin from "@/components/mixins/fetchTasksMixin.js";
import toastMixin from "@/components/mixins/toastMixin.js";
import { mapState, mapGetters } from "vuex";

export default {
  name: "task-by-id-page",
  mixins: [fetchTasksMixin, toastMixin],
  components: { TasksListItem },
  data() {
    return {
      currTask: null,
    };
  },
  computed: {
    ...mapState({
      userTasks: (state) => state.firebase.userTasks,
    }),
    ...mapGetters({
      currTaskById: "firebase/currTaskById",
    }),
  },
  async mounted() {
    if (!this.userTasks) {
      this.setLoadingToast("Loading task...");
      try {
        await this.fetchTasks();
        this.setSuccessToast("The task was successfully loaded!");
      } catch (error) {
        this.setLoadingToast(
          `An error occurred while trying to load task! ${error.message}`
        );
      }
    }
    this.currTask = this.currTaskById(this.$route.params.id);
  },
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
