<script>
import { ReportApiService } from "../../services/reportapi.service.js";
import CitizenToolbar from "../../components/toolbar/toolbarCitizen.component.vue";
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
        evidence: "",
        user: {}
      },
      api: new ReportApiService(),
      successMessage: "",
      showSuccessMessage: false,
      citizen: {}
    };
  },
  methods: {
    async createReport() {
      await this.new();

      setTimeout(() => {
        this.$router.push({ name: 'reportlist' });
      }, 3000);
    },
    async new(){
      this.citizen = JSON.parse(localStorage.getItem('citizen'));
      this.reportData.user = this.citizen;
      try {
        await this.api.create(this.reportData);
        this.successMessage = "Report created successfully"; // Set success message
        this.showSuccessMessage = true; // Show the popup
        setTimeout(() => {
          this.showSuccessMessage = false; // Hide the popup after 5 seconds
        }, 5000);
        console.log("New report added:", this.reportData);
      } catch (error) {
        console.error("Error creating report:", error);
      }
    }
  }
};
</script>

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
              <label for="report-type" class="label-black">{{$t('reportForm.type')}}</label>
              <input :placeholder="$t('reportForm.placeholders.type')" class="input-style" type="text" id="input" required="" v-model="reportData.type">
            </div>
            <label for="date" class="label-black">{{ $t('reportForm.dateTime') }}</label>
            <div class="date-time-container">
              <input v-model="reportData.date" id="date" type="date" name="date" required class="input-style">
              <input v-model="reportData.time" id="time" type="time" name="time" required class="input-style">
            </div>
            <div class="form-group row">
              <div class="column-half">
                <label for="district" class="label-black">{{ $t('reportForm.district') }}</label>
                <select v-model="reportData.district" id="district" name="district" required class="input-style">
                  <option value="Ancon">Ancón</option>
                  <option value="Ate">Ate</option>
                  <option value="Barranco">Barranco</option>
                  <option value="Brena">Breña</option>
                  <option value="Carabayllo">Carabayllo</option>
                  <option value="Cercado de Lima">Cercado de Lima</option>
                  <option value="Chaclacayo">Chaclacayo</option>
                  <option value="Chorrillos">Chorrillos</option>
                  <option value="Cieneguilla">Cieneguilla</option>
                  <option value="Comas">Comas</option>
                  <option value="El Agustino">El agustino</option>
                  <option value="Independencia">Independencia</option>
                  <option value="Jesus Maria">Jesús maría</option>
                  <option value="La Molina">La molina</option>
                  <option value="La Victoria">La victoria</option>
                  <option value="Lince">Lince</option>
                  <option value="Los Olivos">Los olivos</option>
                  <option value="Lurigancho">Lurigancho</option>
                  <option value="Lurin">Lurín</option>
                  <option value="Magdalena del Mar">Magdalena del mar</option>
                  <option value="Miraflores">Miraflores</option>
                  <option value="Pachacamac">Pachacámac</option>
                  <option value="Pucusana">Pucusana</option>
                  <option value="Pueblo Libre">Pueblo libre</option>
                  <option value="Puente Piedra">Puente piedra</option>
                  <option value="Punta Hermosa">Punta hermosa</option>
                  <option value="Punta Negra">Punta negra</option>
                  <option value="Rimac">Rímac</option>
                  <option value="San Bartolo">San bartolo</option>
                  <option value="San Borja">San borja</option>
                  <option value="San Isidro">San isidro</option>
                  <option value="San Juan de Lurigancho">San Juan de Lurigancho</option>
                  <option value="San Juan de Miraflores">San Juan de Miraflores</option>
                  <option value="San Luis">San Luis</option>
                  <option value="San Martin de Porres">San Martin de Porres</option>
                  <option value="San Miguel">San Miguel</option>
                  <option value="Santa Anita">Santa Anita</option>
                  <option value="Santa Maria del Mar">Santa María del Mar</option>
                  <option value="Santa Rosa">Santa Rosa</option>
                  <option value="Santiago de Surco">Santiago de Surco</option>
                  <option value="Surquillo">Surquillo</option>
                  <option value="Villa el Salvador">Villa el Salvador</option>
                  <option value="Villa Maria del Triunfo">Villa Maria del Triunfo</option>
                </select>
              </div>
              <div class="column-half">
                <label for="location" class="label-black">{{ $t('reportForm.location') }}</label>
                <input v-model="reportData.location" id="location" type="text" :placeholder="$t('reportForm.placeholders.location')" name="location" required class="input-style" >
              </div>
            </div>
            <div class="form-group">
              <label for="description" class="label-black">{{ $t('reportForm.description') }}</label>
              <textarea :placeholder="$t('reportForm.description')" class="input-style" type="email" id="description" rows="3" required="" v-model="reportData.description"/>
            </div>
            <div class="form-group">
              <div class="evidence-container">
                <label for="evidence" class="label-black">{{$t('reportForm.evidence')}}</label>
                <label for="file-upload" class="upload-button">{{ $t('reportForm.upload') }}</label>
                <input type="file" id="file-upload" name="file-upload" class="file-input" style="display: none;">
              </div>
            </div>
          </div>
          <div class="column">
            <img src="../../assets/Map-Placeholder.png" alt="Map" class="map-image">
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

<style scoped>
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
}
.column-half {
  width: fit-content;/* Each column takes up equal space */
}
.form-flex {
  display: flex;
  justify-content: space-between;
}
.map-image {
  width: 90%; /* Ensures the image takes the full width of its container */
  height: auto; /* Keeps the image's aspect ratio intact */
  max-width: 1200px; /* Adjusts the maximum width to be larger */
  display: block; /* Ensures the image doesn't have extra space below it */
  margin: 15% auto; /* Centers the image within the column */
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
.button-container {
  display: flex;
  justify-content: center; /* Aligns the button in the center */
  margin-top: 20px; /* Optional: adds some space above the button */
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
  background-color: yellow;
  color: #161616;
  font-weight: bolder;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
}
button:hover {
  background-color: #9EA016;
}
.container-fluid {
  padding: 5vh 10vw 0 10vw;
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
    padding: 8px 40px;
    width: 40%;
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

  .map-image {
    width:60%;
    margin: 5% auto; /* Adjust margin for smaller screens */
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
