<script setup>

</script>

<template>
  <div class="padre">
    <div class="container">
      <div class="left">
        <img src="../../assets/Anatoly.png" alt="Usuario" class="img" />
      </div>
      <div class="right">
        <p>{{ $t('profile.user.full_name') }} Anatoly Andrey Noriega Suschenko</p>
        <p>{{ $t('profile.user.email')}} lorersz@gmail.com</p>
        <p>{{ $t('profile.user.district') }} Breña</p>
        <p>{{$t('profile.user.route_type')}} Safe</p>
        <p>{{$t('profile.user.alert_frequency')}} High</p>
        <p>{{ $t('profile.user.location') }} NA</p>
        <p>{{ $t('profile.user.description') }} Enthusiastic advocate of community safety and active user of the platform. I dedicate myself
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
button:hover {
  background-color: #9EA016;
}
.container {
  border-radius: 24px;
  background-color: #6DC9FF;
  width: 60vw;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin: auto;
}
.img{
  height: auto;
  border: 1px solid black;
  border-radius: 100%;
}

.left {
  display: flex;
  align-items: center;
  padding: 3vh;
  margin: 0 auto;
}
.right {
  font-family: 'Montserrat', sans-serif;
  color: black;
  text-align: justify;
  font-weight: bold;
  font-size: 18px;
  padding: 3vh;
  flex: 1;
}
.buttons {
  flex: 100%;
  padding: 0 0 3vh 0;
}
@media (max-width: 1000px) {
  .padre{
    padding: 12vh 0 0 0;
  }
  .left{
    padding: 0;
    width: fit-content;
  }
  button{
    width: 90%;
  }
  .container{
    width: 94vw;
    padding: 15px 0 0 0;
    display: inline-block;
  }
  .img{
    align-items: center;
    justify-items: center;
  }
}
</style>