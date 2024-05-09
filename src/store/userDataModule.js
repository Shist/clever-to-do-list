export const userDataModule = {
  state: () => ({
    userUid: null,
    userEmail: null,
    userTasks: null,
    currUserTask: null,
  }),

  getters: {
    getTimeStampByTaskId: (state) => (taskId) => {
      return state.userTasks.find((task) => task.id === taskId)?.date;
    },
  },

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
    setCurrUserTask(state, currUserTask) {
      state.currUserTask = currUserTask;
    },
  },

  actions: {},

  namespaced: true,
};
