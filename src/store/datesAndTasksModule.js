import { format } from "date-fns";

export const datesAndTasksModule = {
  state: () => ({
    currDateIndex: 15,
    daysAfter: 15,
    daysBefore: 15,
    datesTaskData: {},
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
        const firstDateStr = firstDate.toLocaleDateString();

        const dateInfoObj = {
          date: firstDateStr,
          weekDay: format(firstDate, "eee"),
          uncheckedExist: false,
          checkedExist: false,
          tasksAmount: 0,
        };

        if (firstDateStr in state.datesTaskData) {
          dateInfoObj.uncheckedExist = state.datesTaskData[firstDateStr].some(
            (task) => !task.checked
          );

          dateInfoObj.checkedExist = state.datesTaskData[firstDateStr].some(
            (task) => task.checked
          );

          dateInfoObj.tasksAmount = state.datesTaskData[firstDateStr].length;
        }

        datesArr.push(dateInfoObj);

        firstDate.setDate(firstDate.getDate() + 1);
      }

      return datesArr;
    },
    currDate(state, getters) {
      return getters.currentDates[state.currDateIndex].date;
    },
    currWeekDay(state, getters) {
      return getters.currentDates[state.currDateIndex].weekDay;
    },
    currDateTasksAmount(state, getters) {
      return getters.currentDates[state.currDateIndex].tasksAmount;
    },
    currTasksList(state, getters) {
      return state.datesTaskData[getters.currDate];
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
    setDatesTaskData(state, datesTaskData) {
      state.datesTaskData = datesTaskData;
    },
  },

  actions: {},

  namespaced: true,
};
