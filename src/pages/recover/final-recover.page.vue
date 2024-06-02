<script>
export default {
  methods: {
    redirectLanding() {
      const Link = 'https://g2webapplication-wx54.github.io/landing-page-web-app/';
      window.location.href = Link;
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="box1">
      <img class="logo" src="/src/assets/PeaceApp.png" alt="logo" />
      <h2 class="info">For more info, check out our Landing Page and discover what we offer</h2>
      <button class="butInfo" @click="redirectLanding">More Information</button>
    </div>
    <div class="box2">
      <h3>Please, log in to start</h3>
      <router-link to="/">
        <Button>Volver</Button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
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
  width: 30%;
}

.box2{
  background-color: #6DC9FF;
}

.info{
  padding: 50px;
}
.container {
  display: flex;
  font-family: 'Montserrat', sans-serif;
  color: black;
  flex-wrap: wrap;
  text-align: center;
  min-height: 50%;
  margin-top: 10%;
}

.box1, .box2 {
  flex: 1;
  padding: 20px;
  margin: 10px;
  width: 100%;
  height: 60vh;
}
h3{
  margin-top: 20%;
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

@media screen and (max-width: 900px) {
  .container {
    display: inline-block;
  }
  .box1, .box2 {
    width: 100%;
  }
  .butInfo{
    height: 16%;
  }
}

</style>