<template>
  <v-container>
    <v-card v-if="post.title">
      <v-card-title>{{ post.title }}</v-card-title>

      <!-- 使用可选链防止 undefined 错误 -->
      <v-card-subtitle>作者: {{ post.userId?.username || '未知' }}</v-card-subtitle>

      <v-card-text>{{ post.content }}</v-card-text>

      <v-btn @click="likePost" color="primary" :disabled="loading">点赞 ({{ post.likes }})</v-btn>
    </v-card>

    <!-- 显示加载指示器 -->
    <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>

    <CommentList v-if="post._id" :postId="post._id" />
  </v-container>
</template>

<script>
import axios from 'axios';
import CommentList from './CommentList.vue';

export default {
  data() {
    return {
      post: {},
      loading: true, // 添加加载状态
    };
  },
  components: {
    CommentList,
  },
  async created() {
    try {
      const response = await axios.get(`http://localhost:3000/api/posts/${this.$route.params.id}`);
      this.post = response.data.post;
    } catch (error) {
      console.error('Error fetching post data:', error);
    } finally {
      this.loading = false; // 加载完成，关闭加载指示器
    }
  },
  methods: {
    async likePost() {
      const token = localStorage.getItem('token');
      try {
        await axios.post(`http://localhost:3000/api/likes/like/${this.post._id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.post.likes++;
      } catch (error) {
        console.error('Error liking the post:', error);
      }
    },
  },
};
</script>

<style scoped>
/* 给卡片和文本增加一些边距 */
.v-card {
  margin-top: 20px;
  padding: 20px;
}

.v-card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.v-card-subtitle {
  font-size: 1rem;
  color: #666;
}

.v-card-text {
  font-size: 1rem;
  color: #444;
}

.v-btn {
  margin-top: 10px;
  font-weight: bold;
}

.v-progress-circular {
  margin-top: 20px;
  display: block;
  text-align: center;
}

/* 优化按钮样式 */
.v-btn[disabled] {
  background-color: #dcdcdc;
}
</style>
