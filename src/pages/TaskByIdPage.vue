<template>
  <div v-if="currTask" class="task-by-id-page">
    <div class="task-by-id-page__back-btn-headline-wrapper">
      <app-left-arrow
        class="task-by-id-page__back-btn"
        @click="this.$router.push('/')"
      />
      <h2 class="task-by-id-page__headline">{{ getTaskLabel }}</h2>
    </div>
    <div class="task-by-id-page__task-item">
      <div
        class="task-by-id-page__task-status-circle"
        :class="{ 'task-by-id-page__task-status-circle_checked': checked }"
      ></div>
      <input
        v-model="title"
        type="text"
        name="edit-title"
        class="task-by-id-page__task-title"
        id="editTitleInput"
        placeholder="Title"
        required
      />
    </div>
    <textarea
      v-model="description"
      type="text"
      name="editDescription"
      class="task-by-id-page__task-description"
      id="editDescriptionTextarea"
      placeholder="Description"
      required
    ></textarea>
    <input
      v-model="date"
      type="date"
      name="editDate"
      class="task-by-id-page__task-date"
      id="editDateInput"
      required
    />
    <div class="task-by-id-page__bottom-btns-wrapper">
      <div class="task-by-id-page__delete-edit-btns-wrapper">
        <button
          class="task-by-id-page__btn task-by-id-page__btn_delete"
        ></button>
        <div class="task-by-id-page__gray-divider"></div>
        <button class="task-by-id-page__btn task-by-id-page__btn_edit"></button>
      </div>
      <button class="task-by-id-page__change-completness-btn">Complete</button>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
import fetchTasksMixin from "@/mixins/fetchTasksMixin.js";
import toastMixin from "@/mixins/toastMixin.js";
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
    title: {
      get() {
        return this.$store.state.taskEdit.title;
      },
      set(newValue) {
        this.$store.commit("taskEdit/setTitle", newValue);
      },
    },
    description: {
      get() {
        return this.$store.state.taskEdit.description;
      },
      set(newValue) {
        this.$store.commit("taskEdit/setDescription", newValue);
      },
    },
    date: {
      get() {
        return this.$store.state.taskEdit.date;
      },
      set(newValue) {
        this.$store.commit("taskEdit/setDate", newValue);
      },
    },
    checked: {
      get() {
        return this.$store.state.taskEdit.checked;
      },
      set(newValue) {
        this.$store.commit("taskEdit/setChecked", newValue);
      },
    },
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
    this.title = this.currTask.title;
    this.description = this.currTask.description;
    this.date = format(
      new Date(
        this.currTask.date.seconds * 1000 +
          this.currTask.date.nanoseconds / 1000000
      ),
      "yyyy-MM-dd"
    );
    this.checked = this.currTask.checked;
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
      min-width: 30px;
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
    column-gap: 10px;
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
      @extend %default-input;
      overflow: hidden;
      text-overflow: ellipsis;
      text-wrap: nowrap;
    }
  }
  &__task-description {
    @extend %default-textarea;
  }
  &__task-date {
    @extend %default-input;
  }
  &__bottom-btns-wrapper {
    padding: 10px;
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    .task-by-id-page__delete-edit-btns-wrapper {
      display: flex;
      column-gap: 20px;
      .task-by-id-page__btn {
        padding: 10px;
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          transform: scale(1.1);
          background-color: $color-very-light-gray;
        }
        &_delete {
          background: transparent url("@/assets/icons/trash.svg") no-repeat
            center / 90%;
        }
        &_edit {
          background: transparent url("@/assets/icons/pen.svg") no-repeat center /
            90%;
        }
      }
      .task-by-id-page__gray-divider {
        height: 40px;
        width: 3px;
        background-color: $color-very-light-gray;
        border-radius: 1px;
      }
    }
    .task-by-id-page__change-completness-btn {
      @include default-btn(200px, $color-white, $color-orange);
    }
  }
}
</style>
