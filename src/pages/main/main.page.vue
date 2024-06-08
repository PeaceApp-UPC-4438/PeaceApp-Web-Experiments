<script setup>
import userSign from '../../components/dialogs/user-sign-in.component.vue';
import authoritySign from '../../components/dialogs/authority-sign-in.component.vue';
</script>
<script>
export default {
  data() {
    return {
      visible: false,
      signUser: false,
      signAuthority: false
    };
  },
  methods: {
    redirectLanding() {
      window.location.href = 'https://g2webapplication-wx54.github.io/landing-page-web-app/';
    }
  }
}
</script>

<template>
  <div class="padre">
    <div class="container">
      <div class="box1">
        <img class="logo" src="/src/assets/PeaceApp.png" alt="logo" />
        <h2 class="info">For more info, check out our Landing Page and discover what we offer</h2>
        <button class="butInfo" @click="redirectLanding">More Information</button>
      </div>
      <div class="box2">
        <h2>Welcome to Peace App</h2>
        <h3>Please, log in to start</h3>
        <div class="input-container">
          <input type="text" id="input" required="">
          <label for="input" class="label">E-mail</label>
          <div class="underline"></div>
        </div>
        <div class="input-container">
          <input type="password" id="input" required="">
          <label for="input" class="label">Password</label>
          <div class="underline"></div>
        </div>
        <router-link to="/profile">
          <Button>Log in</Button>
        </router-link>
        <h4>Don't have an account? <a href="#" @click="visible=true">Sign up</a></h4>
        <h4>Forgot your password? <a href="/password-recover">Click here</a></h4>
      </div>
    </div>
  </div>

  <div class="card flex justify-content-center">
    <Dialog v-model:visible="visible" modal header="Select type:" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div class="opc">
        <button class="not" @click="signUser=true">User</button>
        <button class="not" @click="signAuthority=true">Authority</button>
      </div>
    </Dialog>
    <Dialog v-model:visible="signUser" modal header="Usuario:" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <user-sign/>
    </Dialog>
    <Dialog v-model:visible="signAuthority" modal header="Authority:" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <authority-sign/>
    </Dialog>
  </div>
</template>

<style scoped>
.padre{
  padding: 20vh 10vw 0 10vw;
}

.logo{
  width: 50%;
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
  height: 10%;
  width: 40%;
}
button:hover {
  background-color: #9EA016;
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

.butInfo, .not{
  width: fit-content;
}

.input-container {
  position: relative;
  margin: 20px auto;
  width: 50%
}

.input-container input[type="text"], .input-container input[type="password"]{
  font-size: 20px;
  width: 100%;
  border: none;
  border-bottom: 2px solid black;
  padding: 5px 0;
  background-color: transparent;
  outline: none;
}

.input-container .label {
  position: absolute;
  top: 0;
  left: 0;
  color: black;
  transition: all 0.3s ease;
  pointer-events: none;
}

.input-container input[type="text"]:focus ~ .label,
.input-container input[type="text"]:valid ~ .label,
.input-container input[type="password"]:focus ~ .label,
.input-container input[type="password"]:valid ~ .label{
  top: -20px;
  font-size: 16px;
  color: #333;
}

.input-container .underline {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #333;
  transform: scaleX(0);
  transition: all 0.3s ease;
}

.input-container input[type="text"]:focus ~ .underline,
.input-container input[type="text"]:valid ~ .underline,
.input-container input[type="password"]:focus ~ .underline,
.input-container input[type="password"]:valid ~ .underline{
  transform: scaleX(1);
}

@media screen and (max-width: 1000px) {
  .container {
    display: inline-block;
    padding: 15vw 0 0 0;
    width: 100%;
  }
  .box1, .box2 {
    width: 95%;
    padding: 5px;
  }
  .input-container {
    width: 80%;
  }
  .not{
    width: 100%;
  }
  .padre{
    padding: 0;
  }
  .logo{
    width: 100%;
    margin: 0 auto;
  }
}
</style>