<template>
  <div class="dates-list" ref="datesList" @scroll="checkDatesScroll">
    <dates-list-item
      v-for="(dateInfoObj, index) in currentDates"
      :key="dateInfoObj.date"
      :date="dateInfoObj.date"
      :week-day="dateInfoObj.weekDay"
      :unchecked-exist="dateInfoObj.uncheckedExist"
      :checked-exist="dateInfoObj.checkedExist"
      :isActive="index === currDateIndex"
      @click="setCurrDateIndex(index)"
    />
  </div>
</template>

<script>
import DatesListItem from "@/components/DatesListItem";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "dates-list",

  components: { DatesListItem },

  methods: {
    ...mapMutations({
      setCurrDateIndex: "datesAndTasks/setCurrDateIndex",
      setDaysAfter: "datesAndTasks/setDaysAfter",
      setDaysBefore: "datesAndTasks/setDaysBefore",
    }),

    checkDatesScroll() {
      if (!this.$refs.datesList) return;

      const scrLeft = this.$refs.datesList.scrollLeft;
      const scrWidth = this.$refs.datesList.scrollWidth;
      const clWidth = this.$refs.datesList.clientWidth;

      if (scrLeft > scrWidth - clWidth - 50) {
        this.setDaysAfter(this.daysAfter + 15);
      } else if (scrLeft < 50) {
        this.setDaysBefore(this.daysBefore + 15);
        this.setCurrDateIndex(this.currDateIndex + 15);

        this.$refs.datesList.scrollLeft = 900;
      }
    },
  },

  computed: {
    ...mapState({
      currDateIndex: (state) => state.datesAndTasks.currDateIndex,
      daysAfter: (state) => state.datesAndTasks.daysAfter,
      daysBefore: (state) => state.datesAndTasks.daysBefore,
    }),

    ...mapGetters({
      currentDates: "datesAndTasks/currentDates",
    }),
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
