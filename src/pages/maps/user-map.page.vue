<script setup>
import {ref, onMounted} from 'vue';
const center = ref({lat: -12.051389309324716, lng: -77.03455571814595});
const ubicacion = ref('');
const coordenadas = ref(null);
const error = ref(null);

async function buscarCoordenadas() {
  const base_url = 'https://nominatim.openstreetmap.org/search';

  const params = new URLSearchParams({
    q: ubicacion.value,
    format: 'json'
  });

  const url = `${base_url}?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('No se pudo obtener la respuesta del servidor');
    }

    const data = await response.json();

    if (data.length === 0) {
      throw new Error('No se encontraron resultados para la ubicación proporcionada');
    }

    const { lat, lon } = data[0];
    center.value = { lat: parseFloat(lat), lng: parseFloat(lon) }; // Aquí
    error.value = null;
  } catch (error) {
    console.error('Error al obtener center:', error);
    center.value = null;
    error.value = 'Error al obtener center: ' + error.message;
  }
}

const obtenerUbicacion = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude, longitude} = position.coords;
      center.value = { lat: latitude, lng: longitude }; // Y aquí
      // Actualiza el centro del mapa
    }, (error) => {
      console.error('Error al obtener la ubicación:', error);
    });
  } else {
    console.error('La geolocalización no está disponible en este navegador.');
  }
};


onMounted(() => {
  obtenerUbicacion();
});
</script>

<template>
  <div class="container">
    <div class="search">
      <h1 class="titulo">Find Route</h1>
      <div class="inputDesino">
        <div class="subtitulo"><h2>Where do you want to go today?</h2></div>
        <div class="pv-inputgroup">
          <pv-inputtext class="input" v-model="ubicacion" type="text" placeholder="	"/>
          <button class="icon" @click="buscarCoordenadas"><i class="pi pi-search" style="color: black"></i></button>
        </div> <!-- pv-inputgroup -->
      </div> <!-- inputDestino -->
      <div class="map">
        <google-map
            api-key="AIzaSyBB4hK1VH2foUTaaahuKRwInGzBvZyeX4s"
            style="width: 100%; height: 500px"
            :center="center"
            :zoom="15"
        >
          <marker-map :options="{ position: center }"/>
        </google-map>

      </div> <!-- map -->
      <div>
        <div v-if="center">
          <p>Latitud: {{ center.lat }}</p>
          <p>Longitud: {{ center.lng }}</p>
        </div>
        <div v-if="error">{{ error }}</div>
      </div>
    </div> <!-- search -->
  </div> <!-- container -->
</template>

<style scoped>
.container {
  background-color: #01A1FF;
  padding: 70px 0 0 0;
}
.search {
  display: block;
  text-align: center;
  color: white;
  width: min(90%, 120rem);
  margin: 0 auto;
}
.titulo {
  font-size: 36px;
  margin-bottom: 20px;
}
h2 {
  font-size: 24px;
  margin-bottom: 20px;
}
.inputDesino {
  margin-bottom: 20px;
}
.pv-inputgroup {
  display: flex;
  align-items: center;
  border: solid black;
  background-color: white;
  border-radius: 5px;
  width: min(80%, 120rem);
  margin: 0 auto;
}
.input {
  border: none;
  border-radius: 5px;
  padding: 5px;
  width: 90%;
}
.icon {
  background-color: white;
  border: none;
  border-radius: 5px;
  padding: 5px;
  width: 10%;
  cursor: pointer;
}
@media (min-width: 780px) {
  .titulo {
    font-size: 48px;
  }
  .subtitulo {
    font-size: 30px;
    margin-bottom: 0;
  }
  .inputDesino {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  .pv-inputgroup {
    width: 50%;
    margin: 0;
  }
  .input {
    width: 90%;
    height: 100%;
  }
  .icon {
    width: 10%;
  }
  .pi {
    font-size: 20px;
  }
}
</style>

