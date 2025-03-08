<template>
    <div class="bodyfont">
      <div>
        <header class="navbar">
          <div class="logo">
            <img src="/images/Screenshot_2025-02-24_105300-removebg-preview.png" alt="TechBolt Logo" style="height: 50px; width: 110px;" />
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
            <source src="/src/assets/video/peri.mp4" type="video/mp4" />
          </video>
          <div class="hero-text">
            <h1 class="gradient-text">Ultimate Peripherals</h1>
            <p>Premium monitors, microphones, and webcams to complete your gaming and creative setup.</p>
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
            name: 'ASUS ROG Swift OLED PG27AQDM',
            description: 'Premium 27-inch OLED gaming monitor with lightning-fast response time and vibrant colors for immersive gaming.',
            price: '$899.99',
            image: '/images/rogswift.webp',
            badge: 'Monitor',
            specs: {
              'PANEL': '27" OLED',
              'RESOLUTION': '2560 x 1440 (QHD)',
              'REFRESH RATE': '240Hz',
              'RESPONSE TIME': '0.03ms',
              'HDR': 'HDR10',
              'INPUTS': '2x HDMI 2.0, 1x DisplayPort 1.4'
            }
          },
          {
            name: 'Samsung Odyssey G9 G95NC',
            description: 'Ultra-wide 49-inch curved OLED gaming monitor with Dual QHD resolution for panoramic immersion.',
            price: '$1,799.99',
            image: '/images/odyssey.webp',
            badge: 'Monitor',
            specs: {
              'PANEL': '49" OLED Curved',
              'RESOLUTION': '5120 x 1440 (DQHD)',
              'REFRESH RATE': '240Hz',
              'RESPONSE TIME': '0.03ms',
              'CURVATURE': '1800R',
              'INPUTS': '2x HDMI 2.1, 1x DisplayPort 2.1'
            }
          },
          {
            name: 'Shure SM7B',
            description: 'Professional dynamic microphone with smooth, flat frequency response for broadcasting, podcasting, and studio recording.',
            price: '$399.99',
            image: '/images/shure.webp',
            badge: 'Microphone',
            specs: {
              'TYPE': 'Dynamic',
              'PATTERN': 'Cardioid',
              'FREQUENCY RESP': '50 to 20,000 Hz',
              'IMPEDANCE': '150 ohms',
              'FEATURES': 'Air suspension, Pop filter',
              'CONNECTION': 'XLR'
            }
          },
          {
            name: 'HyperX QuadCast S',
            description: 'USB condenser gaming microphone with customizable RGB lighting and built-in anti-vibration shock mount.',
            price: '$159.99',
            image: '/images/quadcast.webp',
            badge: 'Microphone',
            specs: {
              'TYPE': 'Condenser',
              'PATTERNS': 'Stereo, Omni, Cardioid, Bi-directional',
              'SAMPLING RATE': '48kHz/16-bit',
              'FREQUENCY RESP': '20Hz - 20kHz',
              'LIGHTING': 'Customizable RGB',
              'CONNECTION': 'USB-C'
            }
          },
          {
            name: 'LG UltraGear 27GR95QE',
            description: 'Fast 27-inch OLED gaming monitor with 240Hz refresh rate and ultra-low response time for competitive gaming.',
            price: '$799.99',
            image: '/images/ug.webp',
            badge: 'Monitor',
            specs: {
              'PANEL': '27" OLED',
              'RESOLUTION': '2560 x 1440 (QHD)',
              'REFRESH RATE': '240Hz',
              'RESPONSE TIME': '0.03ms',
              'HDR': 'HDR10',
              'INPUTS': '2x HDMI 2.1, 1x DisplayPort 1.4'
            }
          },
          {
            name: 'Logitech Brio 4K Pro',
            description: 'Ultra HD webcam with 4K resolution, HDR, and advanced auto-focus for crystal-clear video streaming and conferencing.',
            price: '$199.99',
            image: '/images/brio.webp',
            badge: 'Webcam',
            specs: {
              'RESOLUTION': '4K Ultra HD (4096 x 2160)',
              'FRAME RATE': '90 fps (1080p)',
              'FOV': 'Adjustable 65°, 78°, 90°',
              'FEATURES': 'HDR, Auto-focus, 5x zoom',
              'MICROPHONE': 'Dual omnidirectional',
              'CONNECTION': 'USB-C'
            }
          },
          {
            name: 'Elgato Wave:3',
            description: 'Premium USB condenser microphone with digital mixer and proprietary anti-distortion technology for content creators.',
            price: '$149.99',
            image: '/images/elgato.webp',
            badge: 'Microphone',
            specs: {
              'TYPE': 'Condenser',
              'PATTERN': 'Cardioid',
              'SAMPLING RATE': '96kHz/24-bit',
              'FREQUENCY RESP': '70Hz - 20kHz',
              'FEATURES': 'Clipguard, Wave Link software',
              'CONNECTION': 'USB-C'
            }
          },
          {
            name: 'Razer Kiyo Pro',
            description: 'High-performance webcam with adaptive light sensor and uncompressed 1080p 60FPS video for professional streaming.',
            price: '$179.99',
            image: '/images/kiyo.webp',
            badge: 'Webcam',
            specs: {
              'RESOLUTION': 'Full HD 1080p',
              'FRAME RATE': '60 fps (HDR off), 30 fps (HDR on)',
              'FOV': 'Adjustable 80°, 90°, 103°',
              'SENSOR': 'Adaptive light sensor',
              'FEATURES': 'HDR, Autofocus',
              'CONNECTION': 'USB 3.0'
            }
          }
        ],
        brands: [
          { name: 'ASUS', image: '/images/asus.webp' },
          { name: 'Samsung', image: '/images/samsung.webp' },
          { name: 'LG', image: '/images/lg.webp' },
          { name: 'Logitech', image: '/images/logitech-gaming-2.webp' },
          { name: 'Shure', image: '/images/shure2.webp' },
          { name: 'Razer', image: '/images/razer-logo-83F59A22CB-seeklogo.com.webp' }
        ],
        items: {
          'Monitors': 'monitors.html',
          'Microphones': 'microphones.html',
          'Webcams': 'webcams.html',
          'Headsets': 'headsets.html',
          'Keyboards': 'keyboards.html'
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