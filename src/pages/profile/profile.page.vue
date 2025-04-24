<script>
import ToolbarCitizen from "../../components/toolbar/toolbarCitizen.component.vue";
import CitizenProfilePage from "../../components/profile/citizen/user-profile.page.vue";
import { CitizenApiService } from "../../services/citizenapi.service.js";

export default {
  name: "ProfilePage",
  components: {
    ToolbarCitizen,
    CitizenProfilePage,
  },
  data() {
    return {
      userEmail: '',
      userInfo: {},
      citizenService: new CitizenApiService(),
    };
  },
  methods: {
    getUserEmail() {
      this.userEmail = localStorage.getItem('userEmail');
      console.log('localStorage:', {
        userEmail: this.userEmail,
        token: localStorage.getItem('authToken')
      });
    },

    fetchUserInfo() {
      if (!this.userEmail) {
        console.warn("No user email found.");
        return;
      }

      console.log("Buscando citizen con email:", this.userEmail);

      this.citizenService.getCitizenByEmail(this.userEmail)
          .then((response) => {
            if (Array.isArray(response?.data)) {
              this.userInfo = response.data.find(c => c.email === this.userEmail);
            } else {
              this.userInfo = response.data;
            }

            localStorage.setItem('citizen', JSON.stringify(this.userInfo));
            console.log("Citizen info:", this.userInfo);
          })
          .catch(console.error);
    }
  },
  created() {
    this.getUserEmail();
    this.fetchUserInfo();
  }
};
</script>

<template>
  <div class="container">
    <ToolbarCitizen />
    <CitizenProfilePage
        v-if="userInfo && Object.keys(userInfo).length"
        :citizen="userInfo"
    />
    <p v-else style="color: gray; text-align: center;">Cargando perfil...</p>
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
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10vh 5vw 0 5vw;
  width: 100%;
  box-sizing: border-box;
}

</style>
