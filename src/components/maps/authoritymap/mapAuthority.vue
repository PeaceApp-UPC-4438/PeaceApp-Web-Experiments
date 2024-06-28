<template>
  <header>
    <AuthorityToolbar/>
  </header>
  <div class="container">
    <div class="heat-map">
      <h1 class="titulo">{{ $t('map.title') }}</h1>
    </div>
    <div class="buttons">
      <button @click="toggleHeatmap">{{ $t('map.toggleHeatmap') }}</button>
      <button @click="changeGradient">{{ $t('map.changeGradient') }}</button>
      <button @click="changeOpacity">{{ $t('map.changeOpacity') }}</button>
      <button @click="changeRadius">{{ $t('map.changeRadius') }}</button>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
import { ReportApiService } from "../../../services/reportapi.service.js";
import AuthorityToolbar from "../../toolbar/toolbarAuthority.component.vue"
export default {
  components: {
    AuthorityToolbar
  },
  name: "Heatmap",
  data() {
    return {
      map: null,
      heatmap: null,
      gradient: [
        "rgba(0, 255, 255, 0)",
        "rgba(0, 255, 255, 1)",
        "rgba(0, 191, 255, 1)",
        "rgba(0, 127, 255, 1)",
        "rgba(0, 63, 255, 1)",
        "rgba(0, 0, 255, 1)",
        "rgba(0, 0, 223, 1)",
        "rgba(0, 0, 191, 1)",
        "rgba(0, 0, 159, 1)",
        "rgba(0, 0, 127, 1)",
        "rgba(63, 0, 91, 1)",
        "rgba(127, 0, 63, 1)",
        "rgba(191, 0, 31, 1)",
        "rgba(255, 0, 0, 1)"
      ],
      reports: [], // Almacena los reportes obtenidos del servicio
      geocoder: null, // Geocoder de Google Maps
      geocodeResults: [], // Almacena los resultados de geocodificación de los reportes
    };
  },
  mounted() {
    // No se inicializa el mapa en mounted directamente, se hace en initMap()
  },
  created() {
    // Método created para obtener los reportes y geocodificarlos
    this.fetchReports();
  },
  methods: {
    async fetchReports() {
      try {
        const reportService = new ReportApiService();
        const response = await reportService.getAll();
        this.reports = response.data;
        this.geocodeReports();
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    },
    async geocodeReports() {
      // Método para geocodificar los reportes
      this.geocoder = new google.maps.Geocoder();
      this.geocodeResults = []; // Limpiar resultados anteriores

      for (let i = 0; i < this.reports.length; i++) {
        const location = this.reports[i].location.toString(); // Asegurar que la ubicación sea un string
        try {
          const response = await this.fetchGeocode(location);
          const { results } = response;
          if (results && results.length > 0) {
            let lat = results[0].geometry.location.lat();
            let lng = results[0].geometry.location.lng();
            this.geocodeResults.push({ lat, lng });
          } else {
            this.geocodeResults.push("No results found");
          }
        } catch (error) {
          this.geocodeResults.push("Geocode error: " + error);
        }
      }
      // Después de geocodificar, inicializar el mapa y el heatmap
      this.initMap();
      console.log("Array de coordenadas:", this.geocodeResults);
    },
    fetchGeocode(location) {
      // Función para realizar la geocodificación
      return new Promise((resolve, reject) => {
        this.geocoder.geocode({ address: location }, (results, status) => {
          if (status === "OK") {
            resolve({ results });
          } else {
            reject(status);
          }
        });
      });
    },
    initMap() {
      // Método para inicializar el mapa y el heatmap
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: { lat: -12.0872453, lng: -77.0500318},
        mapTypeId: "satellite"
      });

      // Obtener puntos para el heatmap desde this.geocodeResults
      const heatmapData = this.getHeatmapData();

      // Crear la capa de heatmap
      this.heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: this.map,
      });

      // Imprimir el array de coordenadas en la consola
    },
    getHeatmapData() {
      // Función para obtener los datos del heatmap
      const heatmapData = [];
      for (let i = 0; i < this.geocodeResults.length; i++) {
        const result = this.geocodeResults[i];
        if (result !== "No results found") {
          heatmapData.push(new google.maps.LatLng(result.lat, result.lng));
        }
      }
      return heatmapData;
    },
    toggleHeatmap() {
      // Método para alternar la visibilidad del heatmap
      this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
    },
    changeGradient() {
      // Método para cambiar la gradiente del heatmap
      this.heatmap.set("gradient", this.heatmap.get("gradient") ? null : this.gradient);
    },
    changeRadius() {
      // Método para cambiar el radio del heatmap
      this.heatmap.set("radius", this.heatmap.get("radius") ? null : 20);
    },
    changeOpacity() {
      // Método para cambiar la opacidad del heatmap
      this.heatmap.set("opacity", this.heatmap.get("opacity") ? null : 0.2);
    }
  }
};
</script>

<style scoped>
#map {
  height: 400px;
  width: 100%;
}
.buttons{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.container {
  margin-top: 50px;
  background-color: #01A1FF;
  padding: 70px 0 0 0;
}
.heat-map {
  display: block;
  text-align: center;
  color: white;
  width: min(90%, 100rem);
  margin: 0 auto;
}
.titulo {
  font-size: 36px;
  margin-bottom: 20px;
}
@media (max-width: 500px) {
  .buttons {
    flex-direction: column;
  }
  button{
    width: 100%;
  }
}
</style>


