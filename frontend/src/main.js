import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles.css';
import { createVuetify } from 'vuetify'; // 正确导入 Vuetify 创建方法
import 'vuetify/styles'; // 引入样式
import * as components from 'vuetify/components'; // 确保引入所有组件
import * as directives from 'vuetify/directives'; // 确保引入所有指令

// 创建 Vuetify 实例
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    dark: true, // 可根据需要选择暗色模式
  },
});

const app = createApp(App);

// 使用 Vuetify 实例
app.use(router);
app.use(store);
app.use(vuetify);  // 使用创建的 vuetify 实例
app.mount('#app');