<template>
  <div class="dates-list">
    <dates-list-item :is-active="true" />
    <dates-list-item />
    <dates-list-item />
  </div>
</template>

<script>
import DatesListItem from "@/components/DatesListItem";

export default {
  name: "dates-list",
  components: { DatesListItem },
  setup() {
    return {};
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/global";

.dates-list {
  padding: 10px;
  display: flex;
  column-gap: 10px;
}
</style>
