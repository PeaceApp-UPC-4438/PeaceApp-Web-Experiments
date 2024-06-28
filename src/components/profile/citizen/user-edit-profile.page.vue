<template>
  <div class="popup">
    <form @submit.prevent="updateProfile">
      <div class="flex">
        <input :placeholder="$t('profile.user.first_name')" class="input-style" type="text" id="firstname" v-model="citizen.firstname" required />
        <input :placeholder="$t('profile.user.last_name')" class="input-style" type="text" id="lastname" required="" v-model="citizen.lastname">
      </div>
      <div class="flex">
        <input :placeholder="$t('profile.user.email')" class="input-style" type="email" id="email" required="" v-model="citizen.email">
        <input :placeholder="$t('profile.user.address')" class="input-style" type="text" id="address" required="" v-model="citizen.address">
      </div>
      <div class="flex">
        <input :placeholder="$t('profile.user.district')" class="input-style" type="text" id="district" required="" v-model="citizen.district">
        <input :placeholder="$t('profile.user.city')" class="input-style" type="text" id="city" required="" v-model="citizen.city">
      </div>
      <div class="buttons">
        <button type="submit">Save Changes</button>
        <button @click="closePopup">Cancel</button>
        <button @click="deleteAccount">Delete Account</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  props: {
    citizen: Object
  },
  methods: {
    updateProfile() {
      console.log('Updating profile:', this.citizen);
      this.closePopup();
      // this.citizenService.updateCitizen(this.citizen.id, this.citizen);
      localStorage.setItem('citizen', JSON.stringify(this.citizen));
    },
    deleteAccount() {
      console.log('Deleting account:', this.citizen);
      this.closePopup();
      // Aquí iría la lógica para eliminar la cuenta en el backend
    },
    closePopup() {
      this.$emit('close');
    }
  }
};
</script>
<style scoped>
.flex {
  display: flex;
  width: 100%;
}
.popup {
  background-color: #6DC9FF; /* Color de fondo del popup */
  border-radius: 10px;
  padding: 20px;
  width: 70%; /* Ancho del popup */
  max-width: 600px; /* Ancho máximo del popup */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Sombra ligera */
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
button{
  font-size: 15px;
}
@media (max-width: 1000px) {
  .popup {
    width: 90%; /* Ajustar ancho del popup para dispositivos móviles */
  }
}
</style>