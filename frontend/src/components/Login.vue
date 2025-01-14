<template>
  <v-container>
    <v-form ref="loginForm" @submit.prevent="login">
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
      <v-btn type="submit" color="success" :disabled="!isValid">登录</v-btn>
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
      error: null,
      usernameRules: [
        v => !!v || '用户名不能为空',
      ],
      passwordRules: [
        v => !!v || '密码不能为空',
      ],
    };
  },
  computed: {
    isValid() {
      return this.username && this.password;
    }
  },
  methods: {
    ...mapActions(['setUser']),
    async login() {
      this.error = null;
      try {
        const response = await axios.post('http://localhost:3000/api/users/login', {
          username: this.username,
          password: this.password,
        });
        alert(response.data.message);
        localStorage.setItem('token', response.data.token);
        this.setUser({ token: response.data.token });
        this.$router.push('/posts');
      } catch (error) {
        this.error = error.response.data.message;
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