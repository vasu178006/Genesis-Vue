<template>
  <div class="auth-container">
    <h2 class="fade-in">Sign in with Google</h2>

    <div class="button-group fade-in">
      <button @click="signInWithGoogle" :disabled="loading" class="google-button">
        <span v-if="loading" class="loader"></span>
        <span v-else>🔒 Sign in with Google</span>
      </button>
    </div>

    <p v-if="errorMessage" class="error fade-in">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success fade-in">{{ successMessage }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

export default {
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const errorMessage = ref('');
    const successMessage = ref('');

    const signInWithGoogle = async () => {
      loading.value = true;
      errorMessage.value = '';
      try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('User Info:', result.user);
        successMessage.value = '🎉 Google Sign-In successful!';
        setTimeout(() => router.push('/landing'), 1500);
      } catch (error) {
        errorMessage.value = '❌ Google Sign-In failed: ' + error.message;
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      errorMessage,
      successMessage,
      signInWithGoogle,
    };
  },
};
</script>

<style scoped>
/* Centering the auth container */
.auth-container {
  height: 100vh; /* Full screen height */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Vertical centering */
  align-items: center; /* Horizontal centering */
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  animation: fadeInBackground 1.5s ease-in-out;
}

/* Glassmorphism effect */
.auth-container h2 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* Google button styling with hover effects */
.google-button {
  cursor: pointer;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 1.1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hover Animation */
.google-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
}

/* Loading Pulse Animation */
.google-button:disabled {
  background: rgba(255, 255, 255, 0.3);
  cursor: not-allowed;
}

.loader {
  border: 4px solid transparent;
  border-top: 4px solid white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
}

/* Error and Success Messages */
.error, .success {
  margin-top: 20px;
  font-size: 1rem;
}

.error {
  color: #ff4d4d;
}

.success {
  color: #48e798;
}

/* Fade-in animation for elements */
.fade-in {
  opacity: 0;
  animation: fadeIn 1s ease forwards;
}

/* Background fade animation */
@keyframes fadeInBackground {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Fade in content animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Loader spinning animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
