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

    <!-- Added Hero Section -->
    <section class="hero">
      <video width="200px" autoplay loop muted>
        <source src="/src/assets/video/13057075_3840_2160_24fps.mp4" type="video/mp4" />
      </video>
      <div class="hero-text">
        <h1>Powerful Laptops for Every Need</h1>
        <p>Find the perfect laptop for gaming, work, or everyday use.</p>
      </div>
    </section>

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
        <div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
        <div class="product-image">
          <img :src="product.image" :alt="product.name">
        </div>
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          
          <div class="specs-section">
            <h4>Key Specs:</h4>
            <div class="specs-grid">
              <div v-for="(spec, key) in product.specs" :key="key" class="spec-item">
                <div class="spec-label">{{ key }}:</div>
                <div class="spec-value">{{ spec }}</div>
              </div>
            </div>
          </div>
          
          <div class="product-price">{{ product.price }}</div>
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
          name: 'Ultimate Gaming Beast PC',
          description: 'Experience gaming perfection with our flagship build featuring the latest RTX 4090 and Intel Core i9-13900K. Perfect for 4K gaming and content creation.',
          image: '/images/gaming_pc_blue.webp',
          badge: 'Gaming PC',
          price: '$2999.99',
          specs: {
            'CPU': 'Intel Core i9-13900K (24 cores, up to 5.80GHz)',
            'GPU': 'NVIDIA RTX 4090 24GB GDDR6X',
            'RAM': '32GB DDR5 6000MHz RGB',
            'STORAGE': '2TB NVMe Gen4 SSD',
            'MOTHERBOARD': 'ASUS ROG Maximus Z790',
            'COOLING': '360mm AIO Liquid Cooler',
            'PSU': '1000W 80+ Platinum'
          }
        },
        {
          name: 'RTX 4090 Gaming GPU',
          description: 'The most powerful consumer graphics card ever made. Features DLSS 3.0, ray tracing, and unmatched 4K gaming performance.',
          image: '/images/rtx_4090.webp',
          badge: 'Component',
          price: '$1599.99',
          specs: {
            'MEMORY': '24GB GDDR6X',
            'BOOST CLOCK': '2.52 GHz',
            'CUDA CORES': '16384',
            'RAY TRACING': '3rd Gen RT Cores',
            'DLSS': 'DLSS 3.0 Support',
            'POWER': '450W TDP'
          }
        },
        {
          name: 'Mid-Range Gaming PC',
          description: 'Perfect balance of performance and value. Great for 1440p gaming and streaming.',
          image: '/images/gaming_pc_mid.webp',
          badge: 'Gaming PC',
          price: '$1499.99',
          specs: {
            'CPU': 'AMD Ryzen 7 7800X3D',
            'GPU': 'NVIDIA RTX 4070 12GB',
            'RAM': '16GB DDR5 5200MHz',
            'STORAGE': '1TB NVMe SSD',
            'MOTHERBOARD': 'MSI B650 Gaming',
            'COOLING': '240mm AIO Liquid Cooler',
            'PSU': '750W 80+ Gold'
          }
        },
        {
          name: 'AMD Ryzen 7 CPU',
          description: 'High-performance multi-core processor for gaming and productivity.',
          image: '/images/ryzen_cpu.webp',
          badge: 'Component',
          price: '$349.99',
          specs: {
            'CORES/THREADS': '8 Cores / 16 Threads',
            'BASE CLOCK': '3.8 GHz',
            'BOOST CLOCK': '5.0 GHz',
            'CACHE': '32MB L3 Cache',
            'TDP': '65W',
            'SOCKET': 'AM5'
          }
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

/* Added Hero Section Styles */
.hero {
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero video {
  width: 58%;
  border-radius: 12px;
}

.hero-text {
  max-width: 40%;
}

.hero-text h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* Store Header */
.store-header {
  background-color: #18141d;
  padding: 1rem 2rem;
  border-bottom: 1px solid #2d2638;
}

.store-header h1 {
  color: white;
  margin-bottom: 1rem;
}

.category-tabs {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.tab-btn {
  padding: 0.5rem 1rem;
  background: #2d2638;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  color: white;
}

.tab-btn.active {
  background: #a855f7;
  color: white;
}

.cart-icon {
  margin-left: auto;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: white;
}

/* Product List */
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  padding: 2rem;
  flex-grow: 1;
}

.product-card {
  background: #18141d;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}

.product-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #a855f7;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 2;
}

.product-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
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
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.product-description {
  color: #ccc;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1.4;
}

.specs-section {
  margin: 1rem 0;
}

.specs-section h4 {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: white;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.5rem;
  font-size: 0.85rem;
}

.spec-item {
  display: flex;
  gap: 0.3rem;
}

.spec-label {
  font-weight: bold;
  color: #a855f7;
  min-width: 85px;
}

.spec-value {
  color: #ccc;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin: 1rem 0;
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
  width: 100%;
  text-align: center;
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

/* Added responsive styles for hero section */
@media (max-width: 1024px) {
  .hero {
    flex-direction: column;
  }
  
  .hero video, .hero-text {
    width: 100%;
    max-width: 100%;
  }
  
  .hero-text {
    margin-top: 2rem;
    text-align: center;
  }
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
  
  .specs-grid {
    grid-template-columns: 1fr;
  }
}
</style>