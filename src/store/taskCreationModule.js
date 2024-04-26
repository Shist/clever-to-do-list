export const taskCreationModule = {
  state: () => ({
    title: "",
    description: "",
    date: new Date().toISOString().slice(0, 10).split(".").reverse().join("-"),
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
