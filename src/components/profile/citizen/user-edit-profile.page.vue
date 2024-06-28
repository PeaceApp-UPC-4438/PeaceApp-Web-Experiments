<template>
  <div class="popup">
    <div class="padre">
      <div class="container">
        <div class="right">
          <form @submit.prevent="updateProfile">
            <div>
              <label for="firstname">{{ $t('profile.user.first_name') }}</label>
              <input type="text" id="firstname" v-model="citizen.firstname" required />
            </div>
            <div>
              <label for="lastname">{{ $t('profile.user.last_name') }}</label>
              <input type="text" id="lastname" v-model="citizen.lastname" required />
            </div>
            <div>
              <label for="email">{{ $t('profile.user.email') }}</label>
              <input type="email" id="email" v-model="citizen.email" required />
            </div>
            <div>
              <label for="address">{{ $t('profile.user.address') }}</label>
              <input type="text" id="address" v-model="citizen.address" />
            </div>
            <div>
              <label for="district">{{ $t('profile.user.district') }}</label>
              <input type="text" id="district" v-model="citizen.district" />
            </div>
            <div>
              <label for="city">{{ $t('profile.user.city') }}</label>
              <input type="text" id="city" v-model="citizen.city" />
            </div>
            <div class="buttons">
              <button type="submit">Save Changes</button>
              <button @click="closePopup">Cancel</button>
              <button @click="deleteAccount">Delete Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
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
.popup {
  background-color: #6DC9FF; /* Color de fondo del popup */
  border-radius: 10px;
  padding: 20px;
  width: 70%; /* Ancho del popup */
  max-width: 600px; /* Ancho máximo del popup */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Sombra ligera */
}
@media (max-width: 1000px) {
  .popup {
    width: 90%; /* Ajustar ancho del popup para dispositivos móviles */
  }
}
</style>