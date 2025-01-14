<template>
    <v-container>
      <v-form @submit.prevent="createPost">
        <v-text-field
          v-model="title"
          label="标题"
          required
        ></v-text-field>
        <v-textarea
          v-model="content"
          label="内容"
          required
        ></v-textarea>
        <v-btn type="submit" color="success">创建帖子</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        title: '',
        content: '',
      };
    },
    methods: {
      async createPost() {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.post('http://localhost:3000/api/posts/create', {
            title: this.title,
            content: this.content,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          alert(response.data.message);
          this.$router.push('/posts');
        } catch (error) {
          alert(error.response.data.message);
        }
      },
    },
  };
  </script>
  
  <style>
  /* 添加样式 */
  </style>