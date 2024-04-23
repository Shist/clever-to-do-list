export const burgerMenuModule = {
  state: () => ({
    menuIsOpened: false,
  }),
  getters: {},
  mutations: {
    setMenuIsOpened(state, menuIsOpened) {
      state.menuIsOpened = menuIsOpened;
    },
  },
  actions: {},
  namespaced: true,
};
