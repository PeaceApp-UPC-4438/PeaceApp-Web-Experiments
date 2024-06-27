<script>
import NotificationList from '../../components/notifications/view-notifications.component.vue';
import CitizenToolbar from "../../components/toolbar/toolbarCitizen.component.vue";
export default {
  components: {
    NotificationList,
    CitizenToolbar
  },
  data() {
    return {
      NotificationData: [],
      alertMessage: '',
      successMessage: '',
      showSuccessMessage: false,
    };
  },
  methods: {

    addNotification() {
      // Generate a new report object with random severity and location
      const severityOptions = ['Alto', 'Medio', 'Bajo'];
      const randomSeverity = severityOptions[Math.floor(Math.random() * severityOptions.length)];

      const locationOptions = ['Lince', 'Los Olivos', 'Lurigancho', 'Lurín', 'Magdalena del Mar', 'Miraflores','San Isidro','La Molina','Surco'];
      const randomLocation = locationOptions[Math.floor(Math.random() * locationOptions.length)];

      const crimeOptions = ['A robbery', 'A murder', 'An assault', 'Sexual harassment'];
      const randomCrime = crimeOptions[Math.floor(Math.random() * crimeOptions.length)];

      const newNotification = {
        id: this.NotificationData.length + 1,
        location: randomCrime + " has been reported in " + randomLocation,
        severity: randomSeverity,
      };

      this.NotificationData.push(newNotification);
    },
    showSendAlert() {
      this.successMessage = "Alert has been sent";
      this.showSuccessMessage = true; // Show the popup
      setTimeout(() => {
        this.showSuccessMessage = false; // Hide the popup after 5 seconds
      }, 4000);
    }
  },
};
</script>

<template>
  <header>
    <CitizenToolbar/>
  </header>
  <main>
    <div class="container">
      <button @click="addNotification">Update Notification</button>
      <NotificationList
          :Notifications="NotificationData"
          :addNotification="addNotification"
      />
      <button class="send-alert" @click="showSendAlert">Send Alert</button>
    </div>
  </main>
  <div v-if="successMessage" :class="{ 'success-message-overlay': true, 'show': showSuccessMessage }">
    <div class="success-message">
      {{ successMessage }}
    </div>
  </div>

</template>

<style scoped>
button {
  background-color: #EEF221;
  color: #161616;
  font-weight: bolder;
  border: none;
  border-radius: 0.25em;
  padding: 0.5em 1em;
  margin: 0.5em;
  cursor: pointer;
  font-size: 20px;
  height: 45px;
}
button:hover {
  background-color: #9EA016;
}
.container {
  padding: 20vh;
  display: grid;
  place-items: center;
  text-align: center;
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

@media (max-width: 1000px) {
  .container {
    padding: 15vh 0 0 0;
  }
}
</style>