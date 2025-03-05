<template>
    <div>
      <header class="navbar">
        <div class="logo">
          <img src="/src/assets/images/Screenshot_2025-02-24_105300-removebg-preview.png" alt="TechBolt Logo" style="height: 50px; width: 110px;" />
        </div>
        <nav>
          <div v-for="(items, category) in categories" :key="category" class="nav-item">
            <a href="#">{{ category }}</a>
            <div class="dropdown">
              <a v-for="item in items" :key="item.name" :href="item.link">{{ item.name }}</a>
            </div>
          </div>
        </nav>
        <div class="icons">
          <div class="search-bar">
            <input type="text" v-model="query" placeholder="Search..." @input="handleSearch" />
            <div v-if="searchResults.length" class="search-results">
              <div v-for="result in searchResults" :key="result" @click="navigateTo(result)">{{ result }}</div>
            </div>
            <button @click="goToCart">🛒</button>
            <button>👤</button>
          </div>
        </div>
      </header>
  
      <section class="hero">
        <video width="200px" autoplay loop muted>
          <source src="/src/assets/video/13057075_3840_2160_24fps.mp4" type="video/mp4" />
        </video>
        <div class="hero-text">
          <h1>Build Your Dream PC</h1>
          <p>Discover the best components to power up your custom PC.</p>
        </div>
      </section>
  
      <section class="filters">
        <button v-for="filter in filters" :key="filter">{{ filter }}</button>
      </section>
  
      <section class="product-list">
        <h2>Results for "PC Components"</h2>
        <div class="products">
          <div v-for="product in products" :key="product.name" class="product-item">
            <img :src="product.image" :alt="product.name" />
            <h3>{{ product.name }}</h3>
            <p>{{ product.price }}</p>
            <button class="add-to-cart" @click="addToCart(product.name)">Add to Cart</button>
          </div>
        </div>
      </section>
  
      <footer>
        <p>&copy; 2025 TechBolt. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        query: '',
        searchResults: [],
        categories: {
          'PC Components': [
            { name: 'Graphics Cards', link: 'graphics-cards.html' },
            { name: 'Processors', link: 'processor.html' },
            { name: 'Motherboards', link: 'motherboards.html' },
            { name: 'Power Supplies', link: 'power-supplies.html' }
          ],
          'Gaming Gear': [
            { name: 'Gaming Mice', link: 'gaming-mice.html' },
            { name: 'Gaming Keyboards', link: 'gaming-keyboards.html' },
            { name: 'Gaming Headsets', link: 'gaming-headsets.html' },
            { name: 'Controllers', link: 'controllers.html' }
          ],
          Laptops: [
            { name: 'Gaming Laptops', link: 'laptops.html' },
            { name: 'Ultrabooks', link: 'ultrabooks.html' },
            { name: 'Workstation Laptops', link: 'workstation-laptops.html' }
          ],
          Storage: [
            { name: 'SSD', link: 'ssd.html' },
            { name: 'HDD', link: 'hdd.html' },
            { name: 'External Drives', link: 'external-drives.html' }
          ],
          Peripherals: [
            { name: 'Monitors', link: 'monitors.html' },
            { name: 'Webcams', link: 'webcams.html' },
            { name: 'Speakers', link: 'speakers.html' }
          ]
        },
        filters: ['🔖 Brand', '💰 Price', '🎮 Graphics Card', '🧠 Processor', '📦 Storage', '🔧 Memory'],
        products: [
          { name: 'NVIDIA RTX 4090', price: '$1,999.99', image: '/src/assets/images/geforce_rtx_4090_graphics_card_available_october_12.webp' },
          { name: 'Intel Core i9-13900K', price: '$599.99', image: '/src/assets/images/i9 13900k.webp' },
          { name: 'ASUS ROG Strix Z790', price: '$399.99', image: '/src/assets/images/z790e.png' },
          { name: 'G.Skill Trident Z5 32GB', price: '$199.99', image: '/src/assets/images/g skill trident z.webp' }
        ],
        items: {
          'Graphics Cards': 'graphics-cards.html',
          'Processors': 'processor.html',
          'Motherboards': 'motherboards.html',
          'Power Supplies': 'power-supplies.html',
          'Gaming Mice': 'gaming-mice.html'
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
        window.location.href = this.items[item];
      },
      goToCart() {
        window.location.href = 'cart.html';
      },
      addToCart(item) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${item} added to cart!`);
      }
    }
  };
  </script>
  
  <style scoped>
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

        nav a {
            margin: 0 1rem;
            text-decoration: none;
            color: white;
            transition: color 0.3s;
        }

        nav a:hover {
            color: #a855f7;
        }

        .icons button {
            margin-left: 1rem;
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: white;
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
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
        }

        .product-item {
            background-color: #18141d;
            padding: 1rem;
            border-radius: 12px;
            text-align: center;
        }

        .product-item img {
            width: 90%;
            border-radius: 9px;
        }

        .add-to-cart {
            background-color: #a855f7;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0.5rem 1rem;
            cursor: pointer;
            margin-top: 1rem;
        }

        footer {
            text-align: center;
            padding: 1rem;
            background-color: #18141d;
        }
        .search-bar {
            position: relative;
            display: flex;
            align-items: center;
            gap: 10px; /* Space between input and buttons */
        }
        
        /* Updated Search Input with Animation */
        .search-bar input {
            max-width: 190px;
            background-color: #1a1a1a; /* Dark background */
            border: none;
            padding: 10px;
            border-radius: 10px;
            outline: none;
            color: white;
            transition: box-shadow 0.3s ease; /* Smooth transition for normal state */
        }
        
        /* Focus Animation */
        .search-bar input:focus {
            animation: rotateShadow 2s infinite linear; /* Apply glowing effect */
        }
        
        /* Rotating Shadow Animation */
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
        
        /* Search Results Dropdown */
        .search-results {
            position: absolute;
            top: 50px;
            left: 0;
            background: #18141d;
            border-radius: 8px;
            display: none;
            z-index: 200;
            width: 100%;
        }
        
        .search-results div {
            padding: 0.5rem 1rem;
            cursor: pointer;
            color: white;
        }
        
        .search-results div:hover {
            background: #a855f7;
        }
        
        /* Cart & User Buttons */
        .search-bar button {
            background: transparent;
            border: none;
            cursor: pointer;
            font-size: 24px; /* Icon size */
            color: white; /* Icon color */
            transition: transform 0.3s ease;
        }
        
        .search-bar button:hover {
            transform: scale(1.1);
        }
          /* Dropdown Styling */
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background: #18141d;
        }

        .navbar nav {
            display: flex;
            gap: 2rem;
        }

        .nav-item {
            position: relative;
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
        }

        .dropdown a {
            display: block;
            padding: 0.5rem 1rem;
            color: white;
            text-decoration: none;
        }

        .dropdown a:hover {
            background: #a857f58e;
            
        }

        .nav-item:hover .dropdown {
            display: block;
            border-radius: 5px;
        }
        
  </style>