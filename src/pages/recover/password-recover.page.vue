<script>
export default {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    redirectLanding() {
      const Link = 'https://g2webapplication-wx54.github.io/landing-page-web-app/';
      window.location.href = Link;
    },
    validateAndRedirect() {
      if (this.email.trim() === '') {
        alert(this.$t('main.recover.alert')); // Puedes definir esta clave en tu archivo de traducción
        return;
      }
      this.$router.push('/recover');
    }
  }
}
</script>


<template>
  <div class="padre">
    <div class="container">
      <div class="box1">
        <img class="logo" src="/src/assets/PeaceApp.png" alt="logo" />
        <h2 class="info">{{ $t('main.title') }}</h2>
        <button class="butInfo" @click="redirectLanding">{{$t('main.buttonInfo')}}</button>
      </div>
      <div class="box2">
        <h3>{{$t('main.recover.message')}}</h3>
        <div class="input-container">
          <input :placeholder="$t('main.email')" class="input-style" type="text" id="input" v-model="email" required />
        </div>
        <div class="bts">
          <button @click="validateAndRedirect">{{ $t('main.recover.send') }}</button>
          <router-link to="/">
            <button>{{ $t('main.recover.know') }}</button>
          </router-link>
        </div>
      </div>
    </div>
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
  background-color: #C4E2F3;
  color: #161616;
  font-weight: bolder;
  border: none;
  border-radius: 0.25em;
  padding: 0.5em 1em;
  margin: 0.5em;
  cursor: pointer;
  font-size: 20px;
  height: 10%;
  width: 50%;
}
button:hover {
  background-color: #A1B9C6;
}
.box2{
  background-color: #55B0DB;
  font-size: 0.9rem;
}

.info{
  padding: 50px;
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
  padding: 20px;
  margin: 10px;
  border-radius: 2%;
  height: fit-content;
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
  .padre{
    padding: 0;
  }
  .bts{
    display: flex;
    flex-direction: column;
  }
  .logo{
    width: 100%;
    margin: 0 auto;
  }
}

</style>