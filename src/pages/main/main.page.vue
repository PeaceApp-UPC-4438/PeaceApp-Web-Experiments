<script>
import userSign from '../../components/dialogs/user-sign-up.component.vue';
import { authUserService } from "../../services/authuser.service.js";

export default {
  components: {
    userSign
  },
  data() {
    return {
      visible: false,
      userData: {
        email: '',
        password: ''
      },
      authService: new authUserService(),
      error: null
    };
  },
  methods: {
    // Redirects the user to the landing page
    redirectLanding() {
      window.location.href = 'https://g2webapplication-wx54.github.io/landing-page-web-app/';
    },

    // Handles user authentication using provided credentials
    async authenticateUser() {
      try {
        const response = await this.authService.signInUser(this.userData.email, this.userData.password);

        if (response && response.status === 200) {
          const user = response.data;
          console.log("User authenticated: ", user);

          localStorage.setItem('userEmail', user.username);
          localStorage.setItem('userRole', 'citizen');
          localStorage.setItem('authToken', user.token);

          this.error = null;
          this.$router.push('/profile');
        } else {
          this.error = "Incorrect email or password.";
        }
      } catch (error) {
        console.error("Error during authentication: ", error);
        this.error = "Login error.";
      }
    },

    // Called when the login form is submitted
    async onSubmit() {
      this.error = null;
      await this.authenticateUser();
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
          <button type="submit">{{ $t('main.login') }}</button>
          <p v-if="error" class="error">{{ error }}</p>

          <h4>{{ $t('main.message2')}}<a href="#" @click="visible=true">{{$t('main.signUp')}}</a></h4>
          <h4>{{ $t('main.message3')}}<router-link to="/password-recover">{{ $t('main.clickHere') }}</router-link></h4>
        </div>
      </form>
    </div>

    <!-- Modal dialog for user sign-up -->
    <Dialog v-model:visible="visible" modal :header="$t('main.user')" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <user-sign />
    </Dialog>
  </div>
</template>

<style scoped>
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

@media screen and (max-width: 1000px) {
  .container {
    display: inline-block;
    padding: 15vw 0 0 0;
    width: 100%;
  }
  .box1, .box2 {
    width: 100%;
    padding: 5px;
    margin: 0;
  }
  .input-container {
    width: 80%;
  }
  .padre {
    padding: 0;
  }
  .logo {
    width: 100%;
    margin: 0 auto;
  }
  button {
    width: fit-content;
  }
}
</style>
