<script>
import userSign from '../../components/dialogs/user-sign-up.component.vue';
import authoritySign from '../../components/dialogs/authority-sign-up.component.vue';
import { UserApiService } from "../../services/userapi.service.js";

export default {
  components: {
    userSign,
    authoritySign
  },
  data() {
    return {
      visible: false,
      signUser: false,
      signAuthority: false,
      userData: {
        email: '',
        password: ''
      },
      userApiService: new UserApiService(),
      error: null
    };
  },
  methods: {
    redirectLanding() {
      window.location.href = 'https://g2webapplication-wx54.github.io/landing-page-web-app/';
    },

    async authenticateUser() {
      try {
        const response = await this.userApiService.getUserByEmailAndPassword(this.userData.email, this.userData.password);
        if (response && response.data.length > 0) {
          const user = response.data[0];
          console.log("User authenticated: ", user);

          // Save email and role in localStorage or Vuex store for further use
          localStorage.setItem('userEmail', user.email);
          localStorage.setItem('userRole', user.role);

          this.error = null; // Clear any previous errors
          // Proceed with redirect or setting user data
          this.$router.push('/profile');
        } else {
          this.error = "Invalid email or password";
        }
      } catch (error) {
        console.error("Error during authentication: ", error);
        this.error = "An error occurred during authentication";
      }
    },

    async onSubmit() {
      this.error = null; // Clear previous errors
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
          <input :placeholder="$t('main.email')" class="input-style" type="email" id="input" required="" v-model="userData.email">
          <input :placeholder="$t('main.password')" class="input-style" type="password" id="input" required="" v-model="userData.password">
        </div>
        <button type="submit">{{ $t('main.login') }}</button>
        <p v-if="error" class="error">{{ error }}</p>

        <h4>{{ $t('main.message2')}}<a href="#" @click="visible=true">{{$t('main.signUp')}}</a></h4>
        <h4>{{ $t('main.message3')}}<router-link to="/password-recover">{{ $t('main.clickHere') }}</router-link></h4>
      </form>
    </div>
  </div>

  <div class="card flex justify-content-center">
    <Dialog v-model:visible="visible" modal :header="$t('main.select')" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div class="opc">
        <button class="not" @click="signUser=true">{{$t('main.user')}}</button>
        <button class="not" @click="signAuthority=true">{{$t('main.authority')}}</button>
      </div>
    </Dialog>
    <Dialog v-model:visible="signUser" modal :header="$t('main.user')" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <user-sign/>
    </Dialog>
    <Dialog v-model:visible="signAuthority" modal :header="$t('main.authority')" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <authority-sign/>
    </Dialog>
  </div>
</template>

<style scoped>
.input-container{
  display: inline-block;
}
.card{
  padding: 0;
}
.padre{
  padding: 20vh 10vw 0 10vw;
}

.logo{
  width: 50%;
}
.box2{
  background-color: #6DC9FF;
}

.info{
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

.butInfo{
  width: fit-content;
}
.opc{
  display: flex;
  justify-content: space-around;
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
  .not,.opc{
    width: 100%;
  }
  .padre{
    padding: 0;
  }
  .logo{
    width: 100%;
    margin: 0 auto;
  }
  .opc{
    display: inline-block;
    justify-content: normal;
  }
  button{
    width: fit-content;
  }
}
</style>



