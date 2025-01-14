// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Profile from '../views/Profile.vue';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import PostList from '../components/PostList.vue';
import PostDetail from '../components/PostDetail.vue';
import CreatePost from '../components/CreatePost.vue';
import store from '../store';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/posts', name: 'PostList', component: PostList, meta: { requiresAuth: true } },
  { path: '/posts/:id', name: 'PostDetail', component: PostDetail, meta: { requiresAuth: true } },
  { path: '/create-post', name: 'CreatePost', component: CreatePost, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫：需要认证的路由需要检查是否已登录
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = store.getters.isAuthenticated; // 获取 Vuex 中的认证状态

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
