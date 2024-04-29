<template>
  <form action="#" class="task-creation-page">
    <div class="task-creation-page__back-btn-headline-wrapper">
      <app-left-arrow
        class="task-creation-page__back-btn"
        @click="this.$router.push('/')"
        :disabled="isLoading"
      />
      <h2 class="task-creation-page__headline">Create new task</h2>
    </div>
    <label class="task-creation-page__title-input-label" for="titleInput">
      Enter task title below:
    </label>
    <input
      v-model="title"
      type="text"
      name="title"
      class="task-creation-page__title-input"
      id="titleInput"
      placeholder="Title"
      required
    />
    <label
      class="task-creation-page__description-textarea-label"
      for="descriptionTextarea"
    >
      Enter task description below:
    </label>
    <textarea
      v-model="description"
      type="text"
      name="description"
      class="task-creation-page__description-textarea"
      id="descriptionTextarea"
      placeholder="Description"
      required
    ></textarea>
    <label class="task-creation-page__date-input-label" for="titleInput">
      Choose task date below:
    </label>
    <input
      v-model="date"
      type="date"
      name="date"
      class="task-creation-page__date-input"
      id="dateInput"
      required
    />
    <label class="task-creation-page__checked-select-label" for="checkedSelect">
      Specify task completeness below:
    </label>
    <select
      v-model="checked"
      name="checked"
      class="task-creation-page__checked-select"
      id="checkedSelect"
      required
    >
      <option value="unchecked">Not completed</option>
      <option value="checked">Completed</option>
    </select>
    <button
      class="task-creation-page__confirm-btn"
      @click.prevent="onCreateBtnClicked"
      :disabled="isLoading"
    >
      Create
    </button>
  </form>
</template>

<script>
import { format } from "date-fns";
import toastMixin from "@/mixins/toastMixin.js";
import fetchTasksMixin from "@/mixins/fetchTasksMixin.js";
import taskValidationMixin from "@/mixins/taskValidationMixin.js";
import { mapActions } from "vuex";

export default {
  name: "task-creation-page",
  mixins: [toastMixin, fetchTasksMixin, taskValidationMixin],
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    ...mapActions({
      uploadNewTask: "firebase/uploadNewTask",
    }),
    async onCreateBtnClicked() {
      const errorMsg = this.getTaskValidationError(
        this.title,
        this.description
      );
      if (errorMsg) {
        this.setErrorToast(`Error! ${errorMsg}`);
        return;
      }
      this.isLoading = true;
      this.setLoadingToast("Uploading new task data to DB...");
      try {
        await this.uploadNewTask({
          title: this.title,
          description: this.description,
          date: this.date,
          checked: this.checked === "checked",
        });
        this.title = "";
        this.description = "";
        this.date = format(new Date(), "yyyy-MM-dd");
        this.checked = "unchecked";

        await this.fetchTasks();

        this.setSuccessToast("You have successfully created new task!");
        this.$router.push("/");
      } catch (error) {
        this.setErrorToast(
          `An error occurred while trying to create new task! ${error.message}`
        );
      } finally {
        this.isLoading = true;
      }
    },
  },
  computed: {
    title: {
      get() {
        return this.$store.state.taskCreation.title;
      },
      set(newValue) {
        this.$store.commit("taskCreation/setTitle", newValue);
      },
    },
    description: {
      get() {
        return this.$store.state.taskCreation.description;
      },
      set(newValue) {
        this.$store.commit("taskCreation/setDescription", newValue);
      },
    },
    date: {
      get() {
        return this.$store.state.taskCreation.date;
      },
      set(newValue) {
        this.$store.commit("taskCreation/setDate", newValue);
      },
    },
    checked: {
      get() {
        return this.$store.state.taskCreation.checked;
      },
      set(newValue) {
        this.$store.commit("taskCreation/setChecked", newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.task-creation-page {
  flex-grow: 1;
  @extend %default-wrapper;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__back-btn-headline-wrapper {
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    column-gap: 10px;
    .task-creation-page__back-btn {
      min-width: 30px;
    }
    .task-creation-page__headline {
      @include default-headline(42px, 42px, $color-black);
      @media (max-width: $phone-l) {
        font-size: 24px;
        line-height: 24px;
      }
    }
  }
  &__title-input-label,
  &__description-textarea-label,
  &__date-input-label,
  &__checked-select-label {
    @include default-text(24px, 24px, $color-black);
    max-width: 500px;
    width: 100%;
    @media (max-width: $phone-l) {
      font-size: 20px;
      line-height: 20px;
    }
  }
  &__title-input {
    @extend %default-input;
    margin-bottom: 20px;
  }
  &__description-textarea {
    @extend %default-textarea;
    margin-bottom: 20px;
  }
  &__date-input {
    @extend %default-input;
    margin-bottom: 20px;
  }
  &__checked-select {
    @extend %default-input;
    margin-bottom: 40px;
  }
  &__confirm-btn {
    @include default-btn(200px, $color-white, $color-orange);
  }
}
</style>
