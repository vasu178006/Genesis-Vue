<template>
  <div class="bodyfont">
  <div class="app-container">
    <!-- Navbar -->
    <header class="navbar">
      <div class="logo">
        <img src="/images/Screenshot_2025-02-24_105300-removebg-preview.png" alt="TechBolt Logo" class="logo-img">
      </div>
      <nav>
        <div class="nav-item">
          <RouterLink to="/landing">Home</RouterLink>
        </div>
        <div class="nav-item">
          <RouterLink to="/gears">Gears</RouterLink>
        </div>
        <div class="nav-item">
         <RouterLink to="/Components">Components</RouterLink>
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
          <router-link to="/cart" class="cart-button">🛒</router-link>
          <RouterLink to="/user">👤</RouterLink>
        </div>
      </div>
    </header>

    <!-- Added Hero Section -->
    <section class="hero">
      <video width="200px" autoplay loop muted>
        <source src="/src/assets/video/laptops.mp4" type="video/mp4" />
      </video>
      <div class="hero-text">
        <h1 class="gradient-text">Powerful Laptops for Every Need</h1>
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
          <button class="add-to-cart" @click="addToCart(product)">Add to Cart</button>
        </div>
      </div>
    </section>
    <section class="brands">
      <img v-for="(brand, index) in brands" :key="index" :src="brand.image" :alt="brand.name">
    </section>
    <br>
    <!-- Footer -->
    <footer>
      <p>&copy; 2025 Genesis. All rights reserved.</p>
    </footer>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      hoveredProduct: null,
      searchQuery: '',
      showResults: false,
      products: [
        {
          name: 'Ultimate Flagship Gaming Laptop',
          description: 'Experience gaming perfection with our flagship build featuring the latest RTX 4090 and Intel Core i9-13900K. Perfect for 4K gaming and content creation.',
          image: '/images/beast.webp',
          badge: 'Gaming PC',
          price: '₹95,000',
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
          name: 'RTX 4090 Gaming Laptop',
          description: 'The most powerful consumer graphics card ever made. Features DLSS 3.0, ray tracing, and unmatched 4K gaming performance.',
          image: '/images/4090.png',
          badge: 'Component',
          price: '₹80,000',
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
          name: 'Mid-Range Gaming Laptop',
          description: 'Perfect balance of performance and value. Great for 1440p gaming and streaming.',
          image: '/images/mid.png',
          badge: 'Gaming PC',
          price: '₹70,000',
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
          name: 'Mid Range Laptop',
          description: 'High-performance multi-core processor for gaming and productivity.',
          image: '/images/vivobook.png',
          badge: 'Component',
          price: '₹50,000',
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
      brands: [
        { name: 'Logitech', image: '/images/logitech-gaming-2.webp' },
        { name: 'Razer', image: '/images/razer-logo-83F59A22CB-seeklogo.com.webp' },
        { name: 'ASUS', image: '/images/asus.webp' },
        { name: 'HyperX', image: '/images/hyperx-logo_brandlogos.net_w6acg-512x512.webp' },
        { name: 'Corsair', image: '/images/CORSAIRLogo2020_stack_W.webp' }
      ],
      items: {
        'Graphics Cards': '/Components',
        'Processors': '/Components',
        'Motherboards': '/Components',
        'Power Supplies': '/Components',
        'Gaming Mice': '/gears',
        'Keyboards': '/gears',
        'Monitors': '/gears',
        'Headsets': '/gears',
        'Laptops': '/laptops',
        'Storage': '/storage',
      }
    };
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
      this.searchResults = Object.keys(this.items).filter(item =>
        item.toLowerCase().includes(this.query.toLowerCase())
      );
    },
    navigateTo(item) {
      this.$router.push(this.items[item]);
    },
    goToCart() {
      this.$router.push('/cart');
    },
    addToCart(product) {
      try {
        // Get current cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Find if item already exists
        const existingItem = cart.find(item => item.name === product.name);
        
        if (existingItem) {
          // If item exists, increase quantity
          existingItem.quantity += 1;
        } else {
          // If item doesn't exist, add new item
          cart.push({
            name: product.name,
            price: parseFloat(product.price.replace('₹', '').replace(',', '')),
            quantity: 1,
            image: product.image,
            description: product.description
          });
        }
        
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update local cart state
        this.cart = cart;
        
        // Show success message
        alert(`${product.name} added to cart!`);
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Failed to add item to cart. Please try again.');
      }
    },
    loadCart() {
      try {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        this.cart = storedCart;
      } catch (error) {
        console.error('Error loading cart:', error);
        this.cart = [];
      }
    }
  },
  mounted() {
    this.loadCart();
  },
  watch: {
    cart: {
      handler(newCart) {
        localStorage.setItem('cart', JSON.stringify(newCart));
      },
      deep: true
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Aldrich&family=Orbitron:wght@400..900&display=swap');
.bodyfont{
  font-family:'Aldrich',sans-serif;
}
.app-container {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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

.icon-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 0.5rem;
  color: white;
}
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
.gradient-text {
  background: linear-gradient(90deg, #03a9f4, #f441a5);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
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