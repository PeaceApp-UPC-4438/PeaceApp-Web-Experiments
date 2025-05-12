<script>
import userSign from '../../components/dialogs/user-sign-up.component.vue';
import { authUserService } from "../../services/authuser.service.js";

export default {
  components: {
    userSign,
  },
  data() {
    return {
      visible: false,
      userData: {
        email: '',
        password: '',
        captcha: ''  // Captcha input
      },
      authService: new authUserService(),
      error: null,
      captchaCode: ''
    };
  },
  mounted() {
    // Generar un código de verificación y dibujarlo en el canvas al cargar el componente
    this.generateCaptcha();
  },
  methods: {
    // Redirects the user to the landing page
    redirectLanding() {
      window.location.href = 'https://peaceapp-landing-page.netlify.app';
    },

    // Generar un código aleatorio (letras y números)
    generateCaptcha() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let code = '';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      this.captchaCode = code;

      // Dibujar el código en el canvas con distorsión
      const canvas = this.$refs.captchaCanvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpiar el canvas
      ctx.font = '30px Arial';
      ctx.fillStyle = 'black';

      // Dibujar líneas distorsionadas para hacerlo más difícil de leer para bots
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.stroke();
      }

      // Dibujar el texto del CAPTCHA con rotación
      for (let i = 0; i < this.captchaCode.length; i++) {
        ctx.save();
        ctx.translate(20 + (i * 30), 30);  // Posicionar el texto
        ctx.rotate(Math.random() * 0.2 - 0.1);  // Rotar el texto ligeramente
        ctx.fillText(this.captchaCode.charAt(i), 0, 0);  // Escribir el texto
        ctx.restore();
      }
    },

    // Maneja la autenticación del usuario
    async authenticateUser() {
      try {

        const response = await this.authService.signInUser(this.userData.email, this.userData.password);

        if (response && response.status === 200) {
          const user = response.data;
          localStorage.setItem('userEmail', user.username);
          localStorage.setItem('userRole', 'ROLE_USER');
          localStorage.setItem('authToken', user.token);
          localStorage.setItem('userId', user.id);

          // Guardar ubicación actual
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                  localStorage.setItem("userLat", position.coords.latitude);
                  localStorage.setItem("userLng", position.coords.longitude);
                  this.$router.push('/profile');
                },
                (err) => {
                  console.warn("No se pudo obtener ubicación:", err);
                  this.$router.push('/profile'); // continuar sin ubicación
                }
            );
          } else {
            this.$router.push('/profile');
          }
        }
      } catch (error) {
        console.error("Error during authentication: ", error);
        this.error = "Login error.";
      }
    },

    // Llamada cuando el formulario de login se envía
    async onSubmit() {
      this.error = null;  // Limpiar cualquier error previo
      await this.authenticateUser();  // Autenticación del usuario
      if (this.userData.captcha !== this.captchaCode) {
        this.error = 'Código incorrecto, intente de nuevo.';
        this.generateCaptcha();  // Generar un nuevo código en caso de error
        return;
      }
      // Aquí va la lógica para autenticar al usuario
      alert('Login exitoso');
    }
  }
}
</script>

<template>
  <div class="padre">
    <div class="container">
      <div class="box1">
        <img class="logo" src="/src/assets/PeaceApp.png" alt="logo" />
        <h2 class="info">{{$t('main.title')}}</h2>
        <button class="butInfo" @click="redirectLanding">{{ $t('main.buttonInfo') }}</button>
      </div>
      <form class="box2" @submit.prevent="onSubmit()">
        <h2>{{$t('main.welcome')}}</h2>
        <h3>{{$t('main.message1')}}</h3>
        <div class="input-container">
          <input :placeholder="$t('main.email')" class="input-style" type="email" required v-model="userData.email">
          <input :placeholder="$t('main.password')" class="input-style" type="password" required v-model="userData.password">

          <!-- Mostrar el código CAPTCHA -->
          <div class="captcha-container">
            <canvas ref="captchaCanvas" width="200" height="60"></canvas> <!-- Aumentamos el tamaño del canvas -->
          </div>

          <input v-model="userData.captcha" type="text" placeholder="Ingrese el código" required class="captcha-input" />

          <button type="submit">{{ $t('main.login') }}</button>
          <p v-if="error" class="error">{{ error }}</p>

          <h4>{{ $t('main.message2')}}<a href="#" @click="visible=true">{{$t('main.signUp')}}</a></h4>
          <h4>{{ $t('main.message3')}}<router-link to="/password-recover">{{ $t('main.clickHere') }}</router-link></h4>
        </div>
      </form>
    </div>

    <!-- Modal dialog for user sign-up -->
    <Dialog
        v-model:visible="visible"
        modal
        :header="$t('main.user')"
        :style="{ width: '50vw' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >

      <user-sign />
    </Dialog>
  </div>
</template>

<style>
/* Estilos para el formulario y el reCAPTCHA */
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
::v-deep(.p-dialog-header-icon) {
  background-color: #55B0DB !important;
  color: white !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  border-radius: 50% !important;
  width: 2rem;
  height: 2rem;
  font-size: 1.2rem;
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
.box1, .box2 {
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

</style>
