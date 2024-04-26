<template>
  <form action="#" class="task-creation-page">
    <div class="task-creation-page__back-btn-headline-wrapper">
      <app-left-arrow
        class="task-creation-page__back-btn"
        @click="this.$router.push('/')"
      />
      <h2 class="task-creation-page__headline">Create new task</h2>
    </div>
    <label class="task-creation-page__title-input-label" for="titleInput">
      Enter task title below:
    </label>
    <input
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
      name="checked"
      class="task-creation-page__checked-select"
      id="checkedSelect"
      required
    >
      <option value="unckeched">Not completed</option>
      <option value="checked">Completed</option>
    </select>
    <button
      class="task-creation-page__confirm-btn"
      type="submit"
      @click.prevent="onCreateBtnClicked"
    >
      Create
    </button>
  </form>
</template>

<script>
export default {
  name: "task-creation-page",
  methods: {
    async onCreateBtnClicked() {},
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
