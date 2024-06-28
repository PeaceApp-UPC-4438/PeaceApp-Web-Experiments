<template>
  <div class="popup">
    <form @submit.prevent="updateProfile">
      <div class="flex">
        <input :placeholder="$t('authorityEdit.municipality_name')" class="input-style" type="text" id="name" v-model="authority.name" required />
        <input :placeholder="$t('authorityEdit.contact_number')" class="input-style" type="text" id="contactNumber" required="" v-model="authority.contactNumber">
      </div>
      <div class="flex">
        <input :placeholder="$t('authorityEdit.email')" class="input-style" type="email" id="email" required="" v-model="authority.email">
        <input :placeholder="$t('authorityEdit.address')" class="input-style" type="text" id="address" required="" v-model="authority.address">
      </div>
      <div class="flex">
        <input :placeholder="$t('authorityEdit.profile_picture')" class="input-style" type="text" id="profileImage" v-model="authority.profileImage">
      </div>
      <div class="flex">
        <Textarea :placeholder="authority.description" class="input-style" type="text" id="district" required="" v-model="authority.description"/>
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
import {AuthorityApiService} from '../../../services/authorityapi.service.js';
export default {
  props: {
    authority: Object,
  },
  data() {
    return {
      authorityService: new AuthorityApiService()
    };
  },
  methods: {
    updateProfile() {
      console.log('Updating profile:', this.authority);
      this.closePopup();
      this.authorityService.updateAuthority(this.authority.id, this.authority);
      localStorage.setItem('citizen', JSON.stringify(this.authority));
    },
    deleteAccount() {
      console.log('Deleting account:', this.authority);
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
#profileImage, textarea{
  width: 97%;
}
textarea{
  height: 100px;
  resize: none;
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
  .flex, .buttons {
    flex-direction: column;
  }
  button, input, textarea {
    width: 98%;
  }
}
</style>