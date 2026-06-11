<template>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand fw-bold"> 🌤 ElTiempo </router-link>

      <button
        class="navbar-toggler"
        type="button"
        :class="{ collapsed: !menuOpen }"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation"
        @click="menuOpen = !menuOpen"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="navbar-collapse"
        :class="{ collapse: !menuOpen, 'collapse show': menuOpen }"
        id="menuNav"
      >
        <div class="navbar-nav ms-auto align-items-center">
          <router-link to="/" class="nav-link" @click="closeMenu"> Home </router-link>

          <router-link to="/about" class="nav-link" @click="closeMenu"> Nosotros </router-link>

          <router-link v-if="authStore.user" to="/favoritos" class="nav-link" @click="closeMenu">
            Favoritos
          </router-link>

          <router-link v-if="!authStore.user" to="/login" class="nav-link" @click="closeMenu">
            Iniciar Sesión
          </router-link>

          <router-link v-if="!authStore.user" to="/registro" class="nav-link" @click="closeMenu">
            Registrarse
          </router-link>

          <span v-if="authStore.user" class="text-white ms-3 me-3 fw-bold">
            {{ authStore.user.email }}
          </span>

          <button v-if="authStore.user" class="btn btn-outline-light btn-sm" @click="logout">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

import { auth } from '@/firebase/config'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const menuOpen = ref(false)

function closeMenu() {
  menuOpen.value = false
}

async function logout() {
  closeMenu()
  try {
    await signOut(auth)

    authStore.clearUser()

    router.push('/login')
  } catch (error) {
    console.error(error)
    alert('Error al cerrar sesión')
  }
}
</script>

<style scoped>
.navbar {
  background-color: #071629;
  color: #ffffff;
  padding: 1rem 0;
}

.nav-link {
  color: white !important;
}

.nav-link:hover {
  color: #87ceeb !important;
}

.btn-outline-light {
  margin-left: 10px;
}
</style>
