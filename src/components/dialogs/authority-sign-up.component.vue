<script>
import AuthorityVerification from './authority-verification.component.vue';
import {UserApiService} from "../../services/userapi.service.js";
import {AuthorityApiService} from "../../services/authorityapi.service.js";

export default {
  components: {
    AuthorityVerification
  },
  data() {
    return {
      userService: new UserApiService(),
      authorityService: new AuthorityApiService(),
      users: [],
      visible: false,
      userData: {
        email:  '',
        password: '',
        role: 'authority'
      },
      formData: {
        name: '',
        email: '',
        password: '',
        contactNumber: '',
        address: '',
        description: '',
        profileImage: 'https://picsum.photos/200/300'
      },
      exists: false,
      error: null
    };
  },
  methods: {

    async getAllUsers() {
      try {
        const response = await this.userService.getAllUsers();
        this.users = response.data;
        console.log("All users: ", response.data);
      } catch (error) {
        console.log("Error getting users: ", error);
      }
    },

    async getExistingUser() {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].email === this.formData.email) {
          this.exists = true;
          console.log("User already exists");
          return true;
        }
      }
      this.exists = false;
      return false;
    },

    async createUser() {
        try {
          this.userData.email = this.formData.email;
          this.userData.password = this.formData.password;
          const userResponse = await this.userService.createUser(this.userData);
          console.log("User successfully created: ", userResponse);

          const authorityResponse = await this.authorityService.createAuthority(this.formData);
          console.log("Authority successfully created: ", authorityResponse);
          this.visible = true;
        } catch (error) {
          console.log("Error creating authority: ", error);
        }
    },

    async submit() {
      console.log(this.formData);
      await this.getAllUsers();
      const userExists = await this.getExistingUser();

      if(!userExists) {
        await this.createUser();
      } else {
        this.error = "User with this email already exists.";
      }
    }
  }
}

</script>

<template>
  <form class="form" @submit.prevent="submit()">
    <p class="message">{{ $t('authorityForm.message') }}</p>
    <div class="flex">
      <input :placeholder="$t('authorityForm.municipality_name')" class="input-style" type="text" id="input" required="" v-model="formData.name">
      <input :placeholder="$t('authorityForm.email')" class="input-style" type="email" id="input" required="" v-model="formData.email">
    </div>
    <div class="flex">
      <input :placeholder="$t('authorityForm.password')" class="input-style" type="password" id="input" required="">
      <input :placeholder="$t('authorityForm.confirm_password')" class="input-style" type="password" id="input" required="" v-model="formData.password">
    </div>
    <div class="flex">
      <input :placeholder="$t('authorityForm.address')" class="input-style" type="text" id="input" required="" v-model="formData.address">
      <input :placeholder="$t('authorityForm.contact_number')" class="input-style" type="text" id="input" required="" v-model="formData.contactNumber">
    </div>
    <textarea :placeholder="$t('authorityForm.description')" class="input-style description" rows="5" cols="30" required="" v-model="formData.description"/>
    <label class="material-checkbox">
      <input type="checkbox" required>
      <span class="checkmark"></span>
      {{ $t('authorityForm.terms_and_policies') }}
    </label>
    <button class="submit">{{ $t('authorityForm.next') }}</button>
  </form>
  <Dialog v-model:visible="visible" modal :header="$t('authorityForm.subscription_header')" :style="{ width: '65vw' }" :breakpoints="{ '1199px': '85vw', '575px': '90vw' }">
    <AuthorityVerification/>
  </Dialog>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 20px;
  position: relative;
  align-items: center;
  justify-content: center;
}
.description {
  width: 100%;
  height: 100px;
  resize: none;
}

.message {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
}
.flex {
  display: flex;
  width: 100%;
  gap: 20px;

}
.input-style{
  margin: 10px 0;
}

button {
  border: none;
  outline: none;
  background-color: #EEF221;
  padding: 10px;
  border-radius: 10px;
  color: #161616;
  font-size: 16px;
  font-weight: bolder;
}

.material-checkbox {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #777777;
  cursor: pointer;
}

.material-checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkmark {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 12px;
  border: 2px solid #454B00;
  border-radius: 4px;
  transition: all 0.3s;
}

.material-checkbox input[type="checkbox"]:checked ~ .checkmark {
  background-color: #2F3300;
  border-color: #454B00;
}

.material-checkbox input[type="checkbox"]:checked ~ .checkmark:after {
  content: "";
  position: absolute;
  top: 2px;
  left: 6px;
  width: 4px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.material-checkbox input[type="checkbox"]:focus ~ .checkmark {
  box-shadow: 0 0 0 2px #dfec5065;
}

.material-checkbox:hover input[type="checkbox"] ~ .checkmark {
  border-color: #C3CF34;
}

.material-checkbox input[type="checkbox"]:disabled ~ .checkmark {
  opacity: 0.5;
  cursor: not-allowed;
}

.material-checkbox input[type="checkbox"]:disabled ~ .checkmark:hover {
  border-color: #4d4d4d;
}


@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
}
@media (max-width: 768px) {
  .form {
    padding: 0;
  }
  .flex {
    flex-direction: column;
  }
  .input-style {
    width: 100%;
  }
}
</style>