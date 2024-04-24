export const signUpModule = {
  state: () => ({
    email: "",
    password: "",
    repeatPassword: "",
  }),
  getters: {},
  mutations: {
    setEmail(state, email) {
      state.email = email;
    },
    setPassword(state, password) {
      state.password = password;
    },
    setRepeatPassword(state, repeatPassword) {
      state.repeatPassword = repeatPassword;
    },
  },
  actions: {},
  namespaced: true,
};
