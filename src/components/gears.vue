<template>
    <div class="bodyfont">
    <div>
      <header class="navbar">
        <div class="logo">
          <img src="/src/assets/images/Screenshot_2025-02-24_105300-removebg-preview.png" alt="TechBolt Logo" style="height: 50px; width: 110px;" />
        </div>
        <nav>
          <div class="nav-item">
          <Router-link to="/landing">Home</Router-link>
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
            <input type="text" v-model="query" placeholder="Search..." @input="handleSearch" />
            <div v-if="searchResults.length" class="search-results">
              <div v-for="result in searchResults" :key="result" @click="navigateTo(result)">{{ result }}</div>
            </div>
            <router-link to="/cart" class="cart-button">🛒</router-link>
            <RouterLink to="/user">👤</RouterLink>
          </div>
        </div>
      </header>
  
      <section class="hero">
        <video width="200px" autoplay loop muted>
          <source src="/src/assets/video/gearhero.mp4" type="video/mp4" />
        </video>
        <div class="hero-text">
          <h1 class="gradient-text">Level Up Your Game</h1>
          <p>Premium gaming peripherals for the competitive edge you deserve.</p>
        </div>
      </section>
      <section class="product-list">
        <h2>Results for "Gaming Peripherals"</h2>
        <br>
        <div class="products">
          <div 
            v-for="(product, index) in products" 
            :key="product.name" 
            class="product-card"
            :class="{ 'product-hover': hoveredProduct === index }"
            @mouseenter="hoveredProduct = index"
            @mouseleave="hoveredProduct = null"
          >
            <div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
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
        </div>
      </section>
      <section class="brands">
        <img v-for="(brand, index) in brands" :key="index" :src="brand.image" :alt="brand.name">
      </section>
      <br>
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
        query: '',
        searchResults: [],
        hoveredProduct: null,
        cart: [],
        products: [
          {
            name: 'Razer Huntsman V3 Pro',
            description: 'Premium optical mechanical gaming keyboard with customizable actuation points and Gen-3 optical switches for lightning-fast response.',
            price: '$249.99',
            image: '/src/assets/images/huntsman.webp',
            badge: 'Keyboard',
            specs: {
              'SWITCHES': 'Optical Gen-3',
              'ACTUATION': 'Adjustable 0.1-4.0mm',
              'POLLING RATE': '8000Hz',
              'LIGHTING': 'Per-key RGB Chroma',
              'BUILD': 'Aluminum Top Plate',
              'CONNECTIVITY': 'USB-C Detachable'
            }
          },
          {
            name: 'Logitech G Pro X Superlight 2',
            description: 'Ultra-lightweight wireless gaming mouse with HERO 2 sensor and zero-compromise performance for professional esports players.',
            price: '$159.99',
            image: '/src/assets/images/gpro.png',
            badge: 'Mouse',
            specs: {
              'SENSOR': 'HERO 2 32K DPI',
              'WEIGHT': '60g',
              'POLLING RATE': '4000Hz',
              'SWITCHES': 'Optical 100M Clicks',
              'BATTERY': '95hr Battery Life',
              'CONNECTIVITY': '2.4GHz LIGHTSPEED'
            }
          },
          {
            name: 'SteelSeries Arctis Nova Pro',
            description: 'Premium wireless gaming headset with multi-system connectivity, active noise cancellation, and hot-swappable batteries.',
            price: '$349.99',
            image: '/src/assets/images/novapro.webp',
            badge: 'Headset',
            specs: {
              'DRIVERS': '40mm High-Fidelity',
              'CONNECTIVITY': 'Wireless/Bluetooth/3.5mm',
              'BATTERY': 'Hot-swappable 20hr',
              'AUDIO': 'Spatial 360° Audio',
              'FEATURES': 'Active Noise Cancellation',
              'MIC': 'AI Noise Cancelling Mic'
            }
          },
          {
            name: 'ASUS ROG Azoth',
            description: 'Enthusiast-grade wireless gaming keyboard with tri-mode connectivity, OLED display, and hot-swappable mechanical switches.',
            price: '$249.99',
            image: '/src/assets/images/azoth.png',
            badge: 'Keyboard',
            specs: {
              'LAYOUT': '75% Compact',
              'SWITCHES': 'Hot-swappable NX Red',
              'CONNECTIVITY': '2.4GHz/Bluetooth/USB',
              'BATTERY': '2000mAh (90hr)',
              'FEATURES': 'OLED Display Panel',
              'LIGHTING': 'Per-key RGB Aura Sync'
            }
          },
          {
            name: 'Razer DeathAdder V3 Pro',
            description: 'Iconic ergonomic gaming mouse with Focus Pro 30K optical sensor and 90-hour battery life in an ultra-lightweight design.',
            price: '$149.99',
            image: '/src/assets/images/v3pro.webp',
            badge: 'Mouse',
            specs: {
              'SENSOR': 'Focus Pro 30K Optical',
              'WEIGHT': '63g',
              'POLLING RATE': '1000Hz (8000Hz Optional)',
              'SWITCHES': 'Optical Gen-3 90M Clicks',
              'BATTERY': '90hr Battery Life',
              'CONNECTIVITY': 'HyperSpeed Wireless'
            }
          },
          {
            name: 'HyperX Cloud Alpha Wireless',
            description: 'Premium wireless gaming headset with up to 300 hours of battery life and DTS Spatial Audio for immersive gaming experiences.',
            price: '$199.99',
            image: '/src/assets/images/cloudalpha.webp',
            badge: 'Headset',
            specs: {
              'DRIVERS': '50mm Dual Chamber',
              'BATTERY': '300hr Battery Life',
              'CONNECTIVITY': '2.4GHz Wireless',
              'FREQUENCY': '15Hz–21kHz',
              'FEATURES': 'DTS Spatial Audio',
              'MIC': 'Detachable Noise-cancelling'
            }
          },
          {
            name: 'Corsair K70 RGB TKL Champion',
            description: 'Tournament-ready tenkeyless mechanical keyboard with CORSAIR OPX optical-mechanical switches and 8,000Hz polling rate.',
            price: '$169.99',
            image: '/src/assets/images/k70.webp',
            badge: 'Keyboard',
            specs: {
              'LAYOUT': 'Tenkeyless (TKL)',
              'SWITCHES': 'CORSAIR OPX Optical',
              'POLLING RATE': '8000Hz',
              'LIGHTING': 'Per-key RGB iCUE',
              'FEATURES': 'Tournament Switch',
              'BUILD': 'Aircraft-grade Aluminum'
            }
          },
          {
            name: 'Logitech G733 LIGHTSPEED',
            description: 'Colorful wireless gaming headset with suspension headband, customizable RGB lighting, and advanced microphone technology.',
            price: '$149.99',
            image: '/src/assets/images/g733.webp',
            badge: 'Headset',
            specs: {
              'DRIVERS': 'PRO-G 40mm',
              'BATTERY': '29hr Battery Life',
              'CONNECTIVITY': 'LIGHTSPEED Wireless',
              'RANGE': '20m Range',
              'FEATURES': 'Blue VO!CE Mic Technology',
              'LIGHTING': 'Front-facing RGB Zones'
            }
          }
        ],
        brands: [
          { name: 'Logitech', image: '/src/assets/images/logitech-gaming-2.webp' },
          { name: 'Razer', image: '/src/assets/images/razer-logo-83F59A22CB-seeklogo.com.webp' },
          { name: 'ASUS', image: '/src/assets/images/ASUS logo white.webp' },
          { name: 'HyperX', image: '/src/assets/images/hyperx-logo_brandlogos.net_w6acg-512x512.webp' },
          { name: 'Corsair', image: '/src/assets/images/CORSAIRLogo2020_stack_W.webp' },
          { name: 'SteelSeries', image: '/src/assets/images/steelseries.png' }
        ],
        items: {
          'Keyboards': 'keyboards.html',
          'Mice': 'mice.html',
          'Headsets': 'headsets.html',
          'Mousepads': 'mousepads.html',
          'Controllers': 'controllers.html'
        }
      };
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
              price: parseFloat(product.price.replace('$', '').replace(',', '')),
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
  .gradient-text {
    background: linear-gradient(90deg, #03a9f4, #f441a5);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
    background-color: #0e0c11;
    color: white;
  }
  
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #18141d;
  }
  
  .logo img {
    height: 50px;
    width: 150px;
  }
  
  nav {
    display: flex;
    gap: 2rem;
  }
  
  .nav-item {
    position: relative;
  }
  
  .nav-item > a, .nav-item > Router-link {
    margin: 0 1rem;
    text-decoration: none;
    color: white;
    transition: all 0.3s;
    padding: 0.5rem;
  }
  
  .nav-item > a:hover, .nav-item > Router-link:hover {
    background-color: #a855f7;
    border-radius: 8px;
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
    background: #a857f58e;
    border-radius: 5px;
  }
  
  .nav-item:hover .dropdown {
    display: block;
  }
  
  .icons button {
    margin-left: 1rem;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: white;
  }
  
  .search-bar {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .search-bar input {
    max-width: 190px;
    background-color: #1a1a1a;
    border: none;
    padding: 10px;
    border-radius: 10px;
    outline: none;
    color: white;
    transition: box-shadow 0.3s ease;
  }
  
  .search-bar input:focus {
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
    left: 0;
    background: #18141d;
    border-radius: 8px;
    z-index: 200;
    width: 100%;
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
  
  .filters {
    display: flex;
    gap: 1rem;
    padding: 1rem 2rem;
  }
  
  .filters button {
    background-color: #a855f7;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  
  .product-list {
    padding: 2rem;
  }
  
  .products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 2rem;
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
    width: 100%;
    text-align: center;
  }
  
  .add-to-cart:hover {
    background: #9333ea;
  }
  
  footer {
    text-align: center;
    padding: 1rem;
    background-color: #18141d;
  }
  
  @media (max-width: 1024px) {
    .products {
      grid-template-columns: repeat(2, 1fr);
    }
    
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
    nav {
      margin: 1rem 0;
      flex-wrap: wrap;
      justify-content: center;
    }
    .products {
      grid-template-columns: 1fr;
    }
    .filters {
      flex-wrap: wrap;
    }
  }
  @media (max-width: 480px) {
    .product-image {
      height: 150px;
    }
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
  </style>