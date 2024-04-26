<template>
  <div class="main-page">
    <div class="main-page__headline-burger-btn-wrapper">
      <h1 class="main-page__headline">Tasks</h1>
      <burger-menu />
    </div>
    <dates-list class="main-page__dates-list" />
    <h2 class="main-page__tasks-list-headline">{{ getTasksListLabel }}</h2>
    <tasks-list class="main-page__tasks-list" />
    <app-button class="main-page__btn-add-task">+ Create new task</app-button>
  </div>
</template>

<script>
import BurgerMenu from "@/components/BurgerMenu";
import DatesList from "@/components/DatesList";
import TasksList from "@/components/TasksList";
import fetchTasksMixin from "@/components/mixins/fetchTasksMixin.js";
import toastMixin from "@/components/mixins/toastMixin.js";
import { mapState, mapGetters } from "vuex";

export default {
  name: "main-page",
  mixins: [fetchTasksMixin, toastMixin],
  components: { BurgerMenu, DatesList, TasksList },
  computed: {
    ...mapState({
      userTasks: (state) => state.firebase.userTasks,
    }),
    ...mapGetters({
      currDate: "datesAndTasks/currDate",
      currWeekDay: "datesAndTasks/currWeekDay",
      currDateTasksAmount: "datesAndTasks/currDateTasksAmount",
    }),
    getTasksListLabel() {
      if (this.currDateTasksAmount > 1) {
        return `${this.currDateTasksAmount} tasks for ${this.currDate} (${this.currWeekDay})`;
      } else if (this.currDateTasksAmount === 1) {
        return `${this.currDateTasksAmount} task for ${this.currDate} (${this.currWeekDay})`;
      } else {
        return `No any tasks for ${this.currDate} (${this.currWeekDay})`;
      }
    },
  },
  async mounted() {
    if (this.userTasks) {
      return;
    }
    this.setLoadingToast("Loading tasks...");
    try {
      await this.fetchTasks();
      this.setSuccessToast("The tasks were successfully loaded!");
    } catch (error) {
      this.setLoadingToast(
        `An error occurred while trying to load tasks! ${error.message}`
      );
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.main-page {
  flex-grow: 1;
  @extend %default-wrapper;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  &__headline-burger-btn-wrapper {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .main-page__headline {
      @include default-headline(36px, 36px, $color-black);
    }
  }
  &__dates-list {
    margin-bottom: 40px;
  }
  &__tasks-list-headline {
    margin-bottom: 30px;
    @include default-headline(24px, 24px, $color-black);
  }
  &__tasks-list {
    margin-bottom: 30px;
    max-height: 260px;
  }
  &__btn-add-task {
    margin-top: auto;
    align-self: center;
  }
}
</style>
