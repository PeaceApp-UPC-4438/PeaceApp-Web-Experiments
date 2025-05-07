<script>
import { authUserService } from '../../services/authuser.service.js'
import { UserApiService } from '../../services/userapi.service.js'
import user from "primevue/menu";

export default {
  data() {
    return {
      authService: new authUserService(),
      userApiService: new UserApiService(),
      confirmPassword: '',
      formData: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        phonenumber: '',
        profileImage: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
      },
      error: null
    };
  },
  methods: {
    async createUser() {
      try {
        if (this.formData.password !== this.confirmPassword) {
          this.error = "Passwords do not match.";
          return;
        }
        const signUpData = {
          username: this.formData.email,
          password: this.formData.password,
          role: 'ROLE_USER'
        };
        const userResponse = await this.authService.signUp(signUpData);
        console.log("User created:", userResponse);
        console.log("User created:", this.formData.profileImage);
        // Login
        const loginResponse = await this.authService.signInUser(this.formData.email, this.formData.password);
        let userId = null;

        if (loginResponse.status === 200) {
          const user = loginResponse.data;
          localStorage.setItem('userEmail', user.username);
          localStorage.setItem('userRole', 'ROLE_USER');
          localStorage.setItem('authToken', user.token);
          localStorage.setItem('userId', user.id);
          userId = user.id;
        }

        const userData = {
          name: this.formData.name,
          lastname: this.formData.lastname,
          email: this.formData.email,
          password: this.formData.password,
          phonenumber: this.formData.phonenumber,
          user_id: userId,
          profile_image: this.formData.profileImage
        };

        const response = await this.userApiService.createUser(userData);
        console.log("Full user profile saved:", response);

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

      // Obtener ubicación antes de crear usuario
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              localStorage.setItem("userLat", position.coords.latitude);
              localStorage.setItem("userLng", position.coords.longitude);
              this.createUser(); // continúa con el registro
            },
            (err) => {
              console.warn("No se pudo obtener ubicación:", err);
              this.createUser(); // igual continúa sin ubicación
            }
        );
      } else {
        console.warn("Geolocalización no disponible.");
        await this.createUser();
      }
    }

  }
}
</script>

<template>
  <form class="form" @submit.prevent="submit()">
    <p class="message">{{ $t('userForm.message') }}</p>
    <div class="flex">
      <input :placeholder="$t('userForm.firstname')" class="input-style" type="text" required v-model="formData.name">
      <input :placeholder="$t('userForm.lastname')" class="input-style" type="text" required v-model="formData.lastname">
    </div>
    <div class="flex">
      <input :placeholder="$t('userForm.email')" class="input-style" type="email" required v-model="formData.email">
      <input :placeholder="$t('userForm.phone')" class="input-style" type="text" required v-model="formData.phonenumber">
    </div>
    <div class="flex">
      <input :placeholder="$t('userForm.password')" class="input-style" type="password" required v-model="formData.password">
      <input :placeholder="$t('userForm.confirm_password')" class="input-style" type="password" required v-model="confirmPassword">
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

