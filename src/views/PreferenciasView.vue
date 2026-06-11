<template>
  <div class="container mt-5">
    <h2>Preferencias</h2>

    <select v-model="unidad" @change="guardar" class="form-select">
      <option>Celsius</option>
      <option>Fahrenheit</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const store = useAuthStore()

const unidad = ref(store.preferencias.temperatura)

function guardar() {
  store.actualizarPreferencia(unidad.value)
}
</script>
