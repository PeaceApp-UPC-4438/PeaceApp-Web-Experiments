<script>
import { ReportApiService } from "./service/reportapi.service.js";
import { Report } from "./model/report.entity.js";
export default {
  name: "report-component",
  data() {
    return {
      report: new Report(),
      api: new ReportApiService(),
      successMessage: "",
      showSuccessMessage: false,
    };
  },
  methods: {
    async createReport() {
      try {
        await this.api.create(this.report);
        this.successMessage = "Report created successfully"; // Set success message
        this.showSuccessMessage = true; // Show the popup
        setTimeout(() => {
          this.showSuccessMessage = false; // Hide the popup after 5 seconds
        }, 5000);
        console.log("New report added:", this.report);
      } catch (error) {
        console.error("Error creating report:", error);
      }
    }
  }
};
</script>

<template>
  <div class="container-fluid px-0">
    <div class="page-container">
      <div class="profile-bg">
        <div class="form-container">
          <h1>Report Sending</h1>
          <p>Please complete the following fields to help us accurately record the incident.</p>
          <form @submit.prevent="createReport" class="form-flex">
            <div class="column">
              <div class="form-group">
                <label for="report-type" class="label-black">Type of Report:</label>
                <input v-model="report.type" id="type" type="text" name="type" placeholder="Type" required class="border-black" >
              </div>
              <label for="date" class="label-black">Date and Time:</label>
              <div class="date-time-container">
                <input v-model="report.date" id="date" type="date" name="date" required class="border-black">
                <input v-model="report.time" id="time" type="time" name="time" required class="border-black">
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="column-half">
                    <label for="district" class="label-black">District:</label>
                    <input v-model="report.district" id="district" type="text" placeholder="District" name="district" required class="border-black" >
                  </div>
                  <div class="column-half">
                    <label for="location" class="label-black">Location:</label>
                    <input v-model="report.location" id="location" type="text" placeholder="Location" name="location" required class="border-black" >
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="description" class="label-black">Description:</label>
                <textarea v-model="report.description" id="description" placeholder="Description" name="description" required class="border-black" rows="5" ></textarea>
              </div>
              <div class="form-group">
                <div class="evidence-container">
                  <label for="evidence" class="label-black">Evidence:</label>
                  <label for="file-upload" class="upload-button">Upload File</label>
                  <input type="file" id="file-upload" name="file-upload" class="file-input" style="display: none;">
                </div>
              </div>
            </div>
            <div class="column">
              <img src="../../assets/Map-Placeholder.png" alt="Map" class="map-image">
              <div class="button-container">
                <!--                <router-link to="/authority/report">-->
                <button type="submit">Send</button>
                <!--                </router-link>-->
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
  </div>
</template>

<style scoped>
.page-container {
  background-color: #01A1FF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%; /* Ensure it spans the entire width */
  color: white;
  padding: 4rem; /* Start with a moderate padding */
  left: 0;
  box-sizing: border-box; /* Include padding in the width calculation */
}
.page-container p {
  text-align: center;
  margin: 0 auto; /* Centers the <p> element horizontally */
  font-size: clamp(18px, 5vw, 32px);
  transition: background-color 0.3s;
}
.row {
  display: flex;
  justify-content: space-between; /* Distributes space evenly between the columns */
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
  flex: 1; /* Each column takes up equal space */
  padding-right: 20px; /* Adds spacing between the two columns */
}

.column-half:last-child {
  padding-right: 0; /* Removes padding from the right side of the last column */
  padding-left: 20px; /* Adds spacing on the left side of the last column to maintain consistent spacing */
}
.form-flex {
  display: flex;
  justify-content: space-between; /* Ensures there is space between the columns */
}
.map-image {
  width: 100%; /* Ensures the image takes the full width of its container */
  height: auto; /* Keeps the image's aspect ratio intact */
  max-width: 1200px; /* Adjusts the maximum width to be larger */
  display: block; /* Ensures the image doesn't have extra space below it */
  margin: 0 auto; /* Centers the image within the column */
}
.column {
  flex: 1;  /* Each column will take equal space */
  padding: 0 40px; /* Adds padding to both sides of each column */
}

.form-group.date-time-container {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Ensure equal spacing between date and time inputs */
  margin-bottom: 20px;
}

.form-group.date-time-container .label-black {
  width: auto; /* Allow labels to adjust width based on content */
  margin-right: 20px;
}

#date,
#time {
  flex: 1; /* Allow date and time inputs to expand and fill available space */
  margin-right: 10px; /* Add some spacing between date and time inputs */
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
}
.profile-bg {
  background-color: #6DC9FF;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 87%;
  margin-left: auto; /* Center aligning the element by setting left margin to auto */
  margin-right: 6%; /* Slightly less than half of the remaining space to push it a bit to the right */
  margin-top: 100px; /* Adjust this value to set how far down you want the element */
}
/* Media Query for smaller screens */
.form-group {
  margin-bottom: 20px; /* Add bottom margin to the form groups */
}
.date-time-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.date-time-container .label-black {
  width: 80px;
  margin-right: 20px;
}
.border-black {
  border: 1px solid black; /* Set the border to black */
  border-radius: 0; /* Remove rounded border */
}
.button-container {
  display: flex;
  justify-content: center; /* Aligns the button in the center */
  margin-top: 20px; /* Optional: adds some space above the button */
}
.form-container {
  flex: 1;
  padding: 40px;
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
label {
  display: block;
  font-weight: bold;
}

button {
  padding: 10px 80px;
  background-color: yellow;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #9EA016;
}
.container-fluid {
  padding-right: 0;
  padding-left: 0;
  margin-right:auto;
  margin-left:auto;
}
/* Base styles, applicable when the screen width exceeds 1100px */
/* These styles are already defined in your provided CSS */

@media (max-width: 1100px) {
  .form-container input, .form-container select, .form-container textarea, .form-container button {
    font-size: clamp(10px, 2.5vw, 12px); /* Smaller font sizes for all form elements */
  }
  .form-container label {
    font-size: clamp(10px, 2.5vw, 12px); /* Smaller yet readable font sizes for labels */
  }
  .form-container input, .form-container select, .form-container textarea, #description{
    width: 85%; /* Reduces width to 80% to make inputs narrower */
  }
  .form-group {
    margin-bottom: 10px; /* Reduced margin for tighter layout */
  }
  .button-container button {
    padding: 8px 40px; /* Reduced button padding */
  }
  .date-time-container #date,
  .date-time-container #time {
    flex: none; /* Disable flex grow to manage width manually */
    width: 40%; /* Reduce the width of each input */
    padding: 0.6em; /* Smaller padding */
    margin-right: 10px; /* Smaller margin between date and time inputs */
    font-size: clamp(10px, 2.5vw, 12px); /* Smaller font size */
  }
  /* Styles for screens up to 1100px wide */
  .page-container {
    padding: 0.01rem; /* Minimal padding to maintain layout integrity */

  }

  .form-container {
    padding: 10px;
  }
  .column-half #district,
  .column-half #location {
    width: 70%; /* Reduce the width of each input */
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
    order: -1; /* Move map above the form */
    margin-right:100px;
  }

  .button-container button {
    margin-left:-50px;
    padding: 10px 50px; /* Adjust button padding */
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
    flex-direction: column; /* Stack form columns vertically */
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
    margin-left:-50px;
  }
  .profile-bg {

    width: 80%; /* Adjust width to your desired value */
    margin-right:50px;
  }
}

@media (max-width: 480px) {
  .form-container input, .form-container select, .form-container textarea, .form-container button {
    font-size: clamp(10px, 1vw, 10px); /* Smaller font sizes for all form elements */
  }
  .form-container label {
    font-size: clamp(10px, 2.5vw, 10px); /* Smaller yet readable font sizes for labels */
  }
  .form-container input, .form-container select, .form-container textarea, #description{
    width: 75%; /* Reduces width to 80% to make inputs narrower */
  }
  .form-group {
    margin-bottom: 10px; /* Reduced margin for tighter layout */
  }
  .date-time-container #date,
  .date-time-container #time {
    flex: none; /* Disable flex grow to manage width manually */
    width: 33%; /* Reduce the width of each input */
    padding: 0.6em; /* Smaller padding */
    margin-right: 10px; /* Smaller margin between date and time inputs */
    font-size: clamp(10px, 2.5vw, 12px); /* Smaller font size */
  }

  /* Styles for screens up to 1100px wide */
  .page-container {
    padding: 0.01rem; /* Minimal padding to maintain layout integrity */
    padding-bottom: 90px; /* Add padding to the bottom */
  }
  .column-half {
    display: inline-block; /* Ensures inputs are inline */
    width: 45%; /* Adjusted width to fit side by side */
  }

  .column-half #district,
  .column-half #location {
    width: 45%; /* Adjust the width to give more room */
    padding: 0.7em; /* Consistent padding */
    margin-right: 2px; /* Reduce right margin to bring closer */
  }

  .column-half:last-child #location {
    margin-right: 0; /* No margin on the right for the last input */
  }
  .column-half:last-child label {
    position: relative;
  }
  .row {
    justify-content: space-between; /* Adjust alignment */
  }
  .column {
    padding: 0 20px; /* Slightly reduce padding */
    width: 100%; /* Make columns full width */
  }

  .map-image {
    width: 60%;
    margin-left:30px;
    order: -1; /* Move map above the form */
  }

  .button-container button {
    padding: 10px 50px; /* Adjust button padding */
  }

  .form-group {
    margin-bottom: 15px; /* Adjust spacing */
  }

  .page-container p {
    text-align: center; /* Align the paragraph to the left */

    font-size: clamp(10px, 1vw, 10px); /* Responsive font sizing */
  }

  .form-flex {
    flex-direction: column; /* Stack form columns vertically */
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
    order: -2; /* Move evidence container above the form */
    margin-bottom: 20px; /* Add margin to separate it from other elements */
    margin-left:-40px;
  }

  .button-container {
    order: -1; /* Keep button container on the same row as the evidence */
    margin-left: 10px; /* Move the button container to the right edge of the parent container */
    margin-bottom: 20px; /* Add margin to separate it from other elements */
  }
  .upload-button {
    padding: 5px 20px;  /* Increase padding to make the button larger */
    font-size: 10px;  /* Increase font size for better readability */
    background-color: white;
    border-radius: 8px;  /* Slightly larger border-radius for a more rounded look */
    cursor: pointer;
    transition: background-color 0.3s;
    color:black;
  }
  .profile-bg {

    width: 55%; /* Adjust width to your desired value */
    margin-left:10px;
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
