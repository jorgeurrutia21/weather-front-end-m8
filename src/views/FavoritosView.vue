<template>
  <div class="container mt-5">
    <h1 class="mb-4">🌤 Mis Favoritos</h1>

    <div v-if="favoritos.length === 0" class="alert alert-info">
      Aún no has agregado ciudades a tus favoritos.
    </div>

    <div class="row" v-else>
      <div v-for="favorito in favoritos" :key="favorito.id" class="col-md-4 mb-3">
        <div class="card h-100 shadow fav__img">
          <img
            :src="favorito.imagen"
            class="card-img-top"
            style="height: 220px; object-fit: cover"
          />

          <div class="card-body">
            <h4>{{ favorito.nombre }}</h4>

            <p>
              Temperatura:
              {{ mostrarTemperatura(favorito.tempActual) }}
            </p>
            <p>
              Estado:
              {{ favorito.estadoActual }}
            </p>

            <p>
              Índice UV:
              {{ favorito.uv }}
            </p>

            <button class="btn btn-danger" @click="eliminarFavorito(favorito.id)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-2" />
    <p>
      <strong>Unidad de temperatura seleccionada:</strong>
      {{ authStore.preferencias.temperatura }}
    </p>
    <div class="mb-3">
      <button class="btn btn-primary me-2" @click="cambiarACelsius">Celsius</button>

      <button class="btn btn-secondary" @click="cambiarAFahrenheit">Fahrenheit</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const favoritos = ref([])

function obtenerEstadoClima(code) {
  if (code === 0) return 'Soleado'
  if ([1, 2, 3].includes(code)) return 'Nublado'
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'Lluvioso'
  if ([71, 73, 75].includes(code)) return 'Nevado'

  return 'Variable'
}

async function cargarFavoritos() {
  favoritos.value = []

  for (const ciudad of authStore.favoritos) {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${ciudad.lat}` +
      `&longitude=${ciudad.lon}` +
      `&current=temperature_2m,weather_code,uv_index`

    const res = await fetch(url)
    const data = await res.json()

    favoritos.value.push({
      ...ciudad,

      tempActual: Math.round(data.current.temperature_2m),

      estadoActual: obtenerEstadoClima(data.current.weather_code),

      uv: data.current.uv_index,
    })
  }
}

function eliminarFavorito(id) {
  authStore.eliminarFavorito(id)

  favoritos.value = favoritos.value.filter((item) => item.id !== id)
}

function cambiarACelsius() {
  authStore.cambiarTemperatura('Celsius')
}

function cambiarAFahrenheit() {
  authStore.cambiarTemperatura('Fahrenheit')
}

function mostrarTemperatura(temp) {
  if (authStore.preferencias.temperatura === 'Fahrenheit') {
    return `${Math.round((temp * 9) / 5 + 32)}°F`
  }

  return `${temp}°C`
}

onMounted(() => {
  cargarFavoritos()
})
</script>

<style scoped>
.card {
  border-radius: 18px;
  background-color: #a6bede;
}

.fav__img {
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.35),
    0 0 0 3px rgba(255, 255, 255, 0.4);

  transition: all 0.3s ease;
}
.fav__img:hover {
  transform: scale(1.02);
}

.btn-danger {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-danger:hover {
  transform: translateY(-2px);
}
</style>
