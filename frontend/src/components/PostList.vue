<template>
  <v-container>
    <!-- 加载中的圆形进度条 -->
    <v-progress-circular v-if="loading" indeterminate color="primary" class="my-5"></v-progress-circular>

    <!-- 加载完成后的帖子列表 -->
    <v-list v-else>
      <!-- 如果没有帖子，显示提示和创建帖子按钮 -->
      <div v-if="posts.length === 0">
        <v-alert type="info" dismissible>
          当前没有帖子，快来创建一个吧！
        </v-alert>
        <!-- 创建帖子按钮 -->
        <v-btn color="primary" @click="goToCreatePost">
          创建帖子
        </v-btn>
      </div>

      <v-list-item-group v-if="posts.length > 0">
        <v-list-item v-for="post in posts" :key="post._id" :to="`/posts/${post._id}`">
          <v-list-item-content>
            <v-list-item-title class="post-title">{{ post.title }}</v-list-item-title>
            <v-list-item-subtitle class="post-content">{{ post.content }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      loading: true,
    };
  },
  async created() {
    try {
      // 发送请求，获取帖子列表
      const response = await axios.get('http://localhost:3000/api/posts/list');
      // 检查响应数据
      if (response && response.data && Array.isArray(response.data.posts)) {
        this.posts = response.data.posts;
      } else {
        throw new Error('无效的帖子数据');
      }
    } catch (error) {
      // 错误处理，捕获并显示错误信息
      console.error('获取帖子列表失败:', error);
      alert('无法加载帖子列表，请稍后再试。');
    } finally {
      this.loading = false;
    }
  },
  methods: {
    // 跳转到创建帖子页面
    goToCreatePost() {
      this.$router.push('/create-post');  // 假设创建帖子的页面路由是 /create-post
    }
  }
};
</script>

<style scoped>
/* 整体容器的边距和对齐 */
.v-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 加载中的进度条 */
.v-progress-circular {
  display: block;
  margin: 0 auto;
}

/* 帖子标题样式 */
.post-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
}

/* 帖子内容样式 */
.post-content {
  font-size: 14px;
  color: #7f8c8d;
}

/* 帖子项的背景色 */
.v-list-item {
  background-color: #fafafa;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

/* 鼠标悬停时的动画效果 */
.v-list-item:hover {
  transform: translateY(-5px);
}

/* 列表项的间距 */
.v-list-item-content {
  padding: 15px;
}

/* 边框圆角和间距 */
.v-list-item-group {
  margin-top: 20px;
}

/* 手机端和小屏幕的自适应样式 */
@media (max-width: 600px) {
  .post-title {
    font-size: 18px;
  }
  .post-content {
    font-size: 12px;
  }
}
</style>
