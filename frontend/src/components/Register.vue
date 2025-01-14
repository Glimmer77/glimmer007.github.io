<template>
  <v-container>
    <v-form ref="registerForm" @submit.prevent="register">
      <v-text-field
        v-model="username"
        label="用户名"
        required
        :rules="[usernameRules]"
        outlined
        dense
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="密码"
        type="password"
        required
        :rules="[passwordRules]"
        outlined
        dense
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="邮箱"
        required
        :rules="[emailRules]"
        outlined
        dense
      ></v-text-field>
      <v-btn type="submit" color="success" :disabled="!isValid">注册</v-btn>
      <div v-if="error" class="error">{{ error }}</div>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
      error: null,
      usernameRules: [
        v => !!v || '用户名不能为空',
      ],
      passwordRules: [
        v => !!v || '密码不能为空',
      ],
      emailRules: [
        v => !!v || '邮箱不能为空',
        v => /.+@.+\..+/.test(v) || '请输入有效的邮箱地址',
      ],
    };
  },
  computed: {
    isValid() {
      return this.username && this.password && this.email;
    }
  },
  methods: {
    ...mapActions(['setUser']),
    async register() {
      this.error = null;
      try {
        // 发起注册请求
        const response = await axios.post('http://localhost:3000/api/users/register', {
          username: this.username,
          password: this.password,
          email: this.email,
        });

        // 检查 API 响应是否有效
        if (response && response.data) {
          alert(response.data.message);
          this.$router.push('/login');
        } else {
          this.error = '服务器没有返回有效数据';
        }
      } catch (error) {
        // 添加更多错误处理
        if (error.response && error.response.data && error.response.data.message) {
          this.error = error.response.data.message;
        } else {
          this.error = '请求失败，请稍后再试';
        }
        console.error('注册失败:', error);
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.v-text-field {
  margin-bottom: 20px; /* 添加间距 */
}

.v-btn {
  width: 100%;
  margin-top: 20px; /* 让按钮更好看 */
}

.v-form {
  max-width: 400px;
  margin: auto;
}
</style>
