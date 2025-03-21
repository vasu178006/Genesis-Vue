import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../components/landing.vue'
import LoginPage from '../components/loginpage.vue'
import AboutView from '../views/AboutView.vue'
import ComponentsPage from '../components/Components.vue'
import Laptops from '../components/laptops.vue'
import Cart from '../components/cart.vue'
import Gear from '../components/gears.vue'
import Storage from '../components/storage.vue'
import Peripherals from '../components/peripherals.vue'
import About from '../components/about.vue'
import User from '../components/user.vue'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

// Enhanced auth guard with promise to properly handle Firebase auth state
const requireAuth = (to, from, next) => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if (user) {
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath } // Store the intended destination
        })
      }
      resolve()
    })
  })
}

// Route metadata for better organization
const routes = [
  {
    path: '/',
    redirect: '/login' // Redirect root path to login page
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      title: 'Login',
      requiresAuth: false
    }
  },
  {
    path: '/landing',
    name: 'landing',
    component: LandingPage,
    beforeEnter: requireAuth,
    meta: {
      title: 'Home',
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      title: 'About Us',
      requiresAuth: false
    }
  },
  {
    path: '/components',
    name: 'components',
    component: ComponentsPage,
    beforeEnter: requireAuth,
    meta: {
      title: 'PC Components',
      requiresAuth: true,
      category: 'shop'
    }
  },
  {
    path: '/laptops',
    name: 'laptops',
    component: Laptops,
    beforeEnter: requireAuth,
    meta: {
      title: 'Gaming Laptops',
      requiresAuth: true,
      category: 'shop'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    beforeEnter: requireAuth,
    meta: {
      title: 'Shopping Cart',
      requiresAuth: true,
      category: 'shop'
    }
  },
  {
    path: '/gears',
    name: 'gears',
    component: Gear, // Fixed: Changed Gears to Gear to match import
    beforeEnter: requireAuth,
    meta: {
      title: 'Gaming Gear', // Fixed: Corrected the title from "Shopping Cart"
      requiresAuth: true,
      category: 'shop'
    }
  },
  {
    path: '/storage',
    name: 'storage',
    component: Storage, 
    beforeEnter: requireAuth,
    meta: {
      title: 'Storage',
      requiresAuth: true,
      category: 'shop'
    }
  },
  {
    path: '/peripherals',
    name: 'peripherals',
    component: Peripherals,
    beforeEnter: requireAuth,
    meta: {
      title: 'Peripherals',
      requiresAuth: true,
      category: 'shop'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About, 
    beforeEnter: requireAuth,
    meta: {
      title: 'About', 
      requiresAuth: true,
      category: 'shop'
    }
  },
  {
    path: '/user',
    name: 'user',
    component: User, 
    beforeEnter: requireAuth,
    meta: {
      title: 'User', 
      requiresAuth: true,
      category: 'shop'
    }
  },

  
  // Catch-all route
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login' // Redirect unknown paths to login
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Scroll to top when navigating to a new page
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Global navigation guard to check authentication
router.beforeEach((to, from, next) => {
  // Set document title
  document.title = to.meta.title ? `Genesis - ${to.meta.title}` : 'Genesis Store'
  
  // If the route has its own beforeEnter guard, let that handle auth
  if (to.beforeEnter) {
    return next()
  }
  
  // Check if the user is logged in
  const currentUser = auth.currentUser
  
  // If route requires auth and user is not logged in, redirect to login
  if (to.meta.requiresAuth && !currentUser) {
    next('/login')
  }
  // If user is logged in and trying to access login page, redirect to landing
  else if (currentUser && to.path === '/login') {
    next('/landing')
  }
  // Otherwise proceed normally
  else {
    next()
  }
})

export default router