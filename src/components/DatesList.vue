<template>
  <div class="dates-list" ref="datesList" @scroll="checkDatesScroll">
    <dates-list-item
      v-for="(dateArr, index) in currentDates"
      :key="dateArr[0]"
      :date="dateArr[0]"
      :week-day="dateArr[1]"
      :isActive="index === currDateIndex"
    />
  </div>
</template>

<script>
import { format } from "date-fns";
import DatesListItem from "@/components/DatesListItem";

export default {
  name: "dates-list",
  components: { DatesListItem },
  data() {
    return {
      currDateIndex: 15,
      daysAfter: 15,
      daysBefore: 15,
    };
  },
  methods: {
    checkDatesScroll() {
      const scrLeft = this.$refs.datesList.scrollLeft;
      const scrWidth = this.$refs.datesList.scrollWidth;
      const clWidth = this.$refs.datesList.clientWidth;

      if (scrLeft > scrWidth - clWidth - 50) {
        this.daysAfter += 15;
        this.$refs.datesList.scrollLeft = scrWidth - 900;
      } else if (scrLeft < 50) {
        this.daysBefore += 15;
        this.currDateIndex += 15;
        this.$refs.datesList.scrollLeft = 900;
      }
    },
  },
  computed: {
    currentDates() {
      const currDate = new Date();
      const firstDate = new Date(
        currDate.getTime() - this.daysBefore * 24 * 60 * 60 * 1000
      );
      const lastDate = new Date(
        currDate.getTime() + this.daysAfter * 24 * 60 * 60 * 1000
      );
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
