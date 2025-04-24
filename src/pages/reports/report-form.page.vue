<template>
  <header>
    <CitizenToolbar />
  </header>
  <div class="container-fluid">
    <div class="page-container">
      <div class="form-container">
        <h1>{{$t('reportForm.title')}}</h1>
        <p>{{ $t('reportForm.subtitle') }}</p>
        <form @submit.prevent="createReport" class="form-flex">
          <div class="column">
            <div class="form-group">
              <label class="label-black">{{$t('reportForm.type')}}</label>
              <input :placeholder="$t('reportForm.placeholders.type')" class="input-style" type="text" required v-model="reportData.type">
            </div>

            <label class="label-black">{{ $t('reportForm.dateTime') }}</label>
            <div class="date-time-container">
              <input v-model="reportData.date" type="date" required class="input-style">
              <input v-model="reportData.time" type="time" required class="input-style">
            </div>

            <div class="form-group row">
              <div class="column-half">
                <label class="label-black">{{ $t('reportForm.district') }}</label>
                <input v-model="reportData.district" type="text" required class="input-style" readonly />
              </div>
              <div class="column-half">
                <label class="label-black">{{ $t('reportForm.location') }}</label>
                <input v-model="reportData.location" type="text" :placeholder="$t('reportForm.placeholders.location')" required class="input-style" readonly>
              </div>
            </div>

            <div class="form-group">
              <label class="label-black">{{ $t('reportForm.description') }}</label>
              <textarea :placeholder="$t('reportForm.description')" class="input-style" rows="3" required v-model="reportData.description"></textarea>
            </div>

            <div class="form-group">
              <div class="evidence-container">
                <label class="label-black">{{$t('reportForm.evidence')}}</label>
                <label for="file-upload" class="upload-button">{{ $t('reportForm.upload') }}</label>
                <input type="file" id="file-upload" class="file-input" @change="handleFileUpload">
              </div>
            </div>
          </div>

          <div class="column">
            <div id="report-map" class="map-image"></div>
            <div class="button-container">
              <button type="submit">{{ $t('reportForm.send') }}</button>
            </div>
          </div>
        </form>

        <div v-if="successMessage" :class="{ 'success-message-overlay': true, 'show': showSuccessMessage }">
          <div class="success-message">
            {{ successMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ReportApiService } from "../../services/reportapi.service.js";
import CitizenToolbar from "../../components/toolbar/toolbarCitizen.component.vue";
import {nextTick} from "vue";

export default {
  components: {
    CitizenToolbar
  },
  name: "report-component",
  data() {
    return {
      reportData: {
        type: "",
        date: "",
        time: "",
        district: "",
        location: "",
        description: "",
        urlEvidence: "https://example.com/placeholder.jpg",
        citizenId: null
      },
      api: new ReportApiService(),
      successMessage: "",
      showSuccessMessage: false,
      map: null,
      marker: null,
      districts: [
        "Ancón", "Ate", "Barranco", "Breña", "Carabayllo", "Cercado de Lima", "Chaclacayo",
        "Chorrillos", "Cieneguilla", "Comas", "El Agustino", "Independencia", "Jesús María",
        "La Molina", "La Victoria", "Lince", "Los Olivos", "Lurigancho", "Lurín", "Magdalena del Mar",
        "Miraflores", "Pachacámac", "Pucusana", "Pueblo Libre", "Puente Piedra", "Punta Hermosa",
        "Punta Negra", "Rímac", "San Bartolo", "San Borja", "San Isidro", "San Juan de Lurigancho",
        "San Juan de Miraflores", "San Luis", "San Martín de Porres", "San Miguel", "Santa Anita",
        "Santa María del Mar", "Santa Rosa", "Santiago de Surco", "Surquillo", "Villa el Salvador",
        "Villa María del Triunfo"
      ]
    };
  },
  mounted() {
    nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    async createReport() {
      const citizen = JSON.parse(localStorage.getItem('citizen'));
      this.reportData.citizenId = citizen?.id || 0;

        this.reportData.urlEvidence = "https://example.com/placeholder.jpg";

      if (
          !this.reportData.location ||
          !this.reportData.district ||
          this.reportData.district === "Desconocido"
      ) {
        alert("Por favor, asegúrate de seleccionar una ubicación válida en el mapa.");
        return;
      }


      try {
        console.log("Datos a enviar:", JSON.stringify(this.reportData, null, 2));
        this.reportData.date = new Date(this.reportData.date).toISOString().slice(0, 10);
        this.reportData.time = this.reportData.time.padStart(5, '0');

        await this.api.create(this.reportData);
        this.successMessage = "Report created successfully";
        this.showSuccessMessage = true;

        setTimeout(() => {
          this.showSuccessMessage = false;
          this.$router.push({ name: 'reports' });
        }, 3000);
      } catch (error) {
        console.error("Error creating report:", error);
      }
    },

    handleFileUpload(event) {

    },

    initMap() {
      const defaultLocation = { lat: -12.0464, lng: -77.0428 }; // Lima

      this.map = new google.maps.Map(document.getElementById('report-map'), {
        center: defaultLocation,
        zoom: 12,
        disableDefaultUI: true,
      });

      this.marker = new google.maps.Marker({
        position: defaultLocation,
        map: this.map,
        draggable: true,
      });

      this.reportData.location = `${defaultLocation.lat}, ${defaultLocation.lng}`;
      this.updateDistrictFromCoords(defaultLocation);

      this.marker.addListener("dragend", () => {
        const pos = this.marker.getPosition();
        const latlng = { lat: pos.lat(), lng: pos.lng() };

        this.reportData.location = `${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`;
        this.updateDistrictFromCoords(latlng);
      });
    },

    updateDistrictFromCoords(latlng) {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK" && results.length > 0) {
          const addressComponents = results[0].address_components;
          const component = addressComponents.find(c =>
              c.types.includes("locality") ||
              c.types.includes("sublocality") ||
              c.types.includes("administrative_area_level_2")
          );

          if (component && typeof component.long_name === "string") {
            this.reportData.district = component.long_name;
          } else {
            this.reportData.district = "Desconocido";
          }
        } else {
          console.error("Geocoding failed:", status);
          this.reportData.district = "Desconocido";
        }
      });
    }
  }

};
</script>
<style scoped>
.map-image {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  margin: 20px 0;
}

.page-container {
  display: flex;
  align-items: center;
  width: fit-content; /* Ensure it spans the entire width */
  color: white;
  margin: auto;
}
.page-container p {
  text-align: center;
  margin: 0 auto; /* Centers the <p> element horizontally */
  font-size: clamp(18px, 5vw, 32px);
  transition: background-color 0.3s;
}
.row {
  display: flex;
}
.column-half{
  flex: 1;
}
.column-half:last-child{
  margin-left: 20px;
}
.column-half input,
.column-half select{
  width:100%;
}
.evidence-container {
  display: flex;
  align-items: center; /* Aligns items vertically in the center */
  justify-content: start; /* Aligns items to the start of the container */
  gap: 20px; /* Provides space between the label and the button */
}

.label-black {
  margin-bottom: 0; /* Removes the bottom margin to align with the button */
}

.upload-button {
  padding: 5px 60px;  /* Increase padding to make the button larger */
  font-size: 18px;  /* Increase font size for better readability */
  background-color: white;
  border-radius: 8px;  /* Slightly larger border-radius for a more rounded look */
  cursor: pointer;
  transition: background-color 0.3s;
  color:black;
}

.upload-button:hover {
  background-color: #A5A5A5;
}

.file-input {
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
  pointer-events: none;
}

.column-half {
  width: fit-content;/* Each column takes up equal space */
}
.form-flex {
  display: flex;
  justify-content: space-between;
}

.column {
  flex: 1;
  padding: 0 20px;
}

.form-group.date-time-container {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Ensure equal spacing between date and time inputs */
  margin-bottom: 20px;
}

#date,
#time {
  flex: 1;
  margin-right: 10px;
}
.date-time-container {
  display: flex;
  align-items: center;
}
.label-black {
  color: black;
  text-align: left;
  font-weight: bold;
  font-size: 1.5rem; /* Responsive font size */
}

input, select, textarea {
  width: 100%; /* Full width to be responsive within its container */
  padding: 0.8em; /* Responsive padding */
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: clamp(12px, 1.2vw, 16px);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
#description {
  width: 100%; /* Full width by default */
  height: 200px; /* Auto height to adjust based on content */
  padding: 0.8em; /* Responsive padding */
  border: 1px solid black;
  font-size: clamp(12px, 1.2vw, 16px);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  resize: none; /* Allow vertical resizing */
  margin: 0;
}
.form-container {
  background-color: #6DC9FF;
  border-radius: 24px;
  flex: 1;
  padding: 40px;
}
/* Media Query for smaller screens */
.form-group {
  margin-bottom: 20px; /* Add bottom margin to the form groups */
}
.date-time-container {
  display: flex;
  align-items: center;
  margin: 0;
}

.date-time-container .label-black {
  width: 80px;
  margin-right: 20px;
}
.button-container button {
  padding: 10px 40px;
  font-size: 20px;
  background-color: #C4E2F3;
  color: #161616;
  font-weight: bolder;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 auto;
  display: block;
}



h1 {
  color: white;
  font-size: clamp(24px, 5vw, 40px);
  transition: font-size 0.3s ease;
  margin-top: -20px; /* Add negative margin to move the <h1> element up */
}
.form-group {
  margin-bottom: 20px;
  flex: 1;
}

.form-group input, .date-time-container input{
  margin: 10px 0;
}
.date-time-container input{
  height: 40px;
}
label {
  display: block;
  font-weight: bold;
}

button {
  padding: 10px 80px;
  background-color: #C4E2F3;
  color: #161616;
  font-weight: bolder;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
}
button:hover {
  background-color: #A1B9C6;
}
.container-fluid {
  margin-top: 120px;
  padding: 0 10vw 0 10vw;
}


@media (max-width: 1000px) {
  .form-container input, .form-container select, .form-container textarea, .form-container button {
    font-size: clamp(10px, 2.5vw, 12px); /* Smaller font sizes for all form elements */
  }
  .form-container label {
    font-size: clamp(10px, 2.5vw, 12px); /* Smaller yet readable font sizes for labels */
  }

  .form-group {
    margin-bottom: 10px; /* Reduced margin for tighter layout */
  }
  .button-container button {
    padding: 10px 80px;
    font-size: 20px;
    background-color: #C4E2F3;
    color: #161616;
    font-weight: bolder;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 auto;
    display: block;
  }

  .date-time-container #date,
  .date-time-container #time {
    flex: none; /* Disable flex grow to manage width manually */
    width: 49%; /* Reduce the width of each input */
    padding: 0.6em; /* Smaller padding */
    margin-right: 10px; /* Smaller margin between date and time inputs */
    font-size: clamp(10px, 2.5vw, 12px); /* Smaller font size */
  }
  /* Styles for screens up to 1100px wide */
  .page-container {
    padding: 0.01rem; /* Minimal padding to maintain layout integrity */
  }

  .column-half #district,
  .column-half #location {
    width: 100%; /* Reduce the width of each input */
    padding: 0.7em; /* Smaller padding */
    margin-right: 5px; /* Smaller margin for the district input */
    font-size: clamp(10px, 2.5vw, 12px); /* Smaller font size */
  }
  .column-half:last-child #location {
    margin-right: 0; /* Remove margin for the last input to fit the reduced width */
  }
  .row {
    justify-content: space-between; /* Ensure inputs are closer but neatly aligned */
  }
  .column {
    padding: 0 20px; /* Slightly reduce padding */
    width: 100%; /* Make columns full width */
  }

  .form-group {
    margin-bottom: 15px; /* Adjust spacing */
  }

  .page-container p {
    text-align: center;
    margin: 0 auto; /* Centers the <p> element horizontally */
    font-size: clamp(12px, 3vw, 28px); /* Responsive font sizing */
  }

  .form-flex {
    flex-direction: column;
  }

  .column-half {
    padding: 0; /* Remove column padding */
    display: block; /* Stack inputs vertically */
  }

  .form-group.date-time-container {
    flex-direction: column; /* Stack date and time inputs vertically */
    align-items: stretch; /* Stretch inputs to fill the width */
  }

  .evidence-container {
    flex-direction: column; /* Stack evidence label and button vertically */
  }
  .form-container {
    padding: 25px;
  }
  .container-fluid{
    padding: 10vh 0 0 0; /* Adjust padding for smaller screens */
  }
}

.success-message-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Black background with transparency */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it appears above other elements */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
}

.success-message {
  background-color: #d4edda; /* Light green background */
  color: #155724; /* Dark green color for text */
  border: 1px solid #c3e6cb; /* Border to match the background */
  padding: 20px 40px; /* Padding around the text */
  border-radius: 8px; /* Rounded corners */
  font-size: 16px; /* Font size */
  text-align: center; /* Center the text */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

.success-message-overlay.show {
  opacity: 1;
  visibility: visible;
}


</style>
