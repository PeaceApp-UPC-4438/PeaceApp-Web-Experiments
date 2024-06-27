<script>
import ToolbarCitizen from "../../components/toolbar/toolbarCitizen.component.vue";
import ToolbarAuthority from "../../components/toolbar/toolbarAuthority.component.vue";
import AuthorityProfilePage from "../../components/profile/government/authority-profile.page.vue";
import CitizenProfilePage from "../../components/profile/citizen/user-profile.page.vue";
import {CitizenApiService} from "../../services/citizenapi.service.js";
import {AuthorityApiService} from "../../services/authorityapi.service.js";
export default {
  name: "ProfilePage",
  components: {
    ToolbarCitizen,
    ToolbarAuthority,
    AuthorityProfilePage,
    CitizenProfilePage,
  },
  data() {
  return {
    userEmail: '',
    userRole: '',
    citizenService: new CitizenApiService(),
    authorityService: new AuthorityApiService(),
    userInfo: {},
  };
},
  methods: {
    getUserRoleAndEmail() {
      // Obtener el email y rol del usuario desde localStorage
      this.userEmail = localStorage.getItem('userEmail');
      this.userRole = localStorage.getItem('userRole');
      console.log(this.userEmail, this.userRole);
    },
  fetchUserInfo() {
    if (this.userRole === 'citizen') {
      this.citizenService.getCitizenByEmail(this.userEmail)
          .then((response) => {
            this.userInfo = response.data[0];
            localStorage.setItem('citizen', JSON.stringify(this.userInfo));
            console.log(this.userInfo);
          })
          .catch((error) => {
            console.log(error);
          });
    } else if (this.userRole === 'authority') {
      this.authorityService.getAuthorityByEmail(this.userEmail)
          .then((response) => {
            this.userInfo = response.data[0];
            console.log(this.userInfo);
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }
  },
   created() {
     this.getUserRoleAndEmail();
     this.fetchUserInfo();
    }
};
</script>

<template>
  <template class="container" v-if="userRole === 'authority'">
    <AuthorityProfilePage :authority="userInfo" />
  </template>
  <template class="container" v-else-if="userRole === 'citizen'">
    <CitizenProfilePage :citizen="userInfo" />
  </template>
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
}

.container {
  margin: 0;
  display: flex;
  place-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
