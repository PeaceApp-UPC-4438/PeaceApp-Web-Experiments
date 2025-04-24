<script>
import { authUserService } from '../../services/authuser.service.js'
import { CitizenApiService } from '../../services/citizenapi.service.js'

export default {
  data() {
    return {
      authService: new authUserService(),
      citizenService: new CitizenApiService(),
      confirmPassword: '',
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
      error: null
    };
  },
  methods: {
    async createUser() {
      try {
        // Password validation
        if (this.formData.password !== this.confirmPassword) {
          this.error = "Passwords do not match.";
          return;
        }

        // 1. Create the user using AuthUserService (public sign-up)
        const signUpData = {
          username: this.formData.email,
          password: this.formData.password,
          role: 'citizen'
        };
        const userResponse = await this.authService.signUp(signUpData);
        console.log("User created:", userResponse);

        // 2. Authenticate the newly created user to retrieve token
        const loginResponse = await this.authService.signInUser(this.formData.email, this.formData.password);
        if (loginResponse.status === 200) {
          const user = loginResponse.data;
          localStorage.setItem('userEmail', user.username);
          localStorage.setItem('userRole', 'citizen');
          localStorage.setItem('authToken', user.token);
        }

        // 3. Create the citizen entry
        const citizenData = {
          firstName: this.formData.firstname,
          lastName: this.formData.lastname,
          email: this.formData.email,
          street: this.formData.address,
          number: "S/N",
          city: this.formData.city,
          postalCode: "00000",
          country: "Peru"
        };

        const citizenResponse = await this.citizenService.createCitizen(citizenData);
        console.log("Citizen created:", citizenResponse);

        // 4. Redirect to profile
        setTimeout(() => {
          this.$router.push({ path: '/profile' });
        }, 3000);

      } catch (error) {
        console.error("Error creating user:", error);
        this.error = error?.response?.data?.message || "Registration error.";
      }
    },

    async submit() {
      this.error = null;
      await this.createUser();
    }
  }
}
</script>

<template>
  <form class="form" @submit.prevent="submit()">
    <p class="message">{{ $t('userForm.message') }}</p>
    <div class="flex">
      <input :placeholder="$t('userForm.firstname')" class="input-style" type="text" id="input" required="" v-model="formData.firstname">
      <input :placeholder="$t('userForm.lastname')" class="input-style" type="text" id="input" required="" v-model="formData.lastname">
    </div>
    <div class="flex">
      <input :placeholder="$t('userForm.email')" class="input-style" type="email" id="input" required="" v-model="formData.email">
      <input :placeholder="$t('userForm.address')" class="input-style" type="text" id="input" required="" v-model="formData.address">
    </div>
    <div class="flex">
      <input :placeholder="$t('userForm.district')" class="input-style" type="text" id="input" required="" v-model="formData.district">
      <input :placeholder="$t('userForm.city')" class="input-style" type="text" id="input" required="" v-model="formData.city">
    </div>
    <div class="flex">
      <input :placeholder="$t('userForm.password')" class="input-style" type="password" required v-model="confirmPassword">
      <input :placeholder="$t('userForm.confirm_password')" class="input-style" type="password" required v-model="formData.password">
    </div>
    <label class="material-checkbox">
      <input type="checkbox" required>
      <span class="checkmark"></span>
      {{ $t('userForm.terms') }}
    </label>
    <button type="submit">{{ $t('userForm.submit') }}</button>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
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
  background-color: #55B0DB;
  box-sizing: border-box;
}

.message {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
}

.flex {
  display: flex;
  gap: 10px;
  width: 100%;
  margin-bottom: 10px;
}

.input-style {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
  box-sizing: border-box;
}

button {
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  background-color: #fff;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 200px;
  margin-top: 10px;
}

button:hover {
  background-color: #eee;
}

.material-checkbox {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #444;
  margin-top: 10px;
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
  box-shadow: 0 0 0 2px #1C597C;
}

.material-checkbox:hover input[type="checkbox"] ~ .checkmark {
  border-color: #1F79AA;
}

.material-checkbox input[type="checkbox"]:disabled ~ .checkmark {
  opacity: 0.5;
  cursor: not-allowed;
}

.material-checkbox input[type="checkbox"]:disabled ~ .checkmark:hover {
  border-color: #4d4d4d;
}

@media (max-width: 768px) {
  .form {
    padding: 15px;
    width: 95%;
  }

  .flex {
    flex-direction: column;
    gap: 8px;
  }

  .input-style {
    width: 100%;
  }

  button {
    width: 100%;
    max-width: none;
  }

  .material-checkbox {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .form {
    padding: 10px;
  }

  .message {
    font-size: 13px;
  }

  .input-style {
    font-size: 13px;
  }

  button {
    font-size: 14px;
    padding: 8px;
  }
}
</style>

