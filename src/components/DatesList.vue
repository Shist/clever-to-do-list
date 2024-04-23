<template>
  <div class="dates-list" ref="datesList">
    <dates-list-item
      v-for="(dateArr, index) in currentDates"
      :key="dateArr[0]"
      :date="dateArr[0]"
      :week-day="dateArr[1]"
      :isActive="index === 15"
    />
  </div>
</template>

<script>
import { format } from "date-fns";
import DatesListItem from "@/components/DatesListItem";

export default {
  name: "dates-list",
  components: { DatesListItem },
  computed: {
    currentDates() {
      const currDate = new Date();
      const firstDate = new Date(currDate.getTime() - 15 * 24 * 60 * 60 * 1000);
      const lastDate = new Date(currDate.getTime() + 15 * 24 * 60 * 60 * 1000);
      const datesArr = [];

      while (firstDate <= lastDate) {
        datesArr.push([
          firstDate.toLocaleDateString(),
          format(firstDate, "iii"),
        ]);
        firstDate.setDate(firstDate.getDate() + 1);
      }

      return datesArr;
    },
  },
  mounted() {
    this.$refs.datesList.scrollLeft = 900;
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/global";

.dates-list {
  padding: 10px;
  display: flex;
  column-gap: 10px;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
