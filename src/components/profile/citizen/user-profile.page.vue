<template>
  <div>
    <header>
      <CitizenToolbar />
    </header>
    <div class="padre">
      <div class="container">
        <div class="left">
          <img :src="citizen.profileImage" alt="Usuario" class="img" />
        </div>
        <div class="right">
          <p>{{ $t('profile.user.full_name') }} {{ citizen.firstname + citizen.lastname }}</p>
          <p>{{ $t('profile.user.email')}} {{ citizen.email }}</p>
          <p>Address {{citizen.address}}</p>
          <p>{{$t('profile.user.district')}} {{citizen.district}}</p>
          <p>City {{citizen.city}}</p>
        </div>
        <div class="buttons">
          <button @click="openPopup">Edit Profile</button>
          <button @click="logout">Log Out</button>
          <button>Delete Account</button>
        </div>
      </div>
    </div>

    <!-- Popup de Edición de Perfil -->
    <div class="popup-container" v-if="showPopup">
      <div class="popup">
        <header>
          <CitizenToolbar />
        </header>
        <div class="padre">
          <div class="container">
            <div class="left">
              <img :src="editedCitizen.profileImage" alt="Usuario" class="img" />
            </div>
            <div class="right">
              <form @submit.prevent="updateProfile">
                <div>
                  <label for="firstname">{{ $t('profile.user.first_name') }}</label>
                  <input type="text" id="firstname" v-model="editedCitizen.firstname" required />
                </div>
                <div>
                  <label for="lastname">{{ $t('profile.user.last_name') }}</label>
                  <input type="text" id="lastname" v-model="editedCitizen.lastname" required />
                </div>
                <div>
                  <label for="email">{{ $t('profile.user.email') }}</label>
                  <input type="email" id="email" v-model="editedCitizen.email" required />
                </div>
                <div>
                  <label for="address">{{ $t('profile.user.address') }}</label>
                  <input type="text" id="address" v-model="editedCitizen.address" />
                </div>
                <div>
                  <label for="district">{{ $t('profile.user.district') }}</label>
                  <input type="text" id="district" v-model="editedCitizen.district" />
                </div>
                <div>
                  <label for="city">{{ $t('profile.user.city') }}</label>
                  <input type="text" id="city" v-model="editedCitizen.city" />
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
    </div>
  </div>
</template>

<script>
import CitizenToolbar from "../../toolbar/toolbarCitizen.component.vue";

export default {
  components: {
    CitizenToolbar
  },
  props: {
    citizen: Object
  },
  data() {
    return {
      editedCitizen: { ...this.citizen },
      showPopup: false
    };
  },
  methods: {
    updateProfile() {
      console.log('Updating profile:', this.editedCitizen);
      this.closePopup();
      // Aquí iría la lógica para enviar los cambios al backend
    },
    deleteAccount() {
      console.log('Deleting account:', this.editedCitizen);
      this.closePopup();
      // Aquí iría la lógica para eliminar la cuenta en el backend
    },
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
    logout() {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: #6DC9FF; /* Color de fondo del popup */
  border-radius: 10px;
  padding: 20px;
  width: 70%; /* Ancho del popup */
  max-width: 600px; /* Ancho máximo del popup */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Sombra ligera */
}

.padre {
  padding: 0;
}

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
  width: 30%;
}

button:hover {
  background-color: #9EA016;
}

.container {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin: auto;
}

.img {
  height: auto;
  border: 1px solid black;
  border-radius: 100%;
}

.left {
  display: flex;
  align-items: center;
  padding: 3vh;
  margin: 0 auto;
}

.right {
  font-family: 'Montserrat', sans-serif;
  color: black;
  text-align: justify;
  font-weight: bold;
  font-size: 18px;
  padding: 3vh;
  flex: 1;
}

form {
  display: flex;
  flex-direction: column;
}

form > div {
  margin-bottom: 1em;
}

.buttons {
  flex: 100%;
  padding: 0 0 3vh 0;
}

@media (max-width: 1000px) {
  .popup {
    width: 90%; /* Ajustar ancho del popup para dispositivos móviles */
  }
}
</style>
