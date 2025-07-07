<script>
import { authUserService } from "../../services/authuser.service.js";
import { UserApiService } from "../../services/userapi.service.js";

export default {
  data() {
    return {
      authService: new authUserService(),
      userApiService: new UserApiService(),
      confirmPassword: '',
      isSubmitting: false, // NUEVO: para evitar registros dobles
      formData: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        phonenumber: '',
        profileImage: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
      },
      error: null,
      success: null
    };
  },
  methods: {
    validateInputs() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{9}$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

      if (!emailRegex.test(this.formData.email)) {
        this.error = "Invalid email format.";
        return false;
      }
      if (!phoneRegex.test(this.formData.phonenumber)) {
        this.error = "Phone number must be exactly 9 digits.";
        return false;
      }
      if (!passwordRegex.test(this.formData.password)) {
        this.error = "Password must be at least 8 characters, with uppercase, lowercase, number, and special character.";
        return false;
      }
      if (this.formData.password !== this.confirmPassword) {
        this.error = "Passwords do not match.";
        return false;
      }
      return true;
    },

    async createUser() {
      if (this.isSubmitting) return; // ← Prevenir ejecución doble
      this.isSubmitting = true;      // ← Bloquear nuevas llamadas
      this.error = null;
      this.success = null;

      if (!this.validateInputs()) {
        this.isSubmitting = false;
        return;
      }

      try {
        const signUpData = {
          username: this.formData.email,
          password: this.formData.password,
          role: "ROLE_USER"
        };

        const signUpResponse = await this.authService.signUp(signUpData);
        if (![200, 201].includes(signUpResponse.status)) {
          this.error = "Failed to create account.";
          return;
        }

        const loginResponse = await this.authService.signInUser(
            this.formData.email,
            this.formData.password
        );

        if (loginResponse.status !== 200) {
          this.error = "Login failed after registration.";
          return;
        }

        const user = loginResponse.data;
        localStorage.setItem("userEmail", user.username);
        localStorage.setItem("userRole", "ROLE_USER");
        localStorage.setItem("authToken", user.token);
        localStorage.setItem("userId", user.id);

        const userData = {
          name: this.formData.name,
          lastname: this.formData.lastname,
          email: this.formData.email,
          password: this.formData.password,
          phonenumber: this.formData.phonenumber,
          user_id: user.id,
          profile_image: this.formData.profileImage
        };

        const profileResponse = await this.userApiService.createUser(userData);
        if ([200, 201].includes(profileResponse.status)) {
          this.success = "Account created successfully!";
          setTimeout(() => this.$router.push({ path: "/profile" }), 3000);
        } else {
          this.error = "Failed to save user profile.";
        }
      } catch (error) {
        console.error("Registration error:", error);
        this.error = error?.response?.data?.message || "Unexpected error occurred.";
      } finally {
        this.isSubmitting = false; // ← Siempre liberar
      }
    },

    async submit() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
              localStorage.setItem("userLat", pos.coords.latitude);
              localStorage.setItem("userLng", pos.coords.longitude);
              this.createUser();
            },
            () => {
              this.createUser();
            }
        );
      } else {
        this.createUser();
      }
    },

    restrictToDigits(event) {
      const key = event.key;
      if (!/^\d$/.test(key)) {
        event.preventDefault();
      }
    }
  }
};
</script>


<template>
  <div class="padre">
    <div class="container">
      <div class="box1">
        <img class="logo" src="/src/assets/PeaceApp.png" alt="logo" />
        <h2 class="info">{{ $t('main.title') }}</h2>
        <button class="butInfo" @click="redirectLanding">{{ $t('main.buttonInfo') }}</button>
      </div>
      <form class="box2" @submit.prevent="onSubmit()">
        <h2>{{ $t('main.welcome') }}</h2>
        <h3>{{ $t('main.message1') }}</h3>
        <div class="input-container">
          <input :placeholder="$t('main.email')" class="input-style" type="email" required v-model="userData.email" />
          <input :placeholder="$t('main.password')" class="input-style" type="password" required v-model="userData.password" />

          <div class="captcha-container">
            <canvas ref="captchaCanvas" width="200" height="60"></canvas>
          </div>
          <input v-model="userData.captcha" type="text" :placeholder="$t('main.captchaPlaceholder')" required class="captcha-input" />

          <button type="submit">{{ $t('main.login') }}</button>
          <p v-if="error" class="error">{{ $t(error) }}</p>

          <h4>{{ $t('main.message2') }}<a href="#" @click="visible = true">{{ $t('main.signUp') }}</a></h4>
          <h4>{{ $t('main.message3') }}<router-link to="/password-recover">{{ $t('main.clickHere') }}</router-link></h4>
        </div>
      </form>
    </div>

    <Dialog
        v-model:visible="visible"
        modal
        :header="$t('main.user')">
      <div class="dialog-wrapper">
        <user-sign />
      </div>
    </Dialog>

  </div>
</template>

<style>
body,
html {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  box-shadow: none;
}

.input-container {
  display: inline-block;
}

.card {
  padding: 0;
}

.padre {
  padding: 20vh 10vw 0 10vw;
}

.logo {
  width: 50%;
}

.box2 {
  background-color: #55B0DB;
}

.info {
  padding: 1vw;
}
::v-deep(.p-dialog .p-dialog-header) {
  background-color: red !important;
  color: white !important;
  border: none !important;
}

::v-deep(.p-dialog .p-dialog-content) {
  background-color: red !important;
  color: white !important;
  border: none !important;
}

.container {
  display: flex;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  color: black;
  flex-wrap: wrap;
  text-align: center;
  margin: auto;
  height: fit-content;
  width: fit-content;
}

.box1,
.box2 {
  flex: 1;
  padding: 20px 0;
  margin: 10px;
  border-radius: 24px;
  height: fit-content;
}

.butInfo {
  width: fit-content;
}

.captcha-container {
  margin: 20px 0;
  text-align: center;
}

.captcha-input {
  width: 70%;
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

/* ================== MODO OSCURO ================== */
body.dark {
  background-color: #121212;
  color: #f5f5f5;
}

body.dark .box2 {
  background-color: #1e1e1e;
  color: #f5f5f5;
}

body.dark .box1 {
  color: #f5f5f5;
}

body.dark input,
body.dark .captcha-input {
  background-color: #2a2a2a;
  color: #f5f5f5;
  border: 1px solid #555;
}

body.dark input::placeholder {
  color: #aaa;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

body.dark button {
  background-color: #22487A;
}

body.dark button:hover {
  background-color: #2b5dab;
}

body.dark .error {
  color: #ff6b6b;
}

body.dark canvas {
  background-color: #fff;
  border-radius: 6px;
}

/* Suaviza el cambio de modo */
body,
input,
button {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* ============ Ocultar fondo blanco del Dialog PrimeVue ============ */
::v-deep(.p-dialog) {
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

::v-deep(.p-dialog .p-dialog-content) {
  background: black;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  box-shadow: none !important;
}

::v-deep(.p-dialog-header),
::v-deep(.p-dialog-footer) {
  display: none !important;
  background: black;
}

::v-deep(.p-component-overlay) {
  background-color: transparent !important;
}
:host, .signup-container {
  background-color: red !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

</style>
