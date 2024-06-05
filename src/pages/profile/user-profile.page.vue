<script setup>

</script>

<template>
  <div class="padre">
    <div class="container">
      <div class="left">
        <img src="../../assets/Anatoly.png" alt="Usuario" class="img" />
      </div>
      <div class="right">
        <p>Full name: Anatoly Andrey Noriega Suschenko</p>
        <p>E-mail: lorersz@gmail.com</p>
        <p>District: Breña</p>
        <p>Route Type: Safe</p>
        <p>Alert Frequency: High</p>
        <p>Location: NA</p>
        <p>Description: Enthusiastic advocate of community safety and active user of the platform. I dedicate myself
          to share crucial information and stay on top of updates to ensure transfers safe for me and others.</p>
      </div>
      <div class="buttons">
        <router-link to="/user/edit-profile">
          <button>Edit Profile</button>
        </router-link>
        <router-link to="/">
          <button>Log Out</button>
        </router-link>
        <button>Delete Account</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.padre {
  padding: 20vh 0 0 0;
}
.img{
  height: 20vw;
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
  height: 45px;
  width: 30%;
}
.container {
  background-color: #6DC9FF;
  width: 70vw;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;

  justify-items: center;
  align-items: center;
  text-align: center;
  margin: auto;
}

.left {
  display: flex;
  align-items: center;
  padding: 10vh;
}
.right {
  font-family: 'Montserrat', sans-serif;
  color: black;
  text-align: justify;
  font-weight: bold;
  font-size: 18px;
  flex: 1 15%;
}
.buttons {
  flex: 100%;
}
@media (max-width: 1000px) {
  .left, .right {
    width: 100%; /* Toma el 100% del contenedor en pantallas pequeñas */
  }
  .left{
    padding: 0;
    display: flex;
  }
  button{
    width: 90%;
  }
  .container{
    width: 90vw;
    padding: 25px;
  }
  .img{
    height: 40vw;
    align-items: center;
    justify-items: center;
  }

}
</style>
