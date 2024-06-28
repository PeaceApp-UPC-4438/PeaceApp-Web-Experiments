<script>
import AuthorityToolbar from "../../toolbar/toolbarAuthority.component.vue";
import EditAuthority from "./authority-edit-profile.page.vue";
export default {
  components: {
    EditAuthority,
    AuthorityToolbar
  },
  props: {
    authority: Object
  },
  data() {
    return {
      showPopup: false
    };
  },
  methods: {
    openPopup() {
      this.showPopup = true;
    },
    logout() {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      this.$router.push('/login');
    }
  }
};
</script>
<template>
  <div>
    <header>
      <AuthorityToolbar/>
    </header>
    <div class="padre">
      <div class="container">
        <div class="left">
          <img :src="authority.profileImage" alt="User" class="img" />
        </div>
        <div class="right">
          <h2>{{ authority.name }}</h2>
          <p>{{ $t('profile.authority.email') }} {{ authority.email }}</p>
          <p>{{ $t('profile.authority.contact_number') }} {{ authority.contactNumber }}</p>
          <p>{{ $t('profile.authority.office_address') }} {{ authority.address }}</p>
          <p>{{ $t('profile.authority.description') }} {{ authority.description }}</p>
        </div>
        <div class="buttons">
          <button @click="openPopup">{{ $t('profile.edit') }}</button>
          <button @click="logout">{{ $t('profile.logout') }}</button>
        </div>
      </div>
    </div>
    <!-- Popup de Edición de Perfil -->
    <div class="popup-container" v-if="showPopup">
      <EditAuthority :authority="authority" @close="showPopup = false" />
    </div>
  </div>
</template>

<style scoped>
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
}
.left img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid #ddd;
  object-fit: cover;
}
.padre {
  padding: 20vh 0 0 0;
  margin: 0 auto;
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
  padding: 10px;
  border-radius: 24px;
  background-color: #6DC9FF;
  width: 60vw;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin: auto;
}
.left {
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
    padding: 10vh 0 0 0;
  }
  .left{
    padding: 0;
  }
  button{
    width: 90%;
  }
  .container{
    width: 90vw;
    padding: 15px 0 0 0;
    display: inline-block;
  }
  .img{
    align-items: center;
    justify-items: center;
  }
  .popup-container{
    z-index: 1000;
  }
}
</style>