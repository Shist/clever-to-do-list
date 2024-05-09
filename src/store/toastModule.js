export const toastModule = {
  state: () => ({
    currToastId: null,
  }),

  getters: {},

  mutations: {
    setCurrToastId(state, currToastId) {
      state.currToastId = currToastId;
    },
  },

  actions: {},

  namespaced: true,
};
