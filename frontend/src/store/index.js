import { createStore } from 'vuex';
import auth from './modules/auth'; // 导入 auth 模块

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
  },
  modules: {
    auth, // 注册 auth 模块
  },
});