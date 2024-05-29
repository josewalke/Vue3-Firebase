// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomeView.vue';
import Login from './views/LoginView.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
    { path: '/', component: Home, meta: { requiresAuth: true } },
    { path: '/login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (requiresAuth && !user) {
        next('/login');
      } else {
        next();
      }
    });
  });

export default router;
