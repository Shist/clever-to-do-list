<template>
  <div class="dates-list" ref="datesList" @scroll="checkDatesScroll">
    <dates-list-item
      v-for="(dateArr, index) in currentDates"
      :key="dateArr[0]"
      :date="dateArr[0]"
      :week-day="dateArr[1]"
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
      setCurrDateIndex: "dates/setCurrDateIndex",
      setDaysAfter: "dates/setDaysAfter",
      setDaysBefore: "dates/setDaysBefore",
    }),
    checkDatesScroll() {
      const scrLeft = this.$refs.datesList.scrollLeft;
      const scrWidth = this.$refs.datesList.scrollWidth;
      const clWidth = this.$refs.datesList.clientWidth;

      if (scrLeft > scrWidth - clWidth - 50) {
        this.setDaysAfter(this.daysAfter + 15);
        this.$refs.datesList.scrollLeft = scrWidth - 900;
      } else if (scrLeft < 50) {
        this.setDaysBefore(this.daysBefore + 15);
        this.setCurrDateIndex(this.currDateIndex + 15);
        this.$refs.datesList.scrollLeft = 900;
      }
    },
  },
  computed: {
    ...mapState({
      currDateIndex: (state) => state.dates.currDateIndex,
      daysAfter: (state) => state.dates.daysAfter,
      daysBefore: (state) => state.dates.daysBefore,
    }),
    ...mapGetters({
      currentDates: "dates/currentDates",
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
