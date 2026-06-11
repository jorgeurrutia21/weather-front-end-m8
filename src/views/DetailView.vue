<template>
  <div class="container mt-4" v-if="lugar">
    <router-link to="/" class="btn-back mb-4"> Volver Atrás </router-link>

    <div class="row">
      <div class="col-12 col-md-6">
        <img :src="lugar.imagen" :alt="lugar.nombre" class="img-fluid rounded detalle__img" />
      </div>

      <div class="col-12 col-md-6">
        <h1>{{ lugar.nombre }}</h1>
        <p><strong>Temperatura actual:</strong> {{ lugar.tempActual }}°C</p>
        <p><strong>Estado:</strong> {{ lugar.estadoActual }}</p>
        <p><strong>Humedad:</strong> {{ lugar.humedad }}</p>

        <div class="row mt-4">
          <div class="col-12 col-md-6">
            <h3>Pronóstico Semanal</h3>

            <div v-for="(dia, i) in pronosticoSemanal" :key="i">
              <p>{{ dia.dia }} : {{ dia.min }}° / {{ dia.max }}° - {{ dia.estado }}</p>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <h3>Estadísticas</h3>

            <p>Mínima: {{ stats.min }}°C</p>
            <p>Máxima: {{ stats.max }}°C</p>
            <p>Promedio: {{ stats.promedio }}°C</p>

            <p>Días soleados: {{ stats.conteo.Soleado }}</p>
            <p>Días lluviosos: {{ stats.conteo.Lluvioso }}</p>
          </div>
        </div>

        <h3>Alertas Climáticas</h3>

        <div v-for="(alerta, i) in alertas" :key="i">
          <p>{{ alerta }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
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

const route = useRoute()
const id = route.params.id

const lugar = ref(null)
const pronosticoSemanal = ref([])
const stats = ref({
  min: 0,
  max: 0,
  promedio: 0,
  conteo: {
    Soleado: 0,
    Lluvioso: 0,
    Nublado: 0,
    Variable: 0,
  },
})
const alertas = ref([])

const lugares = [
  {
    id: 1,
    nombre: 'Santiago',
    imagen: santiago,
    lat: -33.45,
    lon: -70.66,
  },
  {
    id: 2,
    nombre: 'Valparaíso',
    imagen: valparaiso,
    lat: -33.04,
    lon: -71.62,
  },

  {
    id: 3,
    nombre: 'Concepción',
    imagen: concepcion,
    lat: -36.82,
    lon: -73.05,
  },

  {
    id: 4,
    nombre: 'La Serena',
    imagen: laSerena,
    lat: -29.9,
    lon: -71.25,
  },

  {
    id: 5,
    nombre: 'Antofagasta',
    imagen: antofagasta,
    lat: -23.65,
    lon: -70.4,
  },

  {
    id: 6,
    nombre: 'Temuco',
    imagen: temuco,
    lat: -38.74,
    lon: -72.6,
  },

  {
    id: 7,
    nombre: 'Puerto Montt',
    imagen: puertoMontt,
    lat: -41.47,
    lon: -72.94,
  },

  {
    id: 8,
    nombre: 'Punta Arenas',
    imagen: puntaArenas,
    lat: -53.16,
    lon: -70.91,
  },

  {
    id: 9,
    nombre: 'Iquique',
    imagen: iquique,
    lat: -20.23,
    lon: -70.14,
  },

  {
    id: 10,
    nombre: 'Rancagua',
    imagen: rancagua,
    lat: -34.17,
    lon: -70.74,
  },
]

function obtenerEstadoClima(code) {
  if (code === 0) return 'Soleado'
  if ([1, 2, 3].includes(code)) return 'Nublado'
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'Lluvioso'
  if ([71, 73, 75].includes(code)) return 'Nevado'
  return 'Variable'
}

function calcularEstadisticas(pronostico) {
  let min = Infinity
  let max = -Infinity
  let suma = 0

  const conteo = {
    Soleado: 0,
    Lluvioso: 0,
    Nublado: 0,
    Variable: 0,
  }

  for (const dia of pronostico) {
    if (dia.min < min) min = dia.min
    if (dia.max > max) max = dia.max

    suma += dia.min + dia.max

    conteo[dia.estado] ??= 0
    conteo[dia.estado]++
  }

  return {
    min,
    max,
    promedio: (suma / (pronostico.length * 2)).toFixed(1),
    conteo,
  }
}

function generarAlertas(stats) {
  const a = []

  if (stats.promedio > 30) a.push('Se pronostica una semana de calor extremo')
  if (stats.conteo.Lluvioso >= 3) a.push('Se pronostica una semana con abundantes precipitaciones')
  if (stats.min < 0) a.push('Se pronostica una semana con Posibles heladas')

  if (a.length === 0) a.push('Sin alertas climáticas')

  return a
}

async function cargarDetalle() {
  lugar.value = lugares.find((l) => l.id == id)

  if (!lugar.value) return

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lugar.value.lat}` +
    `&longitude=${lugar.value.lon}` +
    `&current=temperature_2m,relative_humidity_2m,weather_code,uv_index` +
    `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
    `&timezone=auto`

  const res = await fetch(url)

  if (!res.ok) {
    console.error('Error API')
    return
  }

  const data = await res.json()

  lugar.value.tempActual = Math.round(data.current.temperature_2m)
  lugar.value.estadoActual = obtenerEstadoClima(data.current.weather_code)
  lugar.value.humedad = data.current.relative_humidity_2m + '%'
  lugar.value.uv = data.current.uv_index

  pronosticoSemanal.value = data.daily.time.map((fecha, i) => ({
    dia: new Date(fecha).toLocaleDateString('es-CL', {
      weekday: 'long',
    }),
    min: Math.round(data.daily.temperature_2m_min[i]),
    max: Math.round(data.daily.temperature_2m_max[i]),
    estado: obtenerEstadoClima(data.daily.weather_code[i]),
  }))

  stats.value = calcularEstadisticas(pronosticoSemanal.value)
  alertas.value = generarAlertas(stats.value)
}

onMounted(() => {
  cargarDetalle()
})
</script>

<style scoped>
.detalle__img {
  width: 100%;
  height: 350px;
  object-fit: cover;

  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.35),
    0 0 0 3px rgba(255, 255, 255, 0.4);

  transition: all 0.3s ease;
}

.detalle__img:hover {
  transform: scale(1.02);
}

.detalle {
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.9);
  color: #ffffff;
  margin-bottom: 2rem;
}
.detalle__container {
  padding: 2rem;
}
@media (min-width: 768px) {
  .detalle__container {
    padding: 2rem;
  }
}
.detalle__container p {
  font-weight: 600;
  font-size: medium;
}

.btn-back {
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

.btn-back:hover {
  background: rgba(255, 255, 255, 0.378);
  transform: translateY(-2px);
  color: #fff;
}
</style>
