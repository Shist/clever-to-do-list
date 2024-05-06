export const userDataModule = {
  state: () => ({
    userUid: null,
    userEmail: null,
    userTasks: null,
  }),
  getters: {},
  mutations: {
    setUserUid(state, userUid) {
      state.userUid = userUid;
    },
    setUserEmail(state, userEmail) {
      state.userEmail = userEmail;
    },
    setUserTasks(state, userTasks) {
      state.userTasks = userTasks;
    },
  },
  actions: {},
  namespaced: true,
};
