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
        <source src="/src/assets/video/13057075_3840_2160_24fps.mp4" type="video/mp4" />
      </video>
      <div class="hero-text">
        <h1 class="gradient-text"> Your Dream PC</h1>
        <p>Discover the best components to power up your custom PC.</p>
      </div>
    </section>

    <section class="filters">
      <button v-for="filter in filters" :key="filter">{{ filter }}</button>
    </section>

    <!-- Updated product-list section with new card styles -->
    <section class="product-list">
      <h2>Results for "PC Components"</h2>
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
          name: 'NVIDIA RTX 4090',
          description: 'The most powerful consumer graphics card ever made. Features DLSS 3.0, ray tracing, and unmatched 4K gaming performance.',
          price: '₹96,000.00',
          image: '/images/geforce_rtx_4090_graphics_card_available_october_12.webp',
          badge: 'Graphics Card',
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
          name: 'Intel Core i9-13900K',
          description: 'High-performance processor for gaming and content creation with 24 cores and up to 5.8GHz boost clock.',
          price: '₹51,000.00',
          image: '/images/i9 13900k.webp',
          badge: 'Processor',
          specs: {
            'CORES/THREADS': '24 Cores / 32 Threads',
            'BASE CLOCK': '3.0 GHz',
            'BOOST CLOCK': '5.8 GHz',
            'CACHE': '36MB L3 Cache',
            'TDP': '125W',
            'SOCKET': 'LGA 1700'
          }
        },
        {
          name: 'ASUS ROG Strix Z790',
          description: 'Premium motherboard for Intel 12th and 13th gen processors with excellent VRM and connectivity options.',
          price: '₹34,000',
          image: '/images/z790e.png',
          badge: 'Motherboard',
          specs: {
            'CHIPSET': 'Intel Z790',
            'SOCKET': 'LGA 1700',
            'MEMORY': 'DDR5, up to 7800MHz OC',
            'EXPANSION': 'PCIe 5.0 x16, PCIe 4.0 x16',
            'STORAGE': '5x M.2 Slots, 6x SATA',
            'NETWORKING': '2.5Gb Ethernet, WiFi 6E'
          }
        },
        {
          name: 'G.Skill Trident Z5 32GB',
          description: 'High-performance DDR5 memory kit with RGB lighting and excellent overclocking potential.',
          price: '₹17000',
          image: '/images/g skill trident z.webp',
          badge: 'Memory',
          specs: {
            'CAPACITY': '32GB (2x16GB)',
            'SPEED': 'DDR5-6000MHz',
            'TIMINGS': 'CL36-36-36-96',
            'VOLTAGE': '1.35V',
            'LIGHTING': 'RGB Customizable',
            'PROFILE': 'XMP 3.0 Support'
          }
        },
        {
          name: 'NVIDIA RTX 5070',
          description: 'Next-generation mid-range graphics card with exceptional 4K gaming capability. Features enhanced DLSS 4.0, advanced ray tracing, and excellent power efficiency.',
          price: '₹55,250',
          image: '/images/rtx5070.webp',
          badge: 'Graphics Card',
          specs: {
          'MEMORY': '16GB GDDR7',
          'BOOST CLOCK': '2.8 GHz',
          'CUDA CORES': '9216',
          'RAY TRACING': '4th Gen RT Cores',
          'DLSS': 'DLSS 4.0 Support',
          'POWER': '250W TDP'
            }
          },
        {
          name: 'AMD Ryzen 9 7950X3D',
description: 'Ultimate gaming and content creation processor with 3D V-Cache technology, offering 16 cores and up to 5.7GHz boost clock.',
price: '₹60,000',
image: '/images/ryzen9.webp',
badge: 'Processor',
specs: {
  'CORES/THREADS': '16 Cores / 32 Threads',
  'BASE CLOCK': '4.2 GHz',
  'BOOST CLOCK': '5.7 GHz',
  'CACHE': '128MB 3D V-Cache',
  'TDP': '120W',
  'SOCKET': 'AM5'
}
        },
        {
          name: 'GIGABYTE AORUS Z790 Master',
description: 'High-end motherboard for Intel 12th and 13th gen processors featuring robust power delivery, extensive connectivity, and premium thermal design.',
price: '₹39,100',
image: '/images/gigaz790.webp',
badge: 'Motherboard',
specs: {
  'CHIPSET': 'Intel Z790',
  'SOCKET': 'LGA 1700',
  'MEMORY': 'DDR5, up to 8000MHz OC',
  'EXPANSION': 'PCIe 5.0 x16, PCIe 4.0 x16',
  'STORAGE': '4x M.2 Slots, 6x SATA',
  'NETWORKING': '10Gb + 2.5Gb Ethernet, WiFi 6E'
}
        },
        {
          name: 'Corsair Vengeance RGB Pro 32GB',
          description: 'Premium DDR5 memory with dynamic multi-zone RGB lighting and reliable performance for gaming and content creation.',
            price: '₹16,150',
            image: '/images/venegance.webp',
            badge: 'Memory',
            specs: {
              'CAPACITY': '32GB (2x16GB)',
              'SPEED': 'DDR5-5600MHz',
              'TIMINGS': 'CL36-36-36-76',
              'VOLTAGE': '1.25V',
              'LIGHTING': 'RGB iCUE Compatible',
              'PROFILE': 'XMP 3.0 Support',
        }
      }
      ],
      brands: [
        { name: 'Logitech', image: '/images/logitech-gaming-2.webp' },
        { name: 'Razer', image: '/images/razer-logo-83F59A22CB-seeklogo.com.webp' },
        { name: 'ASUS', image: '/images/ASUS logo white.webp' },
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
  }
};
</script>;

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

/* Updated Product List Styling */
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