<template>
  <div class="dates-list-item">
    <div
      class="dates-list-item__date-wrapper"
      :class="{ 'dates-list-item__date-wrapper_active': isActive }"
    >
      <h4
        class="dates-list-item__week-day"
        :class="{ 'dates-list-item__week-day_active': isActive }"
      >
        Mon
      </h4>
      <h4
        class="dates-list-item__month-day"
        :class="{ 'dates-list-item__month-day_active': isActive }"
      >
        22
      </h4>
    </div>
    <div class="dates-list-item__dots-wrapper">
      <div class="dates-list-item__dot dates-list-item__dot_undone"></div>
      <div class="dates-list-item__dot dates-list-item__dot_done"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dates-list-item",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/global";

.dates-list-item {
  width: 50px;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
  }
  &:hover > &__date-wrapper {
    border: 2px solid $color-black;
  }
  &__date-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    border: 2px solid $color-white;
    transition: 0.3s;
    &_active {
      background-color: $color-black;
      border: 2px solid $color-black;
    }
    .dates-list-item__week-day {
      @include default-headline(14px, 14px, $color-light-gray);
      &_active {
        color: $color-white;
      }
    }
    .dates-list-item__month-day {
      @include default-headline(14px, 14px, $color-black);
      &_active {
        color: $color-white;
      }
    }
  }
  &__dots-wrapper {
    display: flex;
    justify-content: center;
    column-gap: 5px;
    .dates-list-item__dot {
      height: 5px;
      width: 5px;
      border-radius: 100%;
      &_undone {
        background-color: $color-yellow;
      }
      &_done {
        background-color: $color-light-orange;
      }
    }
  }
}
</style>
