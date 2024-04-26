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
      <button class="task-by-id-page__change-completness-btn">Complete</button>
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
  flex-grow: 1;
  @extend %default-wrapper;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 20px;
  &__back-btn-headline-wrapper {
    display: flex;
    align-items: center;
    column-gap: 10px;
    .task-by-id-page__back-btn {
      width: 30px;
      height: 30px;
    }
    .task-by-id-page__headline {
      @include default-headline(36px, 36px, $color-black);
    }
  }
  &__task-item {
    padding: 10px;
    max-width: 100%;
    display: flex;
    align-items: center;
    column-gap: 5px;
    border-radius: 10px;
    .task-by-id-page__task-status-circle {
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
    .task-by-id-page__task-title {
      @include default-text(16px, 16px, $color-black);
      overflow: hidden;
      text-overflow: ellipsis;
      text-wrap: nowrap;
    }
  }
  &__task-description {
    @include default-text(16px, 16px, $color-black);
    min-height: 300px;
    resize: none;
  }
  &__bottom-btns-wrapper {
    padding: 10px;
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    .task-by-id-page__delete-edit-btns-wrapper {
      display: flex;
      column-gap: 10px;
      .task-by-id-page__delete-btn {
        width: 20px;
        height: 20px;
      }
      .task-by-id-page__edit-btn {
        width: 20px;
        height: 20px;
      }
    }
    .task-by-id-page__change-completness-btn {
    }
  }
}
</style>
