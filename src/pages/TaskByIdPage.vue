<template>
  <div v-if="currTask" class="task-by-id-page">
    <div class="task-by-id-page__back-btn-headline-wrapper">
      <app-left-arrow
        class="task-by-id-page__back-btn"
        @click="onBackBtnClicked"
        :disabled="isLoading"
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
      :disabled="!isEdit || isLoading"
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
      :disabled="!isEdit || isLoading"
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
      :disabled="!isEdit || isLoading"
    />
    <div class="task-by-id-page__bottom-btns-wrapper">
      <div class="task-by-id-page__delete-edit-btns-wrapper">
        <button
          class="task-by-id-page__btn task-by-id-page__btn_delete"
          @click="deleteModalIsOpen = true"
          :disabled="isEdit || isLoading"
        ></button>
        <div class="task-by-id-page__gray-divider"></div>
        <div class="task-by-id-page__edit-btns-wrapper">
          <button
            class="task-by-id-page__btn task-by-id-page__btn_edit"
            @click="setIsEdit(!isEdit)"
            :disabled="isEdit || isLoading"
          ></button>
          <button
            class="task-by-id-page__edit-btn-confirm"
            @click="onEditSaveBtnClicked"
            :disabled="!isEdit || isLoading"
          >
            Save
          </button>
          <button
            class="task-by-id-page__edit-btn-cancel"
            @click="onEditCancelBtnClicked"
            :disabled="!isEdit || isLoading"
          >
            Cancel
          </button>
        </div>
      </div>
      <button
        class="task-by-id-page__change-completness-btn"
        @click="onCheckedBtnClicked"
        :disabled="isEdit || isLoading"
        :class="{
          'task-by-id-page__change-completness-btn_complete':
            !currTask?.checked,
          'task-by-id-page__change-completness-btn_incomplete':
            currTask?.checked,
        }"
      >
        {{ currTask?.checked ? "Incomplete" : "Complete" }}
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
  <div v-else class="task-by-id-alt-page">
    <h2 v-if="isLoading" class="task-by-id-alt-page__headline-loading">
      The task is loading...
    </h2>
    <div v-else class="task-by-id-alt-page__error-wrapper">
      <h2 class="task-by-id-alt-page__headline-no-item">
        No task with the specified id was found.
      </h2>
      <router-link to="/" class="task-by-id-alt-page__link-to-main">
        Back to the main page
      </router-link>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
import toastMixin from "@/mixins/toastMixin.js";
import fetchTasksMixin from "@/mixins/fetchTasksMixin.js";
import taskValidationMixin from "@/mixins/taskValidationMixin.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "task-by-id-page",
  mixins: [fetchTasksMixin, toastMixin, taskValidationMixin],
  data() {
    return {
      currTask: null,
      deleteModalIsOpen: false,
      isLoading: false,
    };
  },
  methods: {
    ...mapMutations({
      setIsEdit: "taskEdit/setIsEdit",
    }),
    ...mapActions({
      changeExistingTask: "firebase/changeExistingTask",
      deleteExistingTask: "firebase/deleteExistingTask",
    }),
    onBackBtnClicked() {
      this.setIsEdit(false);
      this.$router.push("/");
    },
    updateCurrItem() {
      this.currTask = this.currTaskById(this.$route.params.id);
      this.title = this.currTask?.title;
      this.description = this.currTask?.description;
      this.date = format(
        new Date(
          this.currTask
            ? this.currTask.date.seconds * 1000 +
              this.currTask.date.nanoseconds / 1000000
            : null
        ),
        "yyyy-MM-dd"
      );
      this.checked = this.currTask?.checked;
    },
    onEditCancelBtnClicked() {
      this.updateCurrItem();
      this.setIsEdit(false);
    },
    async onCheckedBtnClicked() {
      this.isLoading = true;
      this.setLoadingToast("Uploading task status to DB...");
      try {
        await this.changeExistingTask({
          id: this.$route.params.id,
          title: this.title,
          description: this.description,
          date: this.date,
          checked: !this.checked,
        });

        await this.fetchTasks();
        this.updateCurrItem();

        this.setSuccessToast("You have successfully edited the task status!");
        this.setIsEdit(false);
        this.$router.push("/");
      } catch (error) {
        this.setErrorToast(
          `An error occurred while trying to edit the task status! ${error.message}`
        );
      } finally {
        this.isLoading = false;
      }
    },
    async onEditSaveBtnClicked() {
      const errorMsg = this.getTaskValidationError(
        this.title,
        this.description
      );
      if (errorMsg) {
        this.setErrorToast(`Error! ${errorMsg}`);
        return;
      }
      this.isLoading = true;
      this.setLoadingToast("Uploading task data changes to DB...");
      try {
        await this.changeExistingTask({
          id: this.$route.params.id,
          title: this.title,
          description: this.description,
          date: this.date,
          checked: this.checked,
        });

        await this.fetchTasks();
        this.updateCurrItem();

        this.setSuccessToast("You have successfully edited the task!");
        this.setIsEdit(false);
      } catch (error) {
        this.setErrorToast(
          `An error occurred while trying to edit the task! ${error.message}`
        );
      } finally {
        this.isLoading = false;
      }
    },
    async onDeleteConfirmation() {
      this.isLoading = true;
      this.deleteModalIsOpen = false;
      this.setLoadingToast("Deleting task in DB...");
      try {
        await this.deleteExistingTask(this.$route.params.id);

        await this.fetchTasks();

        this.setSuccessToast("You have successfully deleted the task!");
        this.$router.push("/");
      } catch (error) {
        console.error(error.message);
        this.setErrorToast(
          `An error occurred while trying to delete the task! ${error.message}`
        );
      } finally {
        this.isLoading = false;
      }
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
      this.isLoading = true;
      this.setLoadingToast("Loading tasks...");
      try {
        await this.fetchTasks();
        this.removeCurrToast();
      } catch (error) {
        this.setLoadingToast(
          `An error occurred while trying to load tasks! ${error.message}`
        );
      } finally {
        this.isLoading = false;
      }
    }
    this.updateCurrItem();
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
    @media (max-width: $tablet-m) {
      flex-direction: column;
      align-items: center;
      row-gap: 20px;
    }
    @media (max-width: $phone-l) {
      padding: 5px;
    }
    .task-by-id-page__delete-edit-btns-wrapper {
      display: flex;
      align-items: center;
      column-gap: 20px;
      @media (max-width: $phone-l) {
        column-gap: 10px;
      }
      @media (max-width: $phone-m) {
        column-gap: 5px;
      }
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
        @media (max-width: $phone-l) {
          width: 30px;
          min-width: 30px;
          height: 30px;
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
        @media (max-width: $phone-l) {
          column-gap: 10px;
        }
        @media (max-width: $phone-m) {
          column-gap: 5px;
        }
        .task-by-id-page__edit-btn-confirm {
          @include default-btn(80px, $color-white, $color-orange);
          min-width: 80px;
          border: 2px solid $color-orange;
          @media (max-width: $phone-l) {
            padding: 10px;
            font-size: 14px;
            line-height: 14px;
          }
        }
        .task-by-id-page__edit-btn-cancel {
          @include default-btn(80px, $color-black, $color-light-yellow);
          min-width: 80px;
          border: 2px solid $color-black;
          @media (max-width: $phone-l) {
            padding: 10px;
            font-size: 14px;
            line-height: 14px;
          }
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
      max-width: 200px;
      width: 100%;
      padding: 15px;
      font-family: $font-roboto;
      font-weight: 700;
      font-size: 16px;
      line-height: 16px;
      text-align: center;
      color: $color-white;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        transform: scale(1.05);
      }
      &:disabled {
        transform: none;
        filter: grayscale(50%);
      }
      &_complete {
        color: $color-green-text;
        background-color: $color-light-green;
      }
      &_incomplete {
        color: $color-yellow-text;
        background-color: $color-light-yellow;
      }
    }
  }
}
.task-by-id-alt-page {
  padding: 10px;
  .task-by-id-alt-page__headline-loading {
    @include default-headline(48px, 48px, $color-black);
  }
  .task-by-id-alt-page__error-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
    .task-by-id-alt-page__headline-no-item {
      @include default-headline(48px, 48px, $color-black);
    }
    .task-by-id-alt-page__link-to-main {
      @include default-text(36px, 36px, $color-black);
      transition: 0.3s;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>
