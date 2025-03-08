<template>
    <div class="user-profile-container">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading user information...</p>
      </div>
      
      <div v-else-if="error" class="error-state">
        <div class="error-icon">!</div>
        <p>{{ error }}</p>
        <button @click="signIn" class="sign-in-button">
          <img src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/5.14.0/google.svg" alt="Google" class="button-icon" />
          Sign in with Google
        </button>
      </div>
      
      <div v-else-if="user" class="user-info">
        <div class="card-header">
          <div class="profile-circle">
            <img v-if="user.photoURL" :src="user.photoURL" alt="Profile picture" class="profile-image" />
            <div v-else class="profile-image-placeholder">
              {{ getUserInitials() }}
            </div>
          </div>
          <h2 class="user-name">{{ user.displayName || 'User' }}</h2>
          <p class="user-email">{{ user.email }}</p>
        </div>
        
        <div class="user-details">
          <div class="detail-item">
            <div class="detail-icon">ID</div>
            <div class="detail-content">
              <p class="detail-label">User ID</p>
              <p class="detail-value">{{ user.uid }}</p>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="detail-icon">CR</div>
            <div class="detail-content">
              <p class="detail-label">Account created</p>
              <p class="detail-value">{{ formatDate(user.metadata.creationTime) }}</p>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="detail-icon">LG</div>
            <div class="detail-content">
              <p class="detail-label">Last sign in</p>
              <p class="detail-value">{{ formatDate(user.metadata.lastSignInTime) }}</p>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="detail-icon">{{ user.emailVerified ? '✓' : '?' }}</div>
            <div class="detail-content">
              <p class="detail-label">Email verification</p>
              <p class="detail-value">{{ user.emailVerified ? 'Verified' : 'Not verified' }}</p>
            </div>
          </div>
        </div>
        
        <div class="button-group">
          <button @click="goToHome" class="home-button">Home</button>
          <button @click="signOut" class="sign-out-button">Sign Out</button>
        </div>
      </div>
      
      <div v-else class="sign-in-container">
        <div class="welcome-icon">V</div>
        <h2>Welcome to GameTech</h2>
        <p class="welcome-text">Please sign in with your Google account to continue</p>
        <button @click="signIn" class="sign-in-button">
          <img src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/5.14.0/google.svg" alt="Google" class="button-icon" />
          Sign in with Google
        </button>
        <button @click="goToHome" class="link-button">Return to Home</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getAuth, signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'UserProfile',
    setup() {
      const user = ref(null);
      const loading = ref(true);
      const error = ref(null);
      const auth = getAuth();
      const router = useRouter();
      
      // Format date from Firebase timestamp
      const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
      };
      
      // Get user initials for avatar placeholder
      const getUserInitials = () => {
        if (!user.value || !user.value.displayName) return '?';
        return user.value.displayName
          .split(' ')
          .map(name => name.charAt(0))
          .join('')
          .toUpperCase()
          .substring(0, 2);
      };
      
      // Sign in with Google
      const signIn = async () => {
        try {
          loading.value = true;
          error.value = null;
          const provider = new GoogleAuthProvider();
          await signInWithPopup(auth, provider);
        } catch (err) {
          console.error('Sign in error:', err);
          error.value = err.message;
        } finally {
          loading.value = false;
        }
      };
      
      // Sign out and redirect to login page
      const signOut = async () => {
        try {
          loading.value = true;
          await firebaseSignOut(auth);
          // Redirect to login page after sign out
          router.push('/login');
        } catch (err) {
          console.error('Sign out error:', err);
          error.value = err.message;
        } finally {
          loading.value = false;
        }
      };
      
      // Navigate to home page
      const goToHome = () => {
        router.push('/landing');
      };
      
      // Listen for auth state changes
      onMounted(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          user.value = currentUser;
          loading.value = false;
        }, (err) => {
          console.error('Auth state change error:', err);
          error.value = err.message;
          loading.value = false;
        });
        
        // Clean up the listener when component is unmounted
        return unsubscribe;
      });
      
      return {
        user,
        loading,
        error,
        signIn,
        signOut,
        goToHome,
        formatDate,
        getUserInitials
      };
    }
  }
  </script>
  
  <style scoped>
  /* Dark Theme with Enhanced Purple Accents */
:root {
  --bg-dark: #121212;
  --card-bg: #1E1E1E;
  --element-bg: #2D2D2D;
  --border-color: #333333;
  --text-primary: #E0E0E0;
  --text-secondary: #A0A0A0;
  --accent-color: #9370DB;      /* Main purple */
  --accent-hover: #7B68EE;      /* Darker purple for hover states */
  --accent-light: #B19CD9;      /* Lighter purple for subtle elements */
  --accent-very-light: rgba(147, 112, 219, 0.15); /* Very light purple for backgrounds */
  --danger-color: #CF6679;
  --danger-hover: #B54E62;
  --icon-bg: #252525;
  --purple-glow: 0 0 8px rgba(147, 112, 219, 0.4);
}

.user-profile-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 8px;
  background-color: var(--card-bg);
  color: var(--text-primary);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(147, 112, 219, 0.1);
  border: 1px solid rgba(147, 112, 219, 0.1);
}

.loading-state, .error-state, .sign-in-container {
  text-align: center;
  padding: 36px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(147, 112, 219, 0.2);
  border-radius: 50%;
  border-top: 3px solid var(--accent-color);
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 28px;
  position: relative;
  padding-bottom: 16px;
}

.card-header:after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 50%;
  height: 1px;
  background: var(--accent-color);
  opacity: 0.5;
}

.profile-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--accent-color);
  margin-bottom: 16px;
  box-shadow: var(--purple-glow);
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 38px;
  font-weight: 500;
}

.user-name {
  margin: 0 0 4px 0;
  font-size: 22px;
  font-weight: 500;
  color: var(--text-primary);
}

.user-email {
  margin: 0;
  font-size: 14px;
  color: var(--accent-light);
}

.user-details {
  margin-bottom: 24px;
  background-color: var(--bg-dark);
  border-radius: 6px;
  padding: 12px;
  border: 1px solid rgba(147, 112, 219, 0.1);
}

.detail-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.detail-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.detail-icon {
  flex: 0 0 36px;
  height: 36px;
  background-color: var(--accent-very-light);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 14px;
  color: var(--accent-light);
  font-weight: 500;
}

.detail-content {
  flex: 1;
}

.detail-label {
  margin: 0 0 2px 0;
  font-size: 11px;
  color: var(--accent-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  margin: 0;
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 400;
  word-break: break-all;
}

.button-group {
  display: flex;
  gap: 12px;
}

.sign-in-button, .sign-out-button, .home-button {
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.sign-in-button {
  flex: 1;
  background-color: var(--accent-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--purple-glow);
}

.sign-in-button:hover {
  background-color: var(--accent-hover);
  transform: translateY(-1px);
}

.sign-out-button {
  flex: 1;
  background-color: var(--danger-color);
  color: white;
}

.sign-out-button:hover {
  background-color: var(--danger-hover);
  transform: translateY(-1px);
}

.home-button {
  flex: 1;
  background-color: var(--element-bg);
  color: var(--text-primary);
  border: 1px solid var(--accent-color);
}

.home-button:hover {
  background-color: var(--accent-very-light);
  transform: translateY(-1px);
}

.button-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  filter: invert(1);
}

.error-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(207, 102, 121, 0.2);
  color: var(--danger-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 14px;
}

.welcome-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 18px;
  box-shadow: var(--purple-glow);
}

.welcome-text {
  color: var(--text-secondary);
  margin-bottom: 22px;
  font-size: 14px;
}

.link-button {
  background: transparent;
  border: none;
  color: var(--accent-color);
  font-size: 14px;
  margin-top: 16px;
  cursor: pointer;
  text-decoration: underline;
  padding: 4px;
}

.link-button:hover {
  color: var(--accent-light);
}

/* For smaller screens */
@media (max-width: 768px) {
  .user-profile-container {
    max-width: 100%;
    border-radius: 0;
    padding: 20px;
  }
}
    </style>
    