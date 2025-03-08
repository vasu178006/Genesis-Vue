<template>
  <div class="bodyfont">
   <div class="main-container">
    <header class="navbar">
      <div class="logo">
        <img src="/src/assets/images/Screenshot_2025-02-24_105300-removebg-preview.png" alt="TechBolt Logo" style="height: 50px; width: 110px;">
      </div>
      <nav class="main-nav">
        <div class="nav-item">
          <Router-link to="/Components">Components</Router-link>
        </div>
        <div class="nav-item">
          <Router-link to="/gears">Gears</Router-link>
        </div>
        <div class="nav-item">
         <RouterLink to="/laptops">Laptops</RouterLink>
        </div>
        <div class="nav-item">
          <RouterLink to="/storage">Storage</RouterLink>
        </div>
        <div class="nav-item">
          <RouterLink to="/peripherals">Peripherals</RouterLink>
        </div>
        <div class="nav-item">
          <RouterLink to="/about">About</RouterLink>
        </div>
      </nav>
      <div class="icons">
        <div class="search-bar">
          <input type="text" id="search" placeholder="Search..." v-model="searchQuery" @input="handleSearch">
          <div class="search-results" id="searchResults" v-show="showResults">
            <div v-for="(url, item) in filteredItems" :key="item" @click="navigateTo(url)">
              {{ item }}
            </div>
          </div>
          <router-link to="/cart" class="cart-button">🛒</router-link>
          <RouterLink to="/user">👤</RouterLink>
        </div>
      </div>
    </header>

    <section class="hero">
      <div class="hero-content">
        <div class="video-container">
          <video autoplay loop muted>
            <source src="/src/assets/video/videoplayback.mp4" type="video/mp4">
          </video>
        </div>
        <div class="hero-text">
          <h1 class="gradient-text">Upgrade to RTX 4090</h1>
          <p>Get the latest 4090 graphics cards and boost your gaming experience to the next level.</p>
          <RouterLink to="/Components"><button class="container">Shop Now</button></RouterLink>
        </div>
      </div>
    </section>

    <section class="categories">
      <div class="categories-header">
        <h2 class="gradient-text">Featured Categories</h2>
        <RouterLink to="/gears"><button class="container">Shop All</button></RouterLink>
      </div>
      <div class="category-list">
        <div class="package" v-for="(category, index) in categories" :key="index">
          <div class="package2 category-item">
            <img :src="category.image" :alt="category.title">
            <h3>{{ category.title }}</h3>
            <p>{{ category.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="brands">
      <img v-for="(brand, index) in brands" :key="index" :src="brand.image" :alt="brand.name">
    </section>

    <footer>
      <p>&copy; 2025 Genesis. All rights reserved.</p>
    </footer>
  </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'GenesisLandingPage',
  data() {
    return {
      searchQuery: '',
      showResults: false,
      items: {
        'Graphics Cards': 'graphics-cards.html',
        'Processors': 'processor.html',
        'Motherboards': 'motherboards.html',
        'Power Supplies': 'power-supplies.html',
        'Gaming Mice': 'gaming-mice.html',
        'Gaming Keyboards': 'gaming-keyboards.html',
        'Gaming Headsets': 'gaming-headsets.html',
        'Controllers': 'controllers.html',
        'Gaming Laptops': 'laptops.html',
        'Ultrabooks': 'ultrabooks.html',
        'Workstation Laptops': 'workstation-laptops.html',
        'SSD': 'ssd.html',
        'HDD': 'hdd.html',
        'External Drives': 'external-drives.html',
        'Monitors': 'monitors.html',
        'Keyboards': 'keyboards.html',
        'Mice': 'mice.html',
        'Headsets': 'headsets.html'
      },
      categories: [
        {
          title: 'Gaming Mice',
          description: 'Find the perfect mouse for your play style',
          image: '/src/assets/images/Landing mouse pic.png'
        },
        {
          title: 'Gaming Headsets',
          description: 'Hear every footstep and explosion with crystal clear audio',
          image: '/src/assets/images/landing headset pic.png'
        },
        {
          title: 'Gaming Keyboards',
          description: 'Get the competitive edge with responsive mechanical switches',
          image: '/src/assets/images/Landing keyboard pic.png'
        },
        {
          title: 'Graphics Cards',
          description: 'Experience lifelike graphics and smooth gameplay',
          image: '/src/assets/images/pd.webp'
        }
      ],
      brands: [
        { name: 'Logitech', image: '/src/assets/images/logitech-gaming-2.webp' },
        { name: 'Razer', image: '/src/assets/images/razer-logo-83F59A22CB-seeklogo.com.webp' },
        { name: 'ASUS', image: '/src/assets/images/asus.webp' },
        { name: 'HyperX', image: '/src/assets/images/hyperx-logo_brandlogos.net_w6acg-512x512.webp' },
        { name: 'Corsair', image: '/src/assets/images/CORSAIRLogo2020_stack_W.webp' }
      ]
    };
  },
  computed: {
  filteredItems() {
    const query = this.searchQuery.toLowerCase();
    if (!query) return this.items; // Return all items if query is empty

    return Object.keys(this.items)
      .filter(item => item.toLowerCase().includes(query))
      .reduce((obj, key) => {
        obj[key] = this.items[key];
        return obj;
      }, {});
  }
},
methods: {
  handleSearch() {
    this.showResults = this.searchQuery.length > 0;
  },
  navigateTo(url) {
    window.location.href = url;
  },
  addToCart(item) {
    try {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${item.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  },
  handleAddToCart(productItem) {
    const productName = productItem.querySelector('h3').textContent;
    const productDescription = productItem.querySelector('p')?.textContent || '';
    const productPrice = parseFloat(productItem.querySelector('.price')?.textContent.replace('$', '') || '0');

    this.addToCart({
      name: productName,
      description: productDescription,
      price: productPrice
    });
  }
},
mounted() {
  this.$nextTick(() => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    if (addToCartButtons) {
      addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
          const productItem = button.closest('.product-item');
          if (productItem) {
            this.handleAddToCart(productItem);
          }
        });
      });
    } else {
      console.warn('No .add-to-cart buttons found.');
    }
  });
  }
}
</script>;

<style scoped>
/* Global and Reset Styles */
@import url('https://fonts.googleapis.com/css2?family=Aldrich&family=Orbitron:wght@400..900&display=swap');
.bodyfont{
  font-family:'Aldrich',sans-serif;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


/* Navbar Layout - Fixed */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem; /* Increased padding for better visibility */
  background: #18141d;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  max-width: 100%;
}

.logo {
  flex-shrink: 0;
}

/* Main Navigation */
.main-nav {
  display: flex;
  gap: 1.5rem;
  margin: 0 auto;
  justify-content: center;
  flex-wrap: wrap;
}

.nav-item {
  position: relative;
}

.nav-item > a {
  color: white;
  text-decoration: none;
  font-weight: 600; /* Increased font weight for better visibility */
  padding: 0.5rem 1rem; /* Increased padding for better click area */
  display: inline-block;
  font-size: 16px; /* Increased font size */
}
.nav-item > a:hover {
  background-color: #9c74c21a; /* Light purple color */
  border-radius: 8px; /* Adding border radius */
  transition: background-color 0.3s ease; /* Smooth transition effect */
}
.dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: #18141d;
  padding: 0.5rem 0;
  border-radius: 8px;
  z-index: 100;
  min-width: 180px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.dropdown a {
  display: block;
  padding: 0.5rem 1rem;
  color: white;
  text-decoration: none;
  transition: background 0.2s;
  font-size: 14px;
}

.dropdown a:hover {
  background: #6a696b56;
  border-radius: 0.5;
}

.nav-item:hover .dropdown {
  display: block;
  border-radius: 5px;
}

/* Search Bar */
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-bar input {
  max-width: 150px;
  background-color: #1a1a1a;
  border: none;
  padding: 8px 10px;
  border-radius: 10px;
  outline: none;
  color: white;
  transition: box-shadow 0.3s ease, width 0.3s ease;
}

.search-bar input:focus {
  width: 180px;
  animation: rotateShadow 2s infinite linear;
}

@keyframes rotateShadow {
  0% {
    box-shadow: -2px -2px 8px 1px #aa00ff, 2px 2px 8px 1px #3700ff;
  }
  25% {
    box-shadow: -2px 2px 8px 1px #aa00ff, 2px -2px 8px 1px #3700ff;
  }
  50% {
    box-shadow: 2px 2px 8px 1px #aa00ff, -2px -2px 8px 1px #3700ff;
  }
  75% {
    box-shadow: 2px -2px 8px 1px #aa00ff, -2px 2px 8px 1px #3700ff;
  }
  100% {
    box-shadow: -2px -2px 8px 1px #aa00ff, 2px 2px 8px 1px #3700ff;
  }
}

.search-results {
  position: absolute;
  top: 40px;
  right: 0;
  background: #18141d;
  border-radius: 8px;
  z-index: 200;
  width: 180px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.search-results div {
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: white;
  transition: background 0.2s;
}

.search-results div:hover {
  background: #a855f7;
}

.search-bar button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: white;
  transition: transform 0.3s ease;
}

.search-bar button:hover {
  transform: scale(1.1);
}

/* Hero Section - Fixed */
.hero {
  padding: 0;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center; /* Vertically center the content */
  justify-content: center; /* Horizontally center the content */
  background: transparent;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: center; /* Center items horizontally */
  width: 100%;
  max-width: 1200px; /* Added max-width for better responsiveness */
  gap: 2rem; /* Added gap between video and text */
  padding: 2rem; /* Added padding for better spacing */
}

.video-container {
  width: 50%; /* Existing width */
  height: 350px; /* Existing height */
  overflow: hidden;
  position: relative;
  border-radius: 15px; /* Added border radius */
}
.video-container video {
  width: 100%;
  height: 350px;
  object-fit: cover; /* Ensures video covers the entire container */
  border-radius: 15px; /* Ensures video itself has rounded corners */
}

.hero-text {
  width: 45%; /* Set width to 45% for text */
  padding: 20px; /* Added padding for better spacing */
  text-align: left; /* Align text to the left */
  z-index: 10;
}

.hero-text h1 {
  font-size: 2.5rem; /* Adjusted font size */
  margin-bottom: 1rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
}

.gradient-text {
  background: linear-gradient(90deg, #03a9f4, #f441a5);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.hero-text p {
  font-size: 1rem; /* Adjusted font size */
  margin-bottom: 2rem;
  max-width: 600px;
  color: white;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.8);
}

/* Categories Section */
.categories {
  padding: 4rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.categories-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.categories-header h2 {
  font-size: 2rem;
}

.category-list {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

/* Package Cards */
.package {
  width: 230px;
  height: 300px;
  background-image: linear-gradient(163deg, #ff00ff 0%, #3700ff 100%);
  border-radius: 20px;
  text-align: center;
  transition: all 0.25s cubic-bezier(0, 0, 0, 1);
}

.package:hover {
  box-shadow: 0px 0px 30px 1px rgba(204, 0, 255, 0.3);
  transform: scale(1.02);
}

.package2 {
  width: 230px;
  height: 300px;
  background-color: #1d1724;
  border-radius: 18px;
  transition: all 0.25s cubic-bezier(0, 0, 0, 1);
  padding: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.package2:hover {
  transform: scale(0.98);
  border-radius: 18px;
}

.category-item img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 15px;
}

.category-item h3 {
  color: white;
  font-size: 18px;
  margin: 10px 0 5px;
}

.category-item p {
  color: #ccc;
  font-size: 14px;
  line-height: 1.4;
  max-width: 190px;
}

/* Brands Section */
.brands {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 3rem 2rem;
  background: #18141d;
  margin-top: 2rem;
}

.brands img {
  height: 40px;
  margin: 1rem 2rem;
  opacity: 0.7;
  transition: opacity 0.3s, transform 0.3s;
  filter: grayscale(100%);
}

.brands img:hover {
  opacity: 1;
  transform: scale(1.1);
  filter: grayscale(0%);
}

/* Button Styling */
button.container {
  position: relative;
  padding: 0.8em 1.6em;
  background: transparent; /* Removed blue background */
  border: 2px solid linear-gradient(90deg, #03a9f4, #f441a5); /* Optional: Add border if needed */
  border-radius: 0.9em;
  color: white;
  font-weight: bold;
  transition: all 0.4s ease;
  cursor: pointer;
}

button.container:hover {
  background: linear-gradient(90deg, #03a9f4, #f441a5); /* Optional: Add hover effect */
}

button.container:active {
  transform: scale(0.95);
}

/* Footer */
footer {
  text-align: center;
  padding: 2rem;
  background: #18141d;
  color: #999;
  margin-top: 2rem;
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .navbar {
    flex-wrap: wrap;
  }
  
  .main-nav {
    order: 3;
    width: 100%;
    margin-top: 1rem;
    justify-content: space-between;
  }
  
  .hero-content {
    flex-direction: column;
    text-align: center;
  }
  
  .video-container,
  .hero-text {
    width: 100%;
    max-width: 600px;
  }
  
  .hero-text {
    text-align: center;
    margin-top: 1rem;
  }
  
  .hero-text h1 {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .main-nav {
    gap: 0.8rem;
  }
  
  .hero-text h1 {
    font-size: 2rem;
  }
  
  .hero-text p {
    font-size: 1rem;
  }
  
  .video-container {
    height: 350px; /* Adjusted height */
  }
  
  .categories-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 0.5rem;
  }
  
  .main-nav {
    gap: 0.5rem;
  }
  
  .nav-item > a {
    font-size: 0.9rem;
  }
  
  .video-container {
    height: 200px; /* Adjusted height */
  }
  
  .hero-text h1 {
    font-size: 1.8rem;
  }
  
  .hero-text {
    bottom: 15%;
  }
}
</style>