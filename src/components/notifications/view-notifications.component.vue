<template>
  <div class="Notification-list">
    <h2>Notifications and alerts</h2>

    <ul class="Notification-items">
      <li v-for="Notification in sortedNotifications" :key="Notification.id">
        <div class="Notification-info">
          <span class="Notification-location">{{ Notification.location }}</span>
          <span class="Notification-severity">{{ Notification.severity }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    Notifications: {
      type: Array,
      required: true,
    },
    addNotification: {
      type: Function,
      required: true,
    },
  },
  computed: {
    sortedNotifications() {
      // Sort reports based on severity (high, medium, low)
      return this.Notifications.sort((a, b) => {
        if (a.severity === 'Alto') return -1;
        if (b.severity === 'Alto') return 1;
        if (a.severity === 'Medio') return -1;
        if (b.severity === 'Medio') return 1;
        return 0;
      });
    },
  },
};
</script>

<style scoped>
.Notification-list {
  background-color: #6dc9ff;
  color: #000000;
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.Notification-items {
  list-style: none;
  padding: 0;
}

.Notification-items li {
  background-color: #ffffff;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 2px;
}

.Notification-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.Notification-location {
  font-weight: bold;
}

.Notification-severity {
  color: red; /* Adjust color based on severity */
}
</style>
