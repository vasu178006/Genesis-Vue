<template>
    <div class="cart-container">
      <h1>Your Cart</h1>
      
      <div v-if="cart.length === 0" class="empty-cart">
        Your cart is empty.
      </div>
      
      <div v-else class="cart-content">
        <div class="cart-items">
          <div v-for="(item, index) in cart" :key="index" class="cart-item">
            <div class="item-info">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-price">₹{{ item.price.toFixed(2) }} × {{ item.quantity }}</div>
            </div>
            <div class="item-total">₹{{ (item.price * item.quantity).toFixed(2) }}</div>
            <button @click="removeFromCart(index)" class="remove-btn">Remove</button>
          </div>
        </div>
        
        <div class="cart-summary">
          <div class="total-row">
            <span class="total-label">Total:</span>
            <span class="total-amount">₹{{ cartTotal.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cart: []
      };
    },
    computed: {
      cartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    },
    methods: {
      handleSearch() {
        this.searchResults = Object.keys(this.items).filter(item =>
          item.toLowerCase().includes(this.query.toLowerCase())
        );
      },
      navigateTo(item) {
        this.$router.push(this.items[item]); // Use Vue Router for navigation
      },
      goToCart() {
        this.$router.push('/cart'); // Navigate to the cart route
      },
      addToCart(item) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find((cartItem) => cartItem.name === item.name);
        if (existingItem) {
          existingItem.quantity += 1; // Increase quantity if item exists
        } else {
          cart.push({ name: item.name, price: parseFloat(item.price), quantity: 1 }); // Ensure correct structure
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${item.name} added to cart!`);
        this.loadCart(); // Refresh cart data
      },
      loadCart() {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        this.cart = storedCart;
      },
      removeFromCart(index) {
        this.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    },
    mounted() {
      this.loadCart(); // Load cart data on component mount
    }
  };
  </script>
  
  <style scoped>
  .cart-container {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .empty-cart {
    text-align: center;
    padding: 40px;
    font-size: 18px;
    color: #666;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .cart-items {
    margin-bottom: 20px;
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #eee;
  }
  
  .item-info {
    flex: 2;
  }
  
  .item-name {
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 16px;
  }
  
  .item-price {
    color: #666;
    font-size: 14px;
  }
  
  .item-total {
    flex: 1;
    text-align: right;
    font-weight: bold;
  }
  
  .remove-btn {
    background: #a855f7;
    border: none;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 15px;
  }
  
  .remove-btn:hover {
    background: #9333ea;
  }
  
  .cart-summary {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
  }
  
  .total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  
  .total-label {
    font-size: 18px;
    font-weight: bold;
  }
  
  .total-amount {
    font-size: 22px;
    font-weight: bold;
    color: #a855f7;
  }
  </style>