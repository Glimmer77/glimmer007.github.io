<template>
    <v-container>
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="comment in comments" :key="comment._id">
            <v-list-item-content>
              <v-list-item-title>{{ comment.userId.username }}</v-list-item-title>
              <v-list-item-subtitle>{{ comment.content }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <CreateComment :postId="postId" @comment-added="fetchComments" />
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import CreateComment from './CreateComment.vue';
  
  export default {
    props: ['postId'],
    data() {
      return {
        comments: [],
      };
    },
    components: {
      CreateComment,
    },
    async created() {
      await this.fetchComments();
    },
    methods: {
      async fetchComments() {
        try {
          const response = await axios.get(`http://localhost:3000/api/comments/${this.postId}`);
          this.comments = response.data.comments;
        } catch (error) {
          alert(error.response.data.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>

</style>