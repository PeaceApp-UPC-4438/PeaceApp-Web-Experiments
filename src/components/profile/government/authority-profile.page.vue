<script>
import AuthorityToolbar from "../../toolbar/toolbarAuthority.component.vue";
export default {
  components: {
    AuthorityToolbar
  },
  props: {
    authority: Object
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    }
  }
};
</script>
<template>
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
        <p>{{ $t('profile.authority.contact_number') }} {{ authority.contact_number }}</p>
        <p>{{ $t('profile.authority.office_address') }} {{ authority.address }}</p>
        <p>{{ $t('profile.authority.description') }} {{ authority.description }}</p>
      </div>
      <div class="buttons">
        <router-link to="/authority/edit-profile">
          <button>{{$t('profile.edit')}}</button>
        </router-link>
        <button @click="logout">{{ $t('profile.logout') }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

button:hover {
  background-color: #9EA016;
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
  }
  .img{
    align-items: center;
    justify-items: center;
  }
}
</style>