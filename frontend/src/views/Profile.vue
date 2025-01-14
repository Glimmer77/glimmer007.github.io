<template>
  <v-container>
    <!-- 我的帖子 -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline">我的帖子</v-card-title>
          <v-list>
            <v-list-item v-for="post in userPosts" :key="post._id" :to="`/posts/${post._id}`">
              <v-list-item-content>
                <v-list-item-title>{{ post.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ formatDate(post.publishDate) }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="editPost(post._id)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deletePost(post._id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-alert v-if="userPosts.length === 0" type="info" dismissible>
            您还没有发布任何帖子。
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'Profile',
  data() {
    return {
      userPosts: [],
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user']),
  },
  async created() {
    // 先从 Vuex 中加载用户信息
    if (!this.isAuthenticated) {
      await this.$store.dispatch('auth/loadUserFromLocalStorage');
    }

    // 如果用户仍未认证，跳转到登录页面
    if (this.isAuthenticated && this.user) {
      await this.fetchUserPosts();
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    async fetchUserPosts() {
  // 确保传递正确的用户 ID，避免 undefined
  const userId = this.user ? this.user._id : null;
  if (!userId) {
    console.error('用户ID未定义');
    return;
  }

  // 检查 userId 是否是一个有效的 24 位十六进制字符串
  if (typeof userId !== 'string' || userId.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(userId)) {
    console.error('用户ID格式不正确:', userId);
    alert('用户ID格式不正确');
    return;
  }

  try {
    const response = await axios.get(`http://localhost:3000/api/posts/user/${userId}`);
    if (response && response.data && Array.isArray(response.data.posts)) {
      this.userPosts = response.data.posts;
    } else {
      console.error('返回的帖子数据不符合预期:', response);
      this.userPosts = [];
    }
  } catch (error) {
    console.error('获取用户帖子失败:', error);
    alert(error.response ? error.response.data.message : error.message);
  }
},
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    editPost(postId) {
      // 跳转到编辑帖子的页面
      this.$router.push(`/posts/edit/${postId}`);
    },
    async deletePost(postId) {
      // 确认删除操作
      if (confirm('确定要删除这个帖子吗？')) {
        try {
          const response = await axios.delete(`http://localhost:3000/api/posts/${postId}`);
          if (response.status === 200) {
            this.userPosts = this.userPosts.filter(post => post._id !== postId);
            alert('帖子删除成功');
          } else {
            alert('删除帖子失败');
          }
        } catch (error) {
          console.error('删除帖子失败:', error);
          alert(error.response ? error.response.data.message : error.message);
        }
      }
    },
  },
};
</script>

<style scoped>
/* 个人资料卡片的标题 */
.headline {
  font-size: 1.25rem;
  font-weight: bold;
}

/* 修饰每个卡片的内容 */
v-card {
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 内容对齐和间距 */
v-card-text p {
  margin-bottom: 12px;
  font-size: 1rem;
  color: #444;
}

/* 让帖子列表中的每一项更加紧凑 */
v-list-item {
  margin-bottom: 12px;
}

v-alert {
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: center;
}

/* 页面总体布局 */
v-container {
  padding: 20px;
}

v-row {
  margin-top: 20px;
}
</style>