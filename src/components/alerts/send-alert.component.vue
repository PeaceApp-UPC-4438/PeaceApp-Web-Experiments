<template>
  <div v-if="showPopup">
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    togglePopup: Function,
  },
  data() {
    return {
      showPopup: false,
      closeDelay: 2000,
    };
  },
  methods: {
    closePopup() {
      setTimeout(() => {
        this.showPopup = false;
        this.togglePopup();
      }, this.closeDelay);
    },
  },
  updated() { // Use updated lifecycle hook to show popup on message change
    if (this.message) {
      this.showPopup = true;
      this.closePopup(); 
    }
  },
};
</script>

<style>
</style>
