<template>
  <div class="popup">
    <form @submit.prevent="updateProfile">
      <div class="flex">
        <input :placeholder="$t('userEdit.first_name')" class="input-style" type="text" v-model="firstname" required />
        <input :placeholder="$t('userEdit.last_name')" class="input-style" type="text" v-model="lastname" required />
      </div>
      <div class="flex">
        <input :placeholder="$t('userEdit.email')" class="input-style" type="email" v-model="email" required />
        <input :placeholder="$t('userEdit.address')" class="input-style" type="text" v-model="street" required />
      </div>
      <div class="flex">
        <input :placeholder="$t('userEdit.district')" class="input-style" type="text" v-model="number" required />
        <input :placeholder="$t('userEdit.city')" class="input-style" type="text" v-model="city" required />
      </div>
      <div class="flex">
        <input :placeholder="$t('userEdit.postalCode')" class="input-style" type="text" v-model="postalCode" required />
        <input :placeholder="$t('userEdit.country')" class="input-style" type="text" v-model="country" required />
      </div>
      <div class="flex">
        <input class="input-style" type="file" accept="image/*" @change="handleImageUpload" />
      </div>
      <div class="image-container" v-if="profileImage">
        <img :src="profileImage" alt="Preview" class="preview-img" />
      </div>
      <div class="buttons">
        <button type="submit">Save Changes</button>
        <button type="button" @click="closePopup">Cancel</button>
        <button type="button" @click="deleteAccount">Delete Account</button>
      </div>
    </form>
  </div>
</template>

<script>
import { CitizenApiService } from '../../../services/citizenapi.service.js';

export default {
  props: {
    citizen: Object,
  },
  data() {
    const fullNameParts = this.citizen.fullName?.split(' ') || [''];
    return {
      firstname: fullNameParts[0] || '',
      lastname: fullNameParts.slice(1).join(' ') || '',
      email: this.citizen.email || '',
      profileImage: this.citizen.profileImage || '',
      street: this.citizen.street || '',
      number: this.citizen.number || '',
      city: this.citizen.city || '',
      postalCode: this.citizen.postalCode || '',
      country: this.citizen.country || '',
      citizenService: new CitizenApiService(),
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async updateProfile() {
      await this.citizenService.updateCitizen(this.citizen.id, {
        firstName: this.firstname,
        lastName: this.lastname,
        email: this.email,
        street: this.street,
        number: this.number,
        city: this.city,
        postalCode: this.postalCode,
        country: this.country,
        profileImage: this.profileImage
      });
      this.closePopup();
      window.location.reload();
    },
    async deleteAccount() {
      const confirmDelete = confirm(this.$t('userEdit.confirmDelete'));

      if (!confirmDelete) return;

      try {
        await this.citizenService.deleteCitizen(this.citizen.id);
        localStorage.clear();
        this.$router.push("/login");
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("There was an issue deleting your account.");
      }
    },
    closePopup() {
      this.$emit('close');
    },
  },
};
</script>


<style scoped>
.popup {
  background-color: #55B0DB;
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: auto;
}

.flex {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.input-style {
  flex: 1;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.preview-img {
  width: 100px;
  height: 100px;
  margin-top: 10px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.image-container {
  display: flex;
  justify-content: center;
}

.buttons {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px;
  flex: 1;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #eee;
}

/* Responsive styles */
@media (max-width: 768px) {
  .popup {
    width: 95%;
    padding: 15px;
  }

  .flex {
    flex-direction: column;
  }

  .buttons {
    flex-direction: column;
  }

  .input-style,
  button {
    width: 100%;
  }

  .preview-img {
    width: 80px;
    height: 80px;
  }
}
</style>
