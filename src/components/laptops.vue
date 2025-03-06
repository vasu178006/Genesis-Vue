<template>
    <div class="app-container">
      <!-- Navbar -->
      <header class="navbar">
        <div class="logo">
          <img src="/src/assets/images/Screenshot_2025-02-24_105300-removebg-preview.png" alt="TechBolt Logo" class="logo-img">
        </div>
        <nav>
          <div v-for="(category, index) in categories" :key="index" class="nav-item">
            <a href="#">{{ category.name }}</a>
            <div class="dropdown">
              <a v-for="(item, idx) in category.items" :key="idx" :href="item.link">{{ item.name }}</a>
            </div>
          </div>
        </nav>
        <div class="icons">
          <div class="search-bar">
            <input type="text" id="search" placeholder="Search..." v-model="searchQuery" @input="handleSearch">
            <div class="search-results" v-show="showResults">
              <div 
                v-for="(link, item) in filteredItems" 
                :key="item" 
                @click="navigateTo(link)"
                class="search-result-item"
              >
                {{ item }}
              </div>
            </div>
            <button @click="navigateTo('cart.html')" class="icon-btn">🛒</button>
            <button class="icon-btn">👤</button>
          </div>
        </div>
      </header>
  
      <!-- Products Section -->
      <section class="product-list">
        <div 
          v-for="(product, index) in products" 
          :key="index" 
          class="product-card"
          :class="{ 'product-hover': hoveredProduct === index }"
          @mouseenter="hoveredProduct = index"
          @mouseleave="hoveredProduct = null"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.name">
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <button class="add-to-cart" @click="addToCart(product.name)">Add to Cart</button>
          </div>
        </div>
      </section>
  
      <!-- Footer -->
      <footer>
        <p>&copy; 2025 Genesis. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        hoveredProduct: null,
        searchQuery: '',
        showResults: false,
        categories: [
          {
            name: 'PC Components',
            items: [
              { name: 'Graphics Cards', link: 'graphics-cards.html' },
              { name: 'Processors', link: 'processor.html' },
              { name: 'Motherboards', link: 'motherboards.html' },
              { name: 'Power Supplies', link: 'power-supplies.html' }
            ]
          },
          {
            name: 'Gaming Gear',
            items: [
              { name: 'Gaming Mice', link: 'gaming-mice.html' },
              { name: 'Gaming Keyboards', link: 'gaming-keyboards.html' },
              { name: 'Gaming Headsets', link: 'gaming-headsets.html' },
              { name: 'Controllers', link: 'controllers.html' }
            ]
          },
          {
            name: 'Laptops',
            items: [
              { name: 'Gaming Laptops', link: 'laptops.html' },
              { name: 'Ultrabooks', link: 'ultrabooks.html' },
              { name: 'Workstation Laptops', link: 'workstation-laptops.html' }
            ]
          },
          {
            name: 'Storage',
            items: [
              { name: 'SSD', link: 'ssd.html' },
              { name: 'HDD', link: 'hdd.html' },
              { name: 'External Drives', link: 'external-drives.html' }
            ]
          },
          {
            name: 'Peripherals',
            items: [
              { name: 'Monitors', link: 'monitors.html' },
              { name: 'Webcams', link: 'webcams.html' },
              { name: 'Speakers', link: 'speakers.html' }
            ]
          }
        ],
        products: [
          {
            name: 'Gaming Laptop',
            description: 'Powerful performance for your gaming adventures.',
            image: 'images/gaming_laptop.webp'
          },
          {
            name: 'Ultrabook',
            description: 'Lightweight and sleek for on-the-go productivity.',
            image: 'images/ultrabook.webp'
          },
          {
            name: 'Workstation Laptop',
            description: 'Optimized for heavy tasks and professional use.',
            image: 'images/workstation_laptop.webp'
          }
        ],
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
        }
      }
    },
    computed: {
      filteredItems() {
        const query = this.searchQuery.toLowerCase();
        const result = {};
        
        if (query) {
          Object.keys(this.items).forEach(item => {
            if (item.toLowerCase().includes(query)) {
              result[item] = this.items[item];
            }
          });
        }
        
        return result;
      }
    },
    methods: {
      handleSearch() {
        this.showResults = !!this.searchQuery;
      },
      navigateTo(url) {
        window.location.href = url;
      },
      addToCart(item) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${item} added to cart!`);
      }
    }
  }
  </script>
  
  <style scoped>
  .app-container {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
    background-color: #0e0c11;
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #18141d;
  }
  
  .logo-img {
    height: 50px;
    width: 110px;
  }
  
  .navbar nav {
    display: flex;
    gap: 2rem;
  }
  
  .nav-item {
    position: relative;
  }
  
  .nav-item a {
    color: white;
    text-decoration: none;
    padding: 0.5rem;
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
  }
  
  .dropdown a {
    display: block;
    padding: 0.5rem 1rem;
    color: white;
    text-decoration: none;
  }
  
  .dropdown a:hover {
    background: #a855f7;
  }
  
  .nav-item:hover .dropdown {
    display: block;
  }
  
  .search-bar {
    display: flex;
    align-items: center;
    position: relative;
  }
  
  .search-bar input {
    padding: 0.5rem;
    border-radius: 4px;
    border: none;
    margin-right: 0.5rem;
  }
  
  .search-results {
    position: absolute;
    top: 100%;
    left: 0;
    background: #18141d;
    border-radius: 4px;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    z-index: 101;
  }
  
  .search-result-item {
    padding: 0.5rem;
    cursor: pointer;
  }
  
  .search-result-item:hover {
    background: #a855f7;
  }
  
  .icon-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    margin-left: 0.5rem;
    color: white;
  }
  
  .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
    flex-grow: 1;
  }
  
  .product-card {
    background: #18141d;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .product-hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
  }
  
  .product-image {
    width: 100%;
    overflow: hidden;
  }
  
  .product-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .product-hover .product-image img {
    transform: scale(1.05);
  }
  
  .product-info {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  .product-info h3 {
    margin-top: 0;
    color: #a855f7;
  }
  
  .product-info p {
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }
  
  .add-to-cart {
    padding: 0.7rem 1.2rem;
    background: #a855f7;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;
    font-weight: bold;
    align-self: flex-start;
  }
  
  .add-to-cart:hover {
    background: #9333ea;
  }
  
  footer {
    text-align: center;
    padding: 1rem;
    background: #18141d;
    margin-top: auto;
  }
  
  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
      padding: 1rem;
    }
    
    .navbar nav {
      margin: 1rem 0;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .product-list {
      grid-template-columns: 1fr;
    }
  }
  </style>