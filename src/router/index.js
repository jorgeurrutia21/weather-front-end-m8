import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DetailView from '@/views/DetailView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import FavoritosView from '@/views/FavoritosView.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    component: HomeView,
  },

  {
    path: '/lugar/:id',
    component: DetailView,
    props: true,
  },

  {
    path: '/about',
    component: AboutView,
  },

  {
    path: '/login',
    component: LoginView,
  },

  {
    path: '/registro',
    component: RegisterView,
  },

  {
    path: '/favoritos',
    component: FavoritosView,
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return '/' //me dirige al home
  }
})

export default router
