import { format } from "date-fns";

export const datesModule = {
  state: () => ({
    currDateIndex: 15,
    daysAfter: 15,
    daysBefore: 15,
  }),
  getters: {
    currentDates(state) {
      const currDate = new Date();
      const firstDate = new Date(
        currDate.getTime() - state.daysBefore * 24 * 60 * 60 * 1000
      );
      const lastDate = new Date(
        currDate.getTime() + state.daysAfter * 24 * 60 * 60 * 1000
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
    currDate(state, getters) {
      return getters.currentDates[state.currDateIndex][0];
    },
    currWeekDay(state, getters) {
      return getters.currentDates[state.currDateIndex][1];
    },
  },
  mutations: {
    setCurrDateIndex(state, currDateIndex) {
      state.currDateIndex = currDateIndex;
    },
    setDaysAfter(state, daysAfter) {
      state.daysAfter = daysAfter;
    },
    setDaysBefore(state, daysBefore) {
      state.daysBefore = daysBefore;
    },
  },
  actions: {},
  namespaced: true,
};
