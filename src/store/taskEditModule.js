import { format } from "date-fns";

export const taskEditModule = {
  state: () => ({
    title: "",
    description: "",
    date: format(new Date(), "yyyy-MM-dd"),
    checked: "unchecked",
  }),
  getters: {},
  mutations: {
    setTitle(state, title) {
      state.title = title;
    },
    setDescription(state, description) {
      state.description = description;
    },
    setDate(state, date) {
      state.date = date;
    },
    setChecked(state, checked) {
      state.checked = checked;
    },
  },
  actions: {},
  namespaced: true,
};
