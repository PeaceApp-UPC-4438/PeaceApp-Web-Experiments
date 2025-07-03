<script>
import { authUserService } from "./services/authuser.service.js";

export default {
  data() {
    return {
      users: [],
      userService: new authUserService(),
      userEmail: '',
      userRole: '',
      locales: [
        { code: 'en', name: '🇺🇸 English', flag: 'us' },
        { code: 'es', name: '🇪🇸 Español', flag: 'es' },
        { code: 'fr', name: '🇫🇷 Français', flag: 'fr' },
        { code: 'ru', name: '🇷🇺 Русский', flag: 'ru' }
      ],
      showSelect: false,
      darkMode: false,
      activeModal: null
    };
  },
  mounted() {
    this.userService.signInUser('string@string', 'string').then(
        (res) => {
          console.log('res', res);
        },
        error => {
          console.log(error);
        }
    );
    console.log(this.users);
    const savedDark = localStorage.getItem('darkMode') === 'true';
    this.darkMode = savedDark;
    document.body.classList.toggle('dark', savedDark);
  },
  computed: {
    faqContent() {
      return [
        { question: this.$t("userForm.question1"), answer: this.$t("userForm.answer1") },
        { question: this.$t("userForm.question2"), answer: this.$t("userForm.answer2") },
        { question: this.$t("userForm.question3"), answer: this.$t("userForm.answer3") }
      ];
    },
    termsContent() {
      return [
        {
          title: this.$t("userForm.terms.title1"),
          content: this.$t("userForm.terms.content1")
        },
        {
          title: this.$t("userForm.terms.title2"),
          items: [
            this.$t("userForm.terms.item2_1"),
            this.$t("userForm.terms.item2_2"),
            this.$t("userForm.terms.item2_3")
          ]
        },
        {
          title: this.$t("userForm.terms.title3"),
          items: [
            this.$t("userForm.terms.item3_1"),
            this.$t("userForm.terms.item3_2"),
            this.$t("userForm.terms.item3_3")
          ]
        },
        {
          title: this.$t("userForm.terms.title4"),
          items: [
            this.$t("userForm.terms.item4_1"),
            this.$t("userForm.terms.item4_2"),
            this.$t("userForm.terms.item4_3")
          ]
        },
        {
          title: this.$t("userForm.terms.title5"),
          items: [
            this.$t("userForm.terms.item5_1"),
            this.$t("userForm.terms.item5_2"),
            this.$t("userForm.terms.item5_3")
          ]
        },
        {
          title: this.$t("userForm.terms.title6"),
          items: [
            this.$t("userForm.terms.item6_1"),
            this.$t("userForm.terms.item6_2")
          ]
        },
        {
          title: this.$t("userForm.terms.title7"),
          content: this.$t("userForm.terms.content7")
        },
        {
          title: this.$t("userForm.terms.title8"),
          items: [
            this.$t("userForm.terms.item8_1"),
            this.$t("userForm.terms.item8_2"),
            this.$t("userForm.terms.item8_3")
          ]
        },
        {
          title: this.$t("userForm.terms.title9"),
          content: this.$t("userForm.terms.content9")
        },
        {
          title: this.$t("userForm.terms.lastUpdate"),
          content: new Date().toLocaleDateString(this.$i18n.locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })
        }
      ];
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      document.body.classList.toggle('dark', this.darkMode);
      localStorage.setItem('darkMode', this.darkMode);
    },
    changeLanguage(event) {
      const selectedLanguage = event.target.value;
      this.$i18n.locale = selectedLanguage;
      localStorage.setItem('language', selectedLanguage);
    },
    hideSelect() {
      this.showSelect = false;
    },
    showModal(modalType) {
      this.activeModal = modalType;
    },
    closeModal() {
      this.activeModal = null;
    }
  }
};
</script>

<template>
  <main>
    <div class="container">
      <router-view />
    </div>

    <!-- Modals -->
    <div v-if="activeModal === 'faq'" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ $t('footer.questions') }}</h2>
        <div v-for="(item, index) in faqContent" :key="index" class="faq-item">
          <h3>{{ item.question }}</h3>
          <p>{{ item.answer }}</p>
        </div>
        <button @click="closeModal" class="close-button">{{ $t('userForm.close') }}</button>
      </div>
    </div>

    <div v-if="activeModal === 'terms'" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ $t('footer.terms') }}</h2>

        <div v-for="(section, index) in termsContent" :key="index" class="terms-section">
          <h3>{{ section.title }}</h3>

          <p v-if="section.content">{{ section.content }}</p>

          <ul v-if="section.items">
            <li v-for="(item, i) in section.items" :key="i">{{ item }}</li>
          </ul>
        </div>

        <button @click="closeModal" class="close-button">{{ $t('userForm.close') }}</button>
      </div>
    </div>

    <footer class="footer">
      <div class="footer-links">
        <span @click="showModal('faq')">{{ $t('footer.questions') }}</span>
        <span class="separator">|</span>
        <span @click="showModal('terms')">{{ $t('footer.terms') }}</span>
      </div>
      <div class="language-section">
        <select v-model="$i18n.locale" @change="changeLanguage($event)" class="locale-select" v-show="showSelect"
                ref="languageSelect" @blur="hideSelect">
          <option v-for="locale in locales" :key="locale.code" :value="locale.code"
                  :selected="$i18n.locale === locale.code">
            <flag :iso="locale.flag" v-bind:squared="false" class="flag-icon" /> {{ locale.name }}
          </option>
        </select>
        <img src="./assets/Language.png" alt="Language" @click="showSelect = !showSelect">
        <button @click="toggleDarkMode" class="dark-mode-toggle" :aria-label="darkMode ? 'Light mode' : 'Dark mode'">
          <svg v-if="!darkMode" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
            <path fill="currentColor"
                  d="M12 3a1 1 0 0 1 1 1v1.05a7.002 7.002 0 0 1 5.95 5.95H20a1 1 0 1 1 0 2h-1.05a7.002 7.002 0 0 1-5.95 5.95V20a1 1 0 1 1-2 0v-1.05a7.002 7.002 0 0 1-5.95-5.95H4a1 1 0 1 1 0-2h1.05a7.002 7.002 0 0 1 5.95-5.95V4a1 1 0 0 1 1-1Z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
            <path fill="currentColor"
                  d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 0 1 0-16c.34 0 .68.02 1.01.06A8.001 8.001 0 0 1 12 20Z"/>
          </svg>
        </button>

      </div>
    </footer>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}
.container {
  padding-bottom: 70px;
  box-sizing: border-box;
}

/* ----------------- MODO CLARO (POR DEFECTO) ----------------- */
body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 500px;
  min-height: 100vh;
  background-color: #ffffff;
  color: #333;
}


/* FOOTER */
footer {
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  padding: 15px 30px;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.footer-links {
  display: flex;
  gap: 20px;
  cursor: pointer;
}

.footer-links span {
  position: relative;
  padding: 5px 0;
  font-weight: 500;
  transition: all 0.3s ease;
}

.footer-links span:hover {
  transform: translateY(-2px);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.footer-links span::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #fff;
  transition: width 0.3s ease;
}

.footer-links span:hover::after {
  width: 100%;
}

.separator {
  color: rgba(255, 255, 255, 0.3);
  user-select: none;
}

/* LANGUAGE + DARK MODE BUTTON */
.language-section {
  display: flex;
  align-items: center;
  gap: 15px;
}
/* Contenedor oscuro */
.mapboxgl-ctrl-group {
  background-color: #1e1e2f !important; /* fondo contenedor */
  border: 1px solid #333 !important;
  border-radius: 4px;
}

/* Botones oscuros */
.mapboxgl-ctrl-group button {
  background-color: #1e1e2f !important; /* fondo botón */
  color: white !important;
  border: none;
}

/* Íconos dentro del botón (invertir color si es necesario) */
.mapboxgl-ctrl-icon {
  filter: invert(1); /* blanco sobre fondo oscuro */
}

/* Hover */
.mapboxgl-ctrl-group button:hover {
  background-color: #2c2c3c !important;
}

.locale-select {
  padding: 8px 12px;
  font-size: 0.9em;
  border-radius: 6px;
  width: 120px;
  border: none;
  background-color: rgba(255, 255, 255, 0.9);
  color: #000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.locale-select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
}

img {
  height: 32px;
  width: auto;
  cursor: pointer;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
}

img:hover {
  transform: scale(1.1);
}

.dark-mode-button {
  background: transparent;
  border: none;
  font-size: 1.4em;
  cursor: pointer;
  transition: transform 0.3s;
}

.dark-mode-button:hover {
  transform: scale(1.1);
}

/* MODALS */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  width: 85%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  color: #333;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  transform: translateY(0);
  animation: slideUp 0.4s ease-out;
}

.modal-content h2 {
  margin-top: 0;
  color: #2c3e50;
  font-size: 1.8em;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db;
}

.faq-item {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-item h3 {
  margin-bottom: 8px;
  color: #3498db;
  font-size: 1.2em;
}

.faq-item p {
  margin: 0;
  line-height: 1.6;
  color: #555;
}

.terms-section {
  margin-bottom: 1.5rem;
}

.terms-section h3 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3rem;
}

.terms-section p,
.terms-section li {
  line-height: 1.6;
  color: #555;
}

.terms-section ul {
  padding-left: 1.2rem;
  margin-top: 0.5rem;
}

.close-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: block;
  margin-left: auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.close-button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* ----------------- MODO OSCURO ----------------- */
body.dark {
  background-color: #121212;
  color: #f5f5f5;
}

body.dark .modal-content {
  background-color: #1e1e1e;
  color: #f5f5f5;
}

body.dark .faq-item h3 {
  color: #4ea3ff;
}

body.dark .faq-item p,
body.dark .terms-section p,
body.dark .terms-section li {
  color: #ccc;
}

body.dark .terms-section h3 {
  color: #f5f5f5;
  border-color: #444;
}

body.dark footer {
  background: linear-gradient(135deg, #333333, #000000);
  color: #f5f5f5;
}

body.dark .locale-select {
  background-color: #2c2c2c;
  color: #fff;
}

body.dark select option {
  background-color: #2c2c2c;
  color: white;
}

body.dark .close-button {
  background-color: #555;
  color: white;
}

body.dark .close-button:hover {
  background-color: #777;
}

/* CORRECCIÓN DEL FONDO CELESTE DE LA SECCIÓN INTERMEDIA */
.section-blue {
  background-color: #3498db;
  height: 100px; /* o el valor original */
}

body.dark .section-blue {
  background-color: #121212;
}

/* ----------------- RESPONSIVE ----------------- */
@media (max-width: 768px) {
  footer {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
    text-align: center;
  }

  .footer-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .modal-content {
    width: 90%;
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .footer-links span {
    font-size: 0.9em;
  }

  .locale-select {
    width: 100px;
    padding: 6px 8px;
  }

  img {
    height: 28px;
  }

  .modal-content h2 {
    font-size: 1.5em;
  }
}

.dark-mode-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  transition: transform 0.2s ease;
  color: white;
  display: flex;
  align-items: center;
}

.dark-mode-toggle .icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.dark-mode-toggle:hover {
  transform: scale(1.1);
}
</style>
