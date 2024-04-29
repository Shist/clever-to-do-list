<template>
  <div v-if="currTask" class="task-by-id-page">
    <div class="task-by-id-page__back-btn-headline-wrapper">
      <app-left-arrow
        class="task-by-id-page__back-btn"
        @click="onBackBtnClicked"
      />
      <h2 class="task-by-id-page__headline">{{ getTaskLabel }}</h2>
    </div>
    <div class="task-by-id-page__task-item">
      <span class="task-by-id-page__task-status-label">Status:</span>
      <div
        class="task-by-id-page__task-status-circle"
        :class="{ 'task-by-id-page__task-status-circle_checked': checked }"
      ></div>
    </div>
    <label class="task-by-id-page__task-title-label" for="editTitleInput">
      {{ getTitleLabel }}
    </label>
    <input
      v-model="title"
      type="text"
      name="edit-title"
      class="task-by-id-page__task-title"
      id="editTitleInput"
      placeholder="Title"
      required
      :disabled="!isEdit"
    />
    <label
      class="task-by-id-page__task-description-label"
      for="editDescriptionTextarea"
    >
      {{ getDescriptionLabel }}
    </label>
    <textarea
      v-model="description"
      type="text"
      name="editDescription"
      class="task-by-id-page__task-description"
      id="editDescriptionTextarea"
      placeholder="Description"
      required
      :disabled="!isEdit"
    ></textarea>
    <label class="task-by-id-page__task-date-label" for="editDateInput">
      {{ getDateLabel }}
    </label>
    <input
      v-model="date"
      type="date"
      name="editDate"
      class="task-by-id-page__task-date"
      id="editDateInput"
      required
      :disabled="!isEdit"
    />
    <div class="task-by-id-page__bottom-btns-wrapper">
      <div class="task-by-id-page__delete-edit-btns-wrapper">
        <button
          class="task-by-id-page__btn task-by-id-page__btn_delete"
          @click="deleteModalIsOpen = true"
          :disabled="isEdit"
        ></button>
        <div class="task-by-id-page__gray-divider"></div>
        <div class="task-by-id-page__edit-btns-wrapper">
          <button
            class="task-by-id-page__btn task-by-id-page__btn_edit"
            @click="setIsEdit(!isEdit)"
            :disabled="isEdit"
          ></button>
          <button
            class="task-by-id-page__edit-btn-confirm"
            @click="onEditSaveBtnClicked"
            :disabled="!isEdit"
          >
            Save
          </button>
        </div>
      </div>
      <button
        class="task-by-id-page__change-completness-btn"
        :disabled="isEdit"
      >
        Complete
      </button>
    </div>
    <teleport to="body">
      <app-modal-confirm
        :isOpened="deleteModalIsOpen"
        @confirmed="onDeleteConfirmation"
        @declined="deleteModalIsOpen = false"
      >
        <template v-slot:headline>Deletion confirmation</template>
        <template v-slot:text
          >Are you sure you want to delete this task?</template
        >
      </app-modal-confirm>
    </teleport>
  </div>
</template>

<script>
import { format } from "date-fns";
import fetchTasksMixin from "@/mixins/fetchTasksMixin.js";
import toastMixin from "@/mixins/toastMixin.js";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "task-by-id-page",
  mixins: [fetchTasksMixin, toastMixin],
  data() {
    return {
      currTask: null,
      deleteModalIsOpen: false,
    };
  },
  methods: {
    ...mapMutations({
      setIsEdit: "taskEdit/setIsEdit",
    }),
    onBackBtnClicked() {
      this.setIsEdit(false);
      this.$router.push("/");
    },
    async onEditSaveBtnClicked() {
      this.setIsEdit(false);
      // todo server request
    },
    async onDeleteConfirmation() {
      console.log("onDeleteConfirmation");
      this.deleteModalIsOpen = false;
      // todo server request
    },
  },
  computed: {
    ...mapState({
      isEdit: (state) => state.taskEdit.isEdit,
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
    getTitleLabel() {
      return this.isEdit ? "Edit task title:" : "Task title:";
    },
    getDescriptionLabel() {
      return this.isEdit ? "Edit task description:" : "Task description:";
    },
    getDateLabel() {
      return this.isEdit ? "Edit task date:" : "Task date:";
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
  align-items: center;
  &__back-btn-headline-wrapper {
    margin-bottom: 30px;
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
    margin-bottom: 20px;
    max-width: 100%;
    display: flex;
    align-items: center;
    column-gap: 10px;
    border-radius: 10px;
    .task-by-id-page__task-status-label {
      @include default-text(24px, 24px, $color-black);
    }
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
  }
  &__task-title-label,
  &__task-description-label,
  &__task-date-label {
    @include default-text(24px, 24px, $color-black);
    max-width: 500px;
    width: 100%;
    @media (max-width: $phone-l) {
      font-size: 20px;
      line-height: 20px;
    }
  }
  &__task-title {
    margin-bottom: 20px;
    @extend %default-input;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    &:disabled {
      border: none;
    }
  }
  &__task-description {
    margin-bottom: 20px;
    @extend %default-textarea;
    &:disabled {
      border: none;
    }
  }
  &__task-date {
    margin-bottom: 20px;
    @extend %default-input;
    &:disabled {
      border: none;
    }
  }
  &__bottom-btns-wrapper {
    align-self: normal;
    padding: 10px;
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    column-gap: 20px;
    @media (max-width: $phone-l) {
      flex-direction: column;
      align-items: center;
      row-gap: 20px;
    }
    .task-by-id-page__delete-edit-btns-wrapper {
      display: flex;
      align-items: center;
      column-gap: 20px;
      .task-by-id-page__btn {
        padding: 10px;
        width: 40px;
        min-width: 40px;
        height: 40px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          transform: scale(1.1);
          background-color: $color-very-light-gray;
        }
        &:disabled {
          transform: none;
          background-color: $color-light-gray;
          filter: grayscale(50%);
        }
        &_delete {
          background: transparent url("@/assets/icons/trash.svg") no-repeat
            center / 90%;
        }
        &_edit {
          background: url("@/assets/icons/pen.svg") no-repeat center / 90%;
        }
      }
      .task-by-id-page__edit-btns-wrapper {
        display: flex;
        align-items: center;
        column-gap: 20px;
        .task-by-id-page__edit-btn-confirm {
          @include default-btn(200px, $color-white, $color-orange);
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
