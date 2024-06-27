<script>
import {UserApiService} from '../../services/userapi.service.js'
import {CitizenApiService} from '../../services/citizenapi.service.js'
export default {
  data() {
    return {
      userService: new UserApiService(),
      citizenService: new CitizenApiService(),
      users: [],
      visible: false,
      userData: {
        email:  '',
        password: '',
        role: 'citizen'
      },
      formData: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        address: '',
        district: '',
        city: '',
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

        const citizenResponse = await this.citizenService.createCitizen(this.formData);
        console.log("Citizen successfully created: ", citizenResponse);
      } catch (error) {
        console.log("Error creating user: ", error);
      }
    },

    async submit() {
      console.log(this.formData);
      await this.getAllUsers();
      const userExists = await this.getExistingUser();

      if (!userExists) {
        await this.createUser();
      } else {
        this.error = "User with this email already exists.";
      }
    }

  }
}
</script>

<template>
  <div class="container">
    <form class="form" @submit.prevent="submit()">
      <p class="message">{{ $t('userForm.message') }}</p>
      <div class="flex">
        <label>
          <input class="input" type="text" placeholder="" required="" v-model="formData.firstname">
          <span>{{ $t('userForm.firstname') }}</span>
        </label>
        <label>
          <input class="input" type="text" placeholder="" required="" v-model="formData.lastname">
          <span>{{ $t('userForm.lastname') }}</span>
        </label>

      </div>
      <div class="flex">
        <label>
          <input class="input" type="password" placeholder="" required="">
          <span>{{ $t('userForm.password') }}</span>
        </label>
        <label>
          <input class="input" type="password" placeholder="" required="" v-model="formData.password">
          <span>{{ $t('userForm.confirm_password') }}</span>
        </label>
      </div>
      <div class="flex">
        <label>
          <input class="input" type="text" placeholder="" required="" v-model="formData.address">
          <span>Address</span>
        </label>
        <label>
          <input class="input" type="text" placeholder="" required="" v-model="formData.district">
          <span>District</span>
        </label>
      </div>
      <div class="flex">
        <label>
          <input class="input" type="email" placeholder="" required="" v-model="formData.email">
          <span>{{ $t('userForm.email') }}</span>
        </label>
        <label>
          <input class="input" type="text" placeholder="" required="" v-model="formData.city">
          <span>City</span>
        </label>
      </div>
      <label class="material-checkbox">
        <input type="checkbox" required>
        <span class="checkmark"></span>
        {{ $t('userForm.terms') }}
      </label>
        <button type="submit" >{{ $t('userForm.submit') }}</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 20px;
  position: relative;
  align-items: center;
  justify-content: center;
}


.message {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
}


.flex {
  display: flex;
  gap: 15px;
}

.form label {
  position: relative;
}

.form label .input {
  width: 210px;
  padding: 10px 10px 20px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
}

.form label .input + span {
  position: absolute;
  left: 10px;
  top: 15px;
  color: grey;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.form label .input:placeholder-shown + span {
  top: 15px;
  font-size: 0.9em;
}

.form label .input:focus + span,.form label .input:valid + span {
  top: 0;
  font-size: 0.7em;
  font-weight: 600;
}

.form label .input:valid + span {
  color: green;
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
</style>