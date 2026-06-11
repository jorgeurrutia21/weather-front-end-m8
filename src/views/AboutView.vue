<template>
  <div class="container my-5">
    <div class="row align-items-center">
      <div class="col-12 col-md-6 mb-4 mb-md-0 text-center">
        <img :src="zonasClimas" class="img-fluid rounded shadow" width="500" alt="Clima en Chile" />
      </div>

      <div class="col-12 col-md-6">
        <div class="about-card">
          <h1 class="heading heading--primary">
            <h1 class="heading heading--primary">🌤 Sobre ElTiempo</h1>
          </h1>

          <p class="heading heading--secondary">
            Esta web muestra el clima de algunas ciudades de Chile. Las temperaturas se obtienen
            mediante una API.
            <a href="https://open-meteo.com" target="_blank">Open-Meteo</a>.
          </p>

          <p class="climas">
            <strong>Clima Árido:</strong> Se extiende desde Arica hasta La Serena. Presenta altas
            temperaturas, escasas precipitaciones y aire muy seco, dando origen a paisajes
            desérticos.
          </p>

          <p class="climas">
            <strong>Clima Semiárido:</strong> Se ubica entre La Serena y el norte de Santiago. Tiene
            lluvias ocasionales y permite el desarrollo de vegetación adaptada a la escasez de agua.
          </p>

          <p class="climas">
            <strong>Clima Templado:</strong> Es el más común en Chile. Se caracteriza por
            temperaturas moderadas y se divide en mediterráneo, lluvioso y marítimo según la zona.
          </p>

          <p class="climas">
            <strong>Clima Frío:</strong> Presente entre Coyhaique y Punta Arenas. Destaca por bajas
            temperaturas, fuertes vientos y paisajes de estepa y bosques australes.
          </p>

          <p class="climas">
            <strong>Clima Polar:</strong> Se encuentra en la Antártica Chilena. Presenta
            temperaturas muy bajas, abundantes nevadas y extensas áreas cubiertas de hielo.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import zonasClimas from '@/assets/img/zonasyclimas.jpg'
</script>
<style scoped>
.heading--primary {
  color: white;
  text-shadow: 6px 6px 11px #000000;
}

.heading--secondary {
  color: white;
  text-shadow: 2px 2px 6px #000000;
  font-size: 3vh;
}

.about-card {
  background: rgba(98, 131, 174, 0.15);
  backdrop-filter: blur(6px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
}
.climas {
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1rem;
  text-align: justify;
}
</style>
