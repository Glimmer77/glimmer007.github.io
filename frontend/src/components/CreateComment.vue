<template>
  <v-container>
    <v-form @submit.prevent="createComment">
      <v-text-field
        v-model="content"
        label="评论内容"
        required
        outlined
        :rules="[contentRule]"
      ></v-text-field>
      <v-btn type="submit" color="success" :disabled="isSubmitting">
        {{ isSubmitting ? '提交中...' : '提交评论' }}
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  props: ['postId'],
  data() {
    return {
      content: '',
      isSubmitting: false,
      contentRule: value => !!value || '评论内容不能为空',
    };
  },
  methods: {
    async createComment() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('未登录，请先登录');
        return;
      }

      this.isSubmitting = true;

      try {
        await axios.post(
          `http://localhost:3000/api/comments/create/${this.postId}`,
          { content: this.content },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.$emit('comment-added');
        this.content = '';
        alert('评论提交成功');
      } catch (error) {
        alert(error.response?.data?.message || '提交失败，请稍后再试');
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: 20px auto;
}

v-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

v-text-field {
  width: 100%;
}

v-btn {
  align-self: flex-end;
}
</style>
