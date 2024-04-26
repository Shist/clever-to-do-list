<template>
  <div v-if="currTask" class="task-by-id-page">
    <div class="task-by-id-page__back-btn-headline-wrapper">
      <button class="task-by-id-page__back-btn"></button>
      <h1 class="task-by-id-page__headline">{{ getTaskLabel }}</h1>
    </div>
    <div class="task-by-id-page__task-item">
      <div
        class="task-by-id-page__task-status-circle"
        :class="{ 'tasks-list-item__status-circle_checked': currTask.checked }"
      ></div>
      <input class="task-by-id-page__task-title" v-model="currTask.title" />
    </div>
    <textarea
      class="task-by-id-page__task-description"
      v-model="currTask.description"
    ></textarea>
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
import fetchTasksMixin from "@/components/mixins/fetchTasksMixin.js";
import toastMixin from "@/components/mixins/toastMixin.js";
import { mapState, mapGetters } from "vuex";

export default {
  name: "task-by-id-page",
  mixins: [fetchTasksMixin, toastMixin],
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
      currDateById: "firebase/currDateById",
      currWeekDayById: "firebase/currWeekDayById",
    }),
    getTaskLabel() {
      return `Task for ${this.currDateById(
        this.$route.params.id
      )} (${this.currWeekDayById(this.$route.params.id)})`;
    },
  },
  async mounted() {
    if (!this.userTasks) {
      this.setLoadingToast("Loading tasks...");
      try {
        await this.fetchTasks();
        this.setSuccessToast("The tasks were successfully loaded!");
      } catch (error) {
        this.setLoadingToast(
          `An error occurred while trying to load tasks! ${error.message}`
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
