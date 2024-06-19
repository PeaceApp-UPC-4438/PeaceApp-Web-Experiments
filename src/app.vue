<script setup>
import Toolbar from "./components/toolbar/toolbar.component.vue";
</script>
<script>
export default {
  data() {
    return {
      locales: [
        { code: 'en', name: '🇺🇸 English', flag: 'us' },
        { code: 'es', name: '🇪🇸 Español', flag: 'es' },
      ],
      showSelect: false
    }
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
  },
};
</script>

<template>
  <header>
    <Toolbar/>
  </header>
  <main>
    <div class="container">
      <router-view/>
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
    </div>
  </main>
</template>

<style scoped>
.container{
  height: fit-content;
}
body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 500px;
  min-height: 100vh;
}
footer{
  align-items: center;
  display: flex;
  margin: 0;
  bottom: 0;
  color: white;
  text-align: center;
  float: right;
}
.locale-select {
  padding: 0.2em 0 0.2em ;
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
  .container{
    height: 120vh;
  }
}
</style>