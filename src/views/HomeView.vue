<template>
  <header class="container my-5">
    <h1 class="heading heading--primary">Pronóstico del Tiempo en Ciudades de Chile</h1>

    <hr />

    <h2 class="heading heading--secondary">
      <h2 class="heading heading--secondary">
        Chile presenta una gran diversidad climática, desde el desierto de Atacama en el norte hasta
        los paisajes glaciares de la Patagonia. Consulta el clima actual y el pronóstico de
        distintas ciudades.
      </h2>
    </h2>
  </header>

  <section class="container">
    <div v-if="mensaje" class="alert alert-success text-center">
      {{ mensaje }}
    </div>
    <input
      v-model="search"
      class="form-control mb-4 rounded-pill px-3"
      placeholder="Buscar ciudad..."
    />
    <p v-if="filtrados.length === 0" class="text-center">
      No se encontraron ciudades que coincidan con la búsqueda.
    </p>

    <div class="row">
      <div v-for="lugar in filtrados" :key="lugar.id" class="col-md-4 mb-3">
        <div class="card card--ciudad">
          <img :src="lugar.imagen" class="card__img" />

          <div class="card__info">
            <div>
              <h4>{{ lugar.nombre }}</h4>
              <p>{{ lugar.tempActual }}°C - {{ lugar.estadoActual }}</p>
              <p>Índice UV: {{ lugar.uv }}</p>
            </div>

            <div class="d-flex flex-column gap-2">
              <router-link :to="`/lugar/${lugar.id}`" class="btn btn-card">
                Ver detalles
              </router-link>

              <button
                v-if="authStore.isAuthenticated"
                class="btn btn-warning btn-sm rounded-pill"
                @click="agregarFavorito(lugar)"
              >
                Favorito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import santiago from '@/assets/img/santiago5.jpg'
import valparaiso from '@/assets/img/valparaiso4.jpg'
import concepcion from '@/assets/img/concepcion2.jpg'
import laSerena from '@/assets/img/laserena2.jpg'
import antofagasta from '@/assets/img/antofagasta2.jpg'
import temuco from '@/assets/img/temuco3.jpg'
import puertoMontt from '@/assets/img/puertomontt2.jpg'
import puntaArenas from '@/assets/img/puntaarenas2.jpg'
import iquique from '@/assets/img/iquique4.jpg'
import rancagua from '@/assets/img/rancagua.jpg'
const search = ref('')
const mensaje = ref('')
const authStore = useAuthStore()

const lugares = ref([
  {
    id: 1,
    nombre: 'Santiago',
    imagen: santiago,
    lat: -33.45,
    lon: -70.66,
    tempActual: null,
    estadoActual: '',
    humedad: '',
    uv: '',
  },
  {
    id: 2,
    nombre: 'Valparaíso',
    imagen: valparaiso,
    lat: -33.04,
    lon: -71.62,
    tempActual: null,
    estadoActual: '',
    humedad: '',
    uv: '',
  },

  {
    id: 3,
    nombre: 'Concepción',
    imagen: concepcion,
    lat: -36.82,
    lon: -73.05,
    tempActual: null,
    estadoActual: '',
    humedad: '',
    uv: '',
  },

  {
    id: 4,
    nombre: 'La Serena',
    imagen: laSerena,
    lat: -29.9,
    lon: -71.25,
    tempActual: null,
    estadoActual: '',
    humedad: '',
    uv: '',
  },

  {
    id: 5,
    nombre: 'Antofagasta',
    imagen: antofagasta,
    lat: -23.65,
    lon: -70.4,
    tempActual: null,
    estadoActual: '',
    humedad: '',
    uv: '',
  },

  {
    id: 6,
    nombre: 'Temuco',
    imagen: temuco,
    lat: -38.74,
    lon: -72.6,
    tempActual: null,
    estadoActual: '',
    humedad: '',
    uv: '',
  },

  {
    id: 7,
    nombre: 'Puerto Montt',
    imagen: puertoMontt,
    lat: -41.47,
    lon: -72.94,
    tempActual: null,
    estadoActual: '',
    humedad: '',
    uv: '',
  },

  {
    id: 8,
    nombre: 'Punta Arenas',
    imagen: puntaArenas,
    lat: -53.16,
    lon: -70.91,
    tempActual: null,
    estadoActual: '',
    humedad: '',
    uv: '',
  },

  {
    id: 9,
    nombre: 'Iquique',
    imagen: iquique,
    lat: -20.23,
    lon: -70.14,
    tempActual: null,
    estadoActual: '',
    humedad: '',
    uv: '',
  },

  {
    id: 10,
    nombre: 'Rancagua',
    imagen: rancagua,
    lat: -34.17,
    lon: -70.74,
    tempActual: null,
    estadoActual: '',
    humedad: '',
    uv: '',
  },
])

function obtenerEstadoClima(code) {
  if (code === 0) return 'Soleado'
  if ([1, 2, 3].includes(code)) return 'Nublado'
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'Lluvioso'
  if ([71, 73, 75].includes(code)) return 'Nevado'
  return 'Variable'
}

function obtenerNivelUV(uv) {
  if (uv <= 2) return 'Bajo'
  if (uv <= 5) return 'Moderado'
  if (uv <= 7) return 'Alto'
  if (uv <= 10) return 'Muy Alto'
  return 'Extremo'
}

function agregarFavorito(lugar) {
  authStore.agregarFavorito({
    id: lugar.id,
    nombre: lugar.nombre,
    imagen: lugar.imagen,
    lat: lugar.lat,
    lon: lugar.lon,
  })

  mensaje.value = `${lugar.nombre} fue agregada a favoritos`

  setTimeout(() => {
    mensaje.value = ''
  }, 3000) // el mensaje de agregado a favoritos dura 3 segundos
}

async function cargarClima() {
  for (const lugar of lugares.value) {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lugar.lat}` +
      `&longitude=${lugar.lon}` +
      `&current=temperature_2m,relative_humidity_2m,weather_code,uv_index` +
      `&timezone=auto`

    const res = await fetch(url)

    if (!res.ok) {
      console.error('Error Al Cargar La API')
      continue
    }

    const data = await res.json()

    lugar.tempActual = Math.round(data.current.temperature_2m)
    lugar.estadoActual = obtenerEstadoClima(data.current.weather_code)
    lugar.humedad = data.current.relative_humidity_2m + '%'
    lugar.uv = obtenerNivelUV(data.current.uv_index)
  }
}

const filtrados = computed(() => {
  return lugares.value.filter((l) => l.nombre.toLowerCase().includes(search.value.toLowerCase()))
})

onMounted(() => {
  cargarClima()
})
</script>

<style scoped>
.card--ciudad {
  border: none;
  border-radius: 18px;
  overflow: hidden;

  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.35),
    0 0 0 2px rgba(255, 255, 255, 0.15);

  transition: all 0.3s ease;
}

.card--ciudad:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.9);
}
.card__img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.card--ciudad:hover .card__img {
  transform: scale(1);
}

.card__info {
  background-color: #3e799e;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1rem 1.5rem;
}

.heading--primary {
  color: white;
  text-shadow: 6px 6px 11px #000000;
}

.heading--secondary {
  color: white;
  text-shadow: 2px 2px 6px #000000;
  font-size: 3vh;
}

.btn-card {
  background: rgba(255, 255, 255, 0.058);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.986);
  border-radius: 10px;
  padding: 6px 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-card:hover {
  background: rgba(255, 255, 255, 0.378);
  transform: translateY(-2px);
  color: #fff;
}

.form-control {
  border-radius: 50px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.form-control:focus {
  box-shadow:
    0 0 0 3px rgba(255, 255, 255, 0.2),
    0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
