<script setup>

</script>

<template>
  <div class="padre">
    <div class="container">
      <div class="left">
        <img src="../../assets/municipalidad.png" alt="User" class="img" />
      </div>

      <div class="right">
        <p>Name of the Municipality: Municipalidad Distrital de La Victoria</p>
        <p>Email: info@munilavictoria.gob.pe</p>
        <p>Contact Number: (01) 510-2070</p>
        <p>Office Address: 500 Iquitos Ave, La victoria 18018</p>
        <p>Description: This profile facilitates the interaction between the Municipality of La Victoria and citizens,
          allowing local authorities to monitor and respond to security incidents. Find here
          official updates, security alerts and a direct link to report emergencies, all in focus
          to improve safety and life quality in the district.</p>

      </div>
      <div class="buttons">
        <router-link to="/authority/edit-profile">
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

.img{
  height: 20vw;
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
