<template>
    <div class="cart-container">
      <h1>Your Cart</h1>
      
      <div v-if="cart.length === 0" class="empty-cart">
        Your cart is empty.
      </div>
      
      <div v-else class="cart-content">
        <div class="cart-items">
          <div v-for="(item, index) in cart" :key="index" class="cart-item">
            <div class="item-image">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="item-info">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-price">${{ item.price.toFixed(2) }}</div>
              <div class="quantity-controls">
                <button @click="updateQuantity(index, -1)" class="quantity-btn">-</button>
                <span class="quantity">{{ item.quantity }}</span>
                <button @click="updateQuantity(index, 1)" class="quantity-btn">+</button>
              </div>
            </div>
            <div class="item-total">${{ (item.price * item.quantity).toFixed(2) }}</div>
            <button @click="removeFromCart(index)" class="remove-btn">Remove</button>
          </div>
        </div>
        
        <div class="cart-summary">
          <div class="total-row">
            <span class="total-label">Total:</span>
            <span class="total-amount">${{ cartTotal.toFixed(2) }}</span>
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
        this.$router.push(this.items[item]);
      },
      goToCart() {
        this.$router.push('/cart');
      },
      addToCart(item) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find((cartItem) => cartItem.name === item.name);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({ name: item.name, price: parseFloat(item.price), quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.cart = cart; // Directly update the cart data
        alert(`${item.name} added to cart!`);
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
      removeFromCart(index) {
        this.cart.splice(index, 1);
        this.saveCart();
      },
      updateQuantity(index, change) {
        if (this.cart[index].quantity + change > 0) {
          this.cart[index].quantity += change;
          this.saveCart();
        }
      },
      saveCart() {
        try {
          localStorage.setItem('cart', JSON.stringify(this.cart));
        } catch (error) {
          console.error('Error saving cart:', error);
        }
      }
    },
    mounted() {
      this.loadCart();
    },
    watch: {
      cart: {
        handler(newCart) {
          this.saveCart();
        },
        deep: true
      }
    }
  };
  </script>
  
  <style scoped>
  .cart-container {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #0e0c11;
    color: white;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
    color: white;
  }
  
  .empty-cart {
    text-align: center;
    padding: 40px;
    font-size: 18px;
    color: #ccc;
    background-color: #18141d;
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
    border-bottom: 1px solid #333;
    background-color: #18141d;
    margin-bottom: 10px;
    border-radius: 8px;
  }

  .item-image {
    width: 80px;
    height: 80px;
    margin-right: 15px;
  }

  .item-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .item-info {
    flex: 2;
  }
  
  .item-name {
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 16px;
    color: white;
  }
  
  .item-price {
    color: #a855f7;
    font-size: 14px;
  }
  
  .item-total {
    flex: 1;
    text-align: right;
    font-weight: bold;
    color: #a855f7;
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
    background-color: #18141d;
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
    color: white;
  }
  
  .total-amount {
    font-size: 22px;
    font-weight: bold;
    color: #a855f7;
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 5px;
  }
  
  .quantity-btn {
    background: #a855f7;
    border: none;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .quantity-btn:hover {
    background: #9333ea;
  }
  
  .quantity {
    min-width: 24px;
    text-align: center;
    font-weight: bold;
    color: white;
  }
  </style>