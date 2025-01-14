// src/store/modules/auth.js
import axios from 'axios';

const state = {
  user: null,
  isAuthenticated: false,
  token: localStorage.getItem('token') || '', // 从 localStorage 获取 token
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
    state.isAuthenticated = !!user;  // 如果用户存在，则认为已认证
  },
  SET_TOKEN(state, token) {
    state.token = token;
    if (token) {
      state.isAuthenticated = true;
    } else {
      state.isAuthenticated = false;
    }
    localStorage.setItem('token', token); // 存储 token 到 localStorage
  },
  CLEAR_USER(state) {
    state.user = null;
    state.isAuthenticated = false;
    state.token = '';
    localStorage.removeItem('token'); // 移除 localStorage 中的 token
  }
};

const actions = {
  async login({ commit }, credentials) {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      const user = response.data.user;
      const token = response.data.token; // 假设返回的 token
      if (user && token) {
        commit('SET_USER', user);
        commit('SET_TOKEN', token); // 设置 token 和用户信息
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // 设置 token 到 axios 请求头
      }
    } catch (error) {
      console.error('登录失败:', error);
      throw error;
    }
  },

  async loadUserFromLocalStorage({ commit }) {
    const token = localStorage.getItem('token');
    if (token) {
      commit('SET_TOKEN', token); // 如果 token 存在，设置 token
      try {
        const response = await axios.get('/api/auth/userinfo', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const user = response.data.user;
        commit('SET_USER', user); // 设置用户信息
      } catch (error) {
        commit('CLEAR_USER'); // 如果加载用户失败，清除用户信息
        localStorage.removeItem('token');
      }
    }
  },

  logout({ commit }) {
    commit('CLEAR_USER'); // 清除用户信息
    axios.defaults.headers.common['Authorization'] = ''; // 清除 axios 请求头中的 token
  }
};

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user,
  token: state => state.token,
};

export default {
  state,
  mutations,
  actions,
  getters
};
