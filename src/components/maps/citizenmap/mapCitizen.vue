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
          <pv-inputtext class="input" v-model="endLocationInput" type="text" placeholder=""/>
          <button class="icon" @click="calculateRoute()"><i class="pi pi-search" style="color: black"></i></button>
        </div>
      </div>
    </div>
    <div id="map"></div>
    <div id="sidebar"></div>
  </div>
</template>

<script>
import CitizenToolbar from '../../toolbar/toolbarCitizen.component.vue'
export default {
  components: {
    CitizenToolbar
  },
  name: 'MapDirections',
  data() {
    return {
      map: null,
      directionsRenderer: null,
      directionsService: null,
      startLocation: '', // Se actualizará con la ubicación actual
      endLocationInput: '', // Será la entrada del usuario para el destino
    };
  },
  mounted() {
    this.initMap();
    this.getCurrentLocation();
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 41.85, lng: -87.65 },
        disableDefaultUI: true,
      });

      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(this.map);
      this.directionsRenderer.setPanel(document.getElementById('sidebar'));

      this.directionsService = new google.maps.DirectionsService();

      const control = document.getElementById('floating-panel');
      this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

      this.calculateRoute(); // Llama a calculateRoute inicialmente
    },
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.startLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // Puedes centrar el mapa en la ubicación actual si lo deseas
          this.map.setCenter(this.startLocation);
        }, (error) => {
          console.error('Error getting current location:', error);
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    },
    calculateRoute() {
      const start = this.startLocation;
      const end = this.endLocationInput;

      if (start && end) {
        this.directionsService.route({
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.DRIVING,
        })
            .then((response) => {
              if (response.routes && response.routes.length > 0) {
                // Mostrar el panel lateral solo si hay indicaciones de ruta
                this.directionsRenderer.setDirections(response);
                document.getElementById('sidebar').style.display = 'block'; // Mostrar el sidebar
              } else {
                // Ocultar el panel lateral si no hay indicaciones de ruta
                this.directionsRenderer.setDirections(null); // Limpiar las direcciones
                document.getElementById('sidebar').style.display = 'none'; // Ocultar el sidebar
              }
            })
            .catch((e) => {
              console.error('Directions request failed due to ' + e);
              document.getElementById('sidebar').style.display = 'none'; // Ocultar el sidebar en caso de error
            });
      } else {
        // Si falta alguna ubicación, limpiar y ocultar el sidebar
        this.directionsRenderer.setDirections(null);
        document.getElementById('sidebar').style.display = 'none';
      }
    }

  }
};
</script>

<style scoped>
.container {
  //background-color: #01A1FF;
  padding: 100px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  width: min(90%, 120rem);
  margin: 0 auto;
}

.search {
  margin-bottom: 20px;

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

.titulo {
  font-size: 36px;
  margin-bottom: 20px;
}

#map {
  height: 500px;
  width: 100%; /* Ancho completo del mapa */
  margin-bottom: 20px;
}

#sidebar {
  background-color: #f0f0f0;
  width: 100%; /* Ancho completo del panel lateral */
  height: 200px; /* Altura del panel lateral */
  overflow: auto;
}
</style>

