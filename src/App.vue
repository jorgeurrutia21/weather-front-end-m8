<template>
  <div class="d-flex flex-column min-vh-100">
    <Navbar />

    <main class="flex-grow-1">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/NavbarView.vue'
import Footer from './components/FooterView.vue'
</script>

<style>
body {
  background: linear-gradient(135deg, #133167, #4d638c, #87ceeb);
  color: white;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}
</style>
