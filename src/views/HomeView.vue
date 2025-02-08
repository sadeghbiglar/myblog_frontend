<template>
    <div>
      <h1>لیست پست‌ها</h1>
      <!-- بررسی اینکه پست‌ها دریافت شدند -->
      <div v-if="posts.length > 0">
        <div v-for="post in posts" :key="post.id">
          <h2><router-link :to="'/post/' + post.id">{{ post.title }}</router-link></h2>
          <p>{{ post.content.substring(0, 100) }}...</p>
          <button @click="likePost(post.id)">❤️ {{ post.likes }}</button>
        </div>
      </div>
      <div v-else>
        <p>پستی برای نمایش وجود ندارد.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        posts: [], // برای ذخیره پست‌ها
      };
    },
    mounted() {
      this.fetchPosts(); // درخواست برای دریافت پست‌ها
    },
    methods: {
      fetchPosts() {
        axios
          .get('http://127.0.0.1:8000/api/posts')
          .then((response) => {
            this.posts = response.data.data; // ذخیره پست‌ها در data
          })
          .catch((error) => {
            console.error('Error fetching posts:', error);
          });
      },
      likePost(postId) {
        axios
          .post(`http://127.0.0.1:8000/api/posts/${postId}/like`)
          .then((response) => {
            // بروزرسانی تعداد لایک‌ها
            this.posts = this.posts.map((post) => {
              if (post.id === postId) {
                post.likes = response.data.likes;
              }
              return post;
            });
          })
          .catch((error) => {
            console.error('Error liking post:', error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  /* اینجا می‌تونی استایل‌های دلخواه رو قرار بدی */
  </style>
  