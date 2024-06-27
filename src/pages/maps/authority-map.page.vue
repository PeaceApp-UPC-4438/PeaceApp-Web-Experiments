<script setup>
import AuthorityToolbar from "../../components/toolbar/toolbarAuthority.component.vue";
const center = { lat: -12.051578172100546, lng: -77.03460936232625 }

const heatmapData = [
  { location: { lat: center.lat + 0.01, lng: center.lng - 0.014 }, weight: 0.5 },
  { lat: center.lat + 0.01, lng: center.lng - 0.012 },
  { location: { lat: center.lat + 0.01, lng: center.lng - 0.01 }, weight: 2 },
  { location: { lat: center.lat + 0.01, lng: center.lng - 0.008 }, weight: 3 },
  { location: { lat: center.lat + 0.01, lng: center.lng - 0.006 }, weight: 2 },
  { lat: center.lat + 0.01, lng: center.lng - 0.004 },
  { location: { lat: center.lat + 0.01, lng: center.lng - 0.002 }, weight: 0.5 },

  { location: { lat: center.lat + 0.015, lng: center.lng - 0.014 }, weight: 3 },
  { location: { lat: center.lat + 0.015, lng: center.lng - 0.012 }, weight: 2 },
  { lat: center.lat + 0.015, lng: center.lng - 0.01 },
  { location: { lat: center.lat + 0.015, lng: center.lng - 0.008 }, weight: 0.5 },
  { lat: center.lat + 0.015, lng: center.lng - 0.006 },
  { location: { lat: center.lat + 0.015, lng: center.lng - 0.004 }, weight: 2 },
  { location: { lat: center.lat + 0.015, lng: center.lng - 0.002 }, weight: 3 },
];


</script>

<template>
  <header>
    <AuthorityToolbar/>
  </header>
  <div class="container">
    <div class="heat-map">
      <h1 class="titulo">{{ $t('map.title') }}</h1>
      <google-map class="map"
                  api-key="AIzaSyBB4hK1VH2foUTaaahuKRwInGzBvZyeX4s"
                  :libraries="['visualization']"
                  style="width: 100%; height: 500px"
                  :center="center"
                  :zoom="15"
      >
        <heatmap :options="{ data: heatmapData }" />
      </google-map> <!-- google-map -->
    </div> <!-- heat-map -->
  </div> <!-- container -->
</template>

<style scoped>
.container {
  background-color: #01A1FF;
  padding: 70px 0 0 0;
}
.heat-map {
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
.map {
  margin-bottom: 35px;
}
@media (min-width: 768px) {
  .titulo {
    font-size: 48px;
    margin-bottom: 10px;
  }
  .map {
    margin: 0;
  }
}
</style>