export const infoSnackbarModule = {
  state: () => ({
    visibility: false,
    message: "",
    isPermanent: false,
    colorClass: "info",
  }),
  getters: {},
  mutations: {
    setVisibility(state, visibility) {
      state.visibility = visibility;
    },
    setMessage(state, message) {
      state.message = message;
    },
    setIsPermanent(state, isPermanent) {
      state.isPermanent = isPermanent;
    },
    setColorClass(state, colorClass) {
      state.colorClass = colorClass;
    },
  },
  actions: {},
  namespaced: true,
};
