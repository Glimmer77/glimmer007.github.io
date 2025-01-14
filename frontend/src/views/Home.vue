<template>
  <v-container>
    <!-- 欢迎信息 -->
    <v-row>
      <v-col cols="12">
        <h1>欢迎来到在线社区论坛</h1>
        <p>在这里，你可以分享你的想法和经验，与其他用户交流。</p>
      </v-col>
    </v-row>
    <!-- 登录与注册按钮 -->
    <v-row>
      <v-col cols="12" sm="6" class="d-flex justify-center">
        <router-link to="/login">
          <v-btn color="success" class="mx-2">登录</v-btn>
        </router-link>
        <router-link to="/register">
          <v-btn color="info" class="mx-2">注册</v-btn>
        </router-link>
      </v-col>
    </v-row>

    <!-- 帖子列表和创建帖子卡片 -->
    <v-row>
      <!-- 帖子列表卡片 -->
      <v-col cols="12" md="6">
        <v-card class="mx-auto" max-width="400">
          <v-card-actions>
            <router-link to="/posts">
              <v-btn color="primary">查看帖子</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- 创建帖子卡片 -->
      <v-col cols="12" md="6">
        <v-card class="mx-auto" max-width="400">
          <v-card-actions>
            <router-link to="/create-post">
              <v-btn color="primary">创建帖子</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      isLoggedIn: false, // 假设这里是检查用户是否登录的标志
    };
  },
  mounted() {
    // 检查用户是否登录，更新isLoggedIn状态
    // 你可以根据你的认证系统来修改这个方法
    this.isLoggedIn = !!localStorage.getItem('userToken'); // 示例
  },
};
</script>

<style scoped>
/* 页面标题和描述 */
h1 {
  text-align: center;
  margin-bottom: 20px;
}

p {
  text-align: center;
  margin-bottom: 40px;
}

/* 登录与注册按钮 */
.v-row {
  margin-top: 20px;
}

/* 卡片的样式 */
.v-card {
  transition: transform 0.3s ease;
}

.v-card:hover {
  transform: translateY(-5px);
}

.v-card-title {
  font-size: 18px;
  font-weight: 600;
}

.v-btn {
  width: 100%;
  margin-top: 10px;
}

.mx-2 {
  margin-left: 10px;
  margin-right: 10px;
}

/* 小屏幕适配 */
@media (max-width: 600px) {
  .v-card {
    max-width: 100%;
  }
}
</style>
