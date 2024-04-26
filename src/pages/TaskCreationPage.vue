<template>
  <form action="#" class="task-creation-page">
    <div class="task-creation-page__back-btn-headline-wrapper">
      <button class="task-creation-page__back-btn"></button>
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
</style>
