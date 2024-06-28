<script setup>
import ToolbarCitizen from "./components/toolbar/toolbarCitizen.component.vue";
import ToolbarAuthority from "./components/toolbar/toolbarAuthority.component.vue";
</script>
<script>
import {authUserService} from "./services/authuser.service.js";

export default {
  data() {
    return {
      users: [],
      userService: new authUserService(),
      userEmail: '',
      userRole: '',
      locales: [
        { code: 'de', name: '🇩🇪 Deutsch', flag: 'de' },
        { code: 'en', name: '🇺🇸 English', flag: 'us' },
        { code: 'es', name: '🇪🇸 Español', flag: 'es' },
        { code: 'fr', name: '🇫🇷 Français', flag: 'fr' }
      ],
      showSelect: false
    }
  },
  mounted() {
    this.userService.signInUser('johan@email.com','123').then(
        (res) => {
          console.log('res', res)
      },
      error => {
        console.log(error);
      }
    );
  console.log(this.users);
  },
  methods: {
    changeLanguage(event) {
      const selectedLanguage = event.target.value;
      this.$i18n.locale = selectedLanguage;
      localStorage.setItem('language', selectedLanguage);
    },
    hideSelect() {
      this.showSelect = false;
    }
  }
};
</script>

<template>
  <main>
    <div class="container">
      <router-view/>
    </div>
    <footer>
      <select v-model="$i18n.locale" @change="changeLanguage($event)" class="locale-select" v-show="showSelect"
              ref="languageSelect"
              @blur="hideSelect">
        <option v-for="locale in locales" :key="locale.code" :value="locale.code" :selected="$i18n.locale === locale.code">
          <flag :iso="locale.flag" v-bind:squared=false class="flag-icon" /> {{ locale.name }}
        </option>
      </select>
      <img src="./assets/Language.png" alt="Language" @click="showSelect = !showSelect">
    </footer>
  </main>
</template>

<style scoped>
.container {
  height: fit-content;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 500px;
  min-height: 100vh;
}

footer {
  align-items: center;
  display: flex;
  position: fixed;
  bottom: 0;
  right: 0;
  color: #fff;
  padding: 10px 20px;
  background-color: #349ddc;
  height: fit-content;
  border-radius: 10px 0 0 0;
}

.locale-select {
  padding: 0.2em 0 0.2em;
  font-size: 1em;
  border-radius: 5px;
  width: 100px;
}

.flag-icon {
  margin-right: 8px;
}

img {
  height: 40px; /* Initial icon size */
  width: auto;
}

@media (max-width: 1000px) {
  img {
    height: 4vh; /* Smallest icon size for mobile devices */
  }

  .container {
    height: 120vh;
  }
}
</style>