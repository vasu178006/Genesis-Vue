// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/landing.vue';
import LoginPage from '../components/loginpage.vue';
import AboutView from '../views/AboutView.vue';
import { auth } from '../firebase';

// Helper function to handle authentication guard
function authGuard(to, from, next) {
  const user = auth.currentUser;
  if (user) {
    next(); // Proceed if the user is logged in
  } else {
    next('/login'); // Redirect to login if not authenticated
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/landing', // Default route to landing page
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView, // Lazy-loaded About page
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage, // Login page
    },
    {
      path: '/landing',
      name: 'landing',
      component: LandingPage, // Landing page
      beforeEnter: authGuard, // Protect landing page if not authenticated
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/login', // Redirect unknown routes to login page
    },
  ],
});

export default router;
