<template>
    <div>
      <!-- Header -->
      <header class="header">
        <div class="top-bar">
          <p>Welcome to My Blog!</p>
        </div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
  
      <!-- Main Content -->
      <div class="main-content">
        <!-- Left Column: Site Visits -->
        <div class="left-column">
          <h3>Website Visits</h3>
          <p>{{ siteVisits }} Visitors</p>
        </div>
  
        <!-- Center Column: Blog Posts -->
        <div class="center-column">
          <h1>Blog Posts</h1>
          <div v-for="post in posts" :key="post.id" class="post-card">
            <h2><router-link :to="'/post/' + post.id">{{ post.title }}</router-link></h2>
            <img :src="post.image_url" alt="Post Image" class="post-image" />
            <p>{{ post.content.substring(0, 100) }}...</p>
            <button @click="likePost(post.id)">❤️ {{ post.likes }}</button>
          </div>
        </div>
  
        <!-- Right Column: Latest Posts -->
        <div class="right-column">
          <h3>Latest Posts</h3>
          <ul>
            <li v-for="post in latestPosts" :key="post.id">
              <router-link :to="'/post/' + post.id">{{ post.title }}</router-link>
            </li>
          </ul>
        </div>
      </div>
  
      <!-- Footer -->
      <footer class="footer">
        <p>&copy; 2025 My Blog. All Rights Reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        posts: [],
        siteVisits: 1000, // تعداد بازدید سایت (شما می‌تونید این رو از API بگیرید)
        latestPosts: [],
      };
    },
    mounted() {
      this.fetchPosts();
      this.fetchLatestPosts();
    },
    methods: {
      fetchPosts() {
        axios
          .get('http://127.0.0.1:8000/api/posts')
          .then((response) => {
            this.posts = response.data.data;
          })
          .catch((error) => {
            console.error('Error fetching posts:', error);
          });
      },
      fetchLatestPosts() {
        axios
          .get('http://127.0.0.1:8000/api/posts')
          .then((response) => {
            this.latestPosts = response.data.data.slice(0, 10); // 10 پست آخر
          })
          .catch((error) => {
            console.error('Error fetching latest posts:', error);
          });
      },
      likePost(postId) {
        axios
          .post(`http://127.0.0.1:8000/api/posts/${postId}/like`)
          .then((response) => {
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
  /* Global Styles */
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    box-sizing: border-box;
  }
  
  /* Header Styles */
  .header {
    background-color: #333;
    color: white;
    padding: 20px 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
  }
  
  .top-bar {
    background-color: #444;
    text-align: center;
    color: #fff;
    padding: 10px;
  }
  
  nav ul {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 10px 0;
  }
  
  nav ul li {
    list-style-type: none;
  }
  
  nav ul li a {
    color: white;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #555;
    transition: background-color 0.3s;
  }
  
  nav ul li a:hover {
    background-color: #777;
  }
  
  /* Main Content Styles */
  .main-content {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    gap: 20px;
    margin-top: 100px; /* ایجاد فاصله از هدر ثابت */
    width: 100%;
  }
  
  .left-column,
  .right-column,
  .center-column {
    width: 33.33%; /* تغییر عرض ستون‌ها به 33.33% */
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .center-column {
    flex: 1;
  }
  
  .post-card {
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  .post-card img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-top: 10px;
  }
  
  button {
    background-color: #ff5722;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #e64a19;
  }
  
  /* Footer Styles */
  .footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 10px 0;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  
  /* Responsive Design */
  @media (max-width: 1024px) {
    .main-content {
      flex-direction: column;
    }
  
    .left-column,
    .right-column,
    .center-column {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    .header nav ul {
      flex-direction: column;
    }
  }
  </style>
  