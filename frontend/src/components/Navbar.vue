<template>
  <v-app-bar app>
    <v-toolbar-title>在线社区论坛</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/" text>首页</v-btn>
    <v-btn to="/posts" text>帖子列表</v-btn>
    <v-btn to="/register" text>注册</v-btn>
    <v-btn to="/login" text>登录</v-btn>
    <v-btn to="/create-post" text>创建帖子</v-btn>
    <!-- 新添加的个人资料按钮 -->
    <v-btn to="/profile" text>个人资料</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
/* 设置导航栏的样式 */
.v-app-bar {
  background-color: #1976D2; /* 蓝色背景 */
  color: white; /* 白色文字 */
}

.v-btn {
  margin-right: 15px; /* 按钮间距 */
  font-size: 16px; /* 设置按钮字体大小 */
}

.v-toolbar-title {
  font-size: 20px; /* 设置标题字体大小 */
  font-weight: bold; /* 设置标题为粗体 */
}

.v-spacer {
  flex-grow: 1;
}

.v-btn:hover {
  background-color: #1565C0; /* 鼠标悬停时按钮背景变色 */
  color: white; /* 悬停时文字颜色为白色 */
}
</style>
