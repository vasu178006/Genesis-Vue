<template>
  <div class="bodyfont">
    <div class="cart-container">
    <h1>Your Cart</h1>
    
    <button @click="goToHome" class="home-btn">
      Back to Home
    </button>
    
    <div v-if="!cartLoaded" class="loading">
      Loading your cart...
    </div>
    
    <div v-else-if="cart.length === 0" class="empty-cart">
      Your cart is empty.
    </div>
    
    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="(item, index) in cart" :key="index" class="cart-item">
          <div class="item-image">
            <img :src="item.image || '/placeholder-image.jpg'" :alt="item.name" />
          </div>
          <div class="item-info">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-price">${{ (item.price || 0).toFixed(2) }}</div>
            <div class="quantity-controls">
              <button @click="updateQuantity(index, -1)" class="quantity-btn">-</button>
              <span class="quantity">{{ item.quantity || 1 }}</span>
              <button @click="updateQuantity(index, 1)" class="quantity-btn">+</button>
            </div>
          </div>
          <div class="item-total">${{ ((item.price || 0) * (item.quantity || 1)).toFixed(2) }}</div>
          <button @click="removeFromCart(index)" class="remove-btn">Remove</button>
        </div>
      </div>
      
      <div class="cart-summary">
        <div class="total-row">
          <span class="total-label">Total:</span>
          <span class="total-amount">${{ cartTotal.toFixed(2) }}</span>
        </div>
        <div class="cart-buttons">
          <button @click="clearCart" class="clear-cart-btn">Clear Cart</button>
          <router-link to="/landing" class="continue-shopping-btn">Continue Shopping</router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  data() {
    return {
      cart: [],
      cartLoaded: false
    };
  },
  computed: {
    cartTotal() {
      if (!this.cart || !this.cart.length) return 0;
      return this.cart.reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;
        return total + (price * quantity);
      }, 0);
    }
  },
  methods: {
    goToHome() {
      // Navigate to home page
      if (this.$router) {
        this.$router.push('/');
      } else {
        window.location.href = '/';
      }
    },
    addToCart(item) {
      if (!item) return;
      
      try {
        const existingItemIndex = this.cart.findIndex(
          (cartItem) => cartItem.name === item.name
        );
        
        if (existingItemIndex !== -1) {
          // Create a new cart array to ensure reactivity
          const updatedCart = [...this.cart];
          updatedCart[existingItemIndex].quantity = 
            (parseInt(updatedCart[existingItemIndex].quantity) || 1) + 1;
          this.cart = updatedCart;
        } else {
          const newItem = {
            name: item.name,
            price: parseFloat(item.price) || 0,
            quantity: 1,
            image: item.image || null
          };
          this.cart = [...this.cart, newItem];
        }
        
        this.saveCart();
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    },
    loadCart() {
      try {
        this.cartLoaded = false;
        const storedCart = localStorage.getItem('cart');
        
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          if (Array.isArray(parsedCart)) {
            // Ensure all items have the required properties
            this.cart = parsedCart.map(item => ({
              name: item.name || 'Unknown Item',
              price: parseFloat(item.price) || 0,
              quantity: parseInt(item.quantity) || 1,
              image: item.image || null
            }));
          } else {
            this.cart = [];
          }
        } else {
          this.cart = [];
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        this.cart = [];
      } finally {
        this.cartLoaded = true;
      }
    },
    removeFromCart(index) {
      if (index < 0 || index >= this.cart.length) return;
      
      const updatedCart = [...this.cart];
      updatedCart.splice(index, 1);
      this.cart = updatedCart;
      this.saveCart();
    },
    updateQuantity(index, change) {
      if (index < 0 || index >= this.cart.length) return;
      
      const updatedCart = [...this.cart];
      const currentQuantity = parseInt(updatedCart[index].quantity) || 1;
      const newQuantity = currentQuantity + change;
      
      if (newQuantity > 0) {
        updatedCart[index].quantity = newQuantity;
        this.cart = updatedCart;
        this.saveCart();
      }
    },
    saveCart() {
      try {
        localStorage.setItem('cart', JSON.stringify(this.cart));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    },
    clearCart() {
      this.cart = [];
      this.saveCart();
    },
    handleStorageEvent(event) {
      if (event.key === 'cart') {
        this.loadCart();
      }
    }
  },
  created() {
    // Load cart data when component is created
    this.loadCart();
  },
  mounted() {
    // Add event listener for storage changes (if cart is updated in another tab)
    window.addEventListener('storage', this.handleStorageEvent);
  },
  beforeUnmount() {
    // Remove event listener when component is destroyed
    window.removeEventListener('storage', this.handleStorageEvent);
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Aldrich&family=Orbitron:wght@400..900&display=swap');
.bodyfont{
  font-family:'Aldrich',sans-serif;
}
.cart-container {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #0e0c11;
  color: white;
  position: relative;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: white;
}

.home-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  background: #a855f7;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-btn:hover {
  background: #9333ea;
}

.loading,
.empty-cart {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #ccc;
  background-color: #18141d;
  border-radius: 8px;
  margin-top: 20px;
}

.cart-items {
  margin-bottom: 20px;
  margin-top: 20px;
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

.cart-buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.clear-cart-btn,
.continue-shopping-btn {
  background: #a855f7;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
  font-weight: bold;
}

.clear-cart-btn:hover,
.continue-shopping-btn:hover {
  background: #9333ea;
}
</style>