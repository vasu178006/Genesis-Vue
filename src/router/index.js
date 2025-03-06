import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/landing.vue';
import LoginPage from '../components/loginpage.vue';
import AboutView from '../views/AboutView.vue';
import ComponentsPage from'../components/Components.vue';
import Laptops from '../components/laptops.vue';
import { auth } from '../firebase';

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
      name: 'Home',
      component: LandingPage // Set LandingPage as the default home page
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
      path: '/components',
      name: 'Components',
      component: ComponentsPage,
      beforeEnter: authGuard,
    },
    {
      path: '/Laptops',
      name: 'laptops',
      component: Laptops,
      beforeEnter: authGuard,
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/login', // Redirect unknown routes to login page
    },
  ],
});

export default router;