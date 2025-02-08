<template>
    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>
      <h3>نظرات</h3>
      <div v-for="comment in comments" :key="comment.id">
        <p><strong>{{ comment.author }}:</strong> {{ comment.content }}</p>
      </div>
      <h3>ارسال نظر جدید</h3>
      <input v-model="newComment.author" placeholder="نام شما" />
      <textarea v-model="newComment.content" placeholder="متن نظر"></textarea>
      <button @click="submitComment">ارسال</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        post: null,
        comments: [],
        newComment: {
          author: '',
          content: '',
        },
      };
    },
    mounted() {
      const postId = this.$route.params.id;
      axios.get(`http://127.0.0.1:8000/api/posts/${postId}`).then((response) => {
        this.post = response.data;
      });
  
      axios.get(`http://127.0.0.1:8000/api/posts/${postId}/comments`).then((response) => {
        this.comments = response.data;
      });
    },
    methods: {
      submitComment() {
        const postId = this.$route.params.id;
        axios
          .post(`http://127.0.0.1:8000/api/posts/${postId}/comments`, this.newComment)
          .then((response) => {
            this.comments.push(response.data);
            this.newComment.author = '';
            this.newComment.content = '';
          });
      },
    },
  };
  </script>
  