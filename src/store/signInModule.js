export const signInModule = {
  state: () => ({
    email: "",
    password: "",
  }),
  getters: {},
  mutations: {
    setEmail(state, email) {
      state.email = email;
    },
    setPassword(state, password) {
      state.password = password;
    },
  },
  actions: {},
  namespaced: true,
};
