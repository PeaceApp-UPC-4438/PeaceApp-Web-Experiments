<script setup>

</script>

<template>
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
  height: 45px;
  width: 30%;
}
.container {
  background-color: #6DC9FF;
  margin-top: 60px;
  padding: 40px;
  width: 90%;
  max-width: 1000px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
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
    flex: 1 1 100%; /* Toma el 100% del contenedor en pantallas pequeñas */
  }
  button{
    width: 100%;
  }

}
</style>
