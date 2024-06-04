<script>
import SendAlert from '../../components/alerts/send-alert.component.vue';
import NotificationList from '../../components/notifications/view-notifications.component.vue';

export default {
  components: {
    NotificationList,
    SendAlert,
  },
  data() {
    return {
      NotificationData: [],
      alertMessage: '',
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
      this.alertMessage = 'Alert Sent'; // Set message to be displayed
    },
    hideSendAlert() {
      this.alertMessage = ''; // Clear message to hide popup
    },
  },
};
</script>

<template>
  <Toolbar/>
  <main>
    <div class="container">
      <button @click="addNotification">Update Notification</button>
      <NotificationList
          :Notifications="NotificationData"
          :addNotification="addNotification"
      />
      <button class="send-alert" @click="showSendAlert">Send Alert</button>

      <SendAlert
          :message="alertMessage"
          :togglePopup="hideSendAlert"
      />
    </div>
  </main>

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
.container {
  padding: 20vh;
  display: grid;
  place-items: center;
  text-align: center;
}
</style>