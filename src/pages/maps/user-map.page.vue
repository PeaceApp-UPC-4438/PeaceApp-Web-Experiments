<script>
import {obtenerCoordenadas} from './services/coordenatesApi.service.js';
import {HeatmapLayer as Heatmap} from "vue3-google-map";
import CitizenToolbar from "../../components/toolbar/toolbarCitizen.component.vue";
export default {
  name: 'UserMapPage',
  components: {Heatmap, CitizenToolbar},
  data() {
    return {
      center: { lat: 0, lng: -180 },
      ubicacionActual: null,
      nuevaUbicacion: null,
      path: null,
      ubication: '',
      error: null,
      locations: [],
    };
  },
  methods: {
    async buscarCoordenadas() {
      try {
        this.nuevaUbicacion = await obtenerCoordenadas(this.ubication);
        this.locations = [this.ubicacionActual, this.nuevaUbicacion];
        this.path = {
          path: this.locations,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 2.0,
          strokeWeight: 3,
        };
        this.error = null;
      } catch (error) {
        console.error('Error al obtener coordenadas:', error);
        this.error = 'Error al obtener coordenadas: ' + error.message;
      }
    },
    obtenerUbicacion() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              this.ubicacionActual = { lat: latitude, lng: longitude };
              this.center = this.ubicacionActual; // Centra el mapa en la ubicación actual
            },
            (error) => {
              console.error('Error al obtener la ubicación:', error);
              this.error = 'Error al obtener la ubicación: ' + error.message;
            }
        );
      } else {
        console.error('La geolocalización no está disponible en este navegador.');
        this.error = 'La geolocalización no está disponible en este navegador.';
      }
    },
  },
  mounted() {
    this.obtenerUbicacion();
  }
};
</script>

<template>
  <header>
    <CitizenToolbar/>
  </header>
  <div class="container">
    <div class="search">
      <h1 class="titulo">{{$t('map.find')}}</h1>
      <div class="inputDesino">
        <div class="subtitulo"><h2>{{$t('map.question')}}</h2></div>
        <div class="pv-inputgroup">
          <pv-inputtext class="input" v-model="ubication" type="text" placeholder=""/>
          <button class="icon" @click="buscarCoordenadas"><i class="pi pi-search" style="color: black"></i></button>
        </div>
      </div>
      <div class="map">
        <google-map
            api-key="AIzaSyBB4hK1VH2foUTaaahuKRwInGzBvZyeX4s"
            style="width: 100%; height: 500px"
            :center="center"
            :zoom="11"
        >
          <polyLine v-if="path" :options="path" />
          <marker-cluster>
            <marker-map
                v-for="(location, i) in locations"
                :key="i"
                :options = "{position: location}"
            />
          </marker-cluster>
        </google-map>
      </div>
      <div>
        <div v-if="nuevaUbicacion">
          <p>{{ $t('map.latitude') }} {{nuevaUbicacion.lat}}  </p>
          <p>{{ $t('map.longitude') }} {{nuevaUbicacion.lng}}  </p>
        </div>
        <div v-if="error">{{ error }}</div>
      </div>
    </div>
  </div>
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