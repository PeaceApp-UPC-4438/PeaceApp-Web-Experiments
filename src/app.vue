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
        { code: 'en', name: '🇺🇸 English', flag: 'us' },
        { code: 'es', name: '🇪🇸 Español', flag: 'es' }
      ],
      showSelect: false,
      activeModal: null, // 'faq' o 'terms'
      faqContent: [
        { question: "¿Cómo cambio el idioma?", answer: "Haz clic en el icono de idioma y selecciona tu preferencia." },
        { question: "¿Dónde veo mis datos?", answer: "En la sección de perfil del usuario." },
        { question: "¿Cómo publico un reporte?", answer: "Dale clic en el icono de reportes y completa el formulario con los datos que se requieren y dale al botón enviar." }
      ],
      termsContent: [
        {
          title: "1. Aceptación de los Términos",
          content: "Al acceder y utilizar esta plataforma, usted acepta cumplir con estos términos y condiciones, así como con nuestra Política de Privacidad. Si no está de acuerdo, absténgase de usar el servicio."
        },
        {
          title: "2. Derechos de los Usuarios",
          items: [
            "Acceso al Servicio: Derecho a acceder a la plataforma de forma continua mientras su cuenta esté activa y cumpla con estos términos.",
            "Funcionalidades: Uso de todas las herramientas disponibles según su nivel de acceso, incluyendo mapa de calor interactivo y reporte de incidentes.",
            "Privacidad: Protección de sus datos personales conforme a la legislación vigente."
          ]
        },
        {
          title: "3. Obligaciones del Usuario",
          items: [
            "Uso Adecuado: Utilizar la plataforma conforme a la ley, sin contenido difamatorio, ilegal o que infrinja derechos de terceros.",
            "Veracidad: Responsabilidad sobre la exactitud de la información proporcionada, especialmente en reportes de incidentes.",
            "Seguridad: Mantener la confidencialidad de sus credenciales y será responsable de toda actividad bajo su cuenta."
          ]
        },
        {
          title: "4. Restricciones de Uso",
          items: [
            "Uso Comercial: Prohibido utilizar la plataforma o sus datos con fines comerciales sin autorización expresa.",
            "Accesos No Autorizados: No se permite intentar acceder a áreas restringidas del sistema.",
            "Interferencias: Queda prohibido realizar acciones que afecten el rendimiento o disponibilidad del servicio."
          ]
        },
        {
          title: "5. Responsabilidades del Proveedor",
          items: [
            "Disponibilidad: Mantener la plataforma operativa, notificando mantenimientos programados.",
            "Protección de Datos: Implementar medidas de seguridad técnicas y organizativas.",
            "Soporte: Brindar asistencia técnica a través de los canales establecidos."
          ]
        },
        {
          title: "6. Limitaciones del Proveedor",
          items: [
            "Suspensión de Cuentas: Derecho a suspender o eliminar cuentas que violen estos términos.",
            "Modificaciones: Posibilidad de actualizar o limitar funcionalidades temporalmente por mantenimiento."
          ]
        },
        {
          title: "7. Propiedad Intelectual",
          content: "Todos los derechos sobre la plataforma, su diseño y contenidos son propiedad exclusiva del proveedor del servicio. Queda prohibida su reproducción sin autorización."
        },
        {
          title: "8. Limitación de Responsabilidad",
          items: [
            "No responsables por daños indirectos o pérdida de datos derivados del uso.",
            "No responsables por contenido generado por usuarios.",
            "No responsables por interrupciones por causas ajenas a nuestro control."
          ]
        },
        {
          title: "9. Modificaciones",
          content: "Estos términos podrán actualizarse periódicamente. El uso continuado tras modificaciones implica su aceptación."
        },
        {
          title: "Fecha de última actualización",
          content: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
        }
      ]
    }
  },
  mounted() {
    this.userService.signInUser('string@string','string').then(
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
      <router-view/>
    </div>

    <!-- Modales -->
    <div v-if="activeModal === 'faq'" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>Preguntas Frecuentes</h2>
        <div v-for="(item, index) in faqContent" :key="index" class="faq-item">
          <h3>{{ item.question }}</h3>
          <p>{{ item.answer }}</p>
        </div>
        <button @click="closeModal" class="close-button">Cerrar</button>
      </div>
    </div>

    <div v-if="activeModal === 'terms'" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>Términos y Condiciones</h2>

        <div v-for="(section, index) in termsContent" :key="index" class="terms-section">
          <h3>{{ section.title }}</h3>

          <p v-if="section.content">{{ section.content }}</p>

          <ul v-if="section.items">
            <li v-for="(item, i) in section.items" :key="i">{{ item }}</li>
          </ul>
        </div>

        <button @click="closeModal" class="close-button">Cerrar</button>
      </div>
    </div>

    <footer class="footer">
      <div class="footer-links">
        <span @click="showModal('faq')">Preguntas frecuentes</span>
        <span class="separator">|</span>
        <span @click="showModal('terms')">Términos y condiciones</span>
      </div>
      <div class="language-section">
        <select v-model="$i18n.locale" @change="changeLanguage($event)" class="locale-select" v-show="showSelect"
                ref="languageSelect"
                @blur="hideSelect">
          <option v-for="locale in locales" :key="locale.code" :value="locale.code" :selected="$i18n.locale === locale.code">
            <flag :iso="locale.flag" v-bind:squared=false class="flag-icon" /> {{ locale.name }}
          </option>
        </select>
        <img src="./assets/Language.png" alt="Language" @click="showSelect = !showSelect">
      </div>
    </footer>
  </main>
</template>

<style scoped>
/* Estilos base */
.container {
  height: fit-content;
  padding-bottom: 70px; /* Espacio para el footer */
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 500px;
  min-height: 100vh;
}

/* Footer mejorado */
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
  height: fit-content;
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

/* Selector de idioma mejorado */
.language-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.locale-select {
  padding: 8px 12px;
  font-size: 0.9em;
  border-radius: 6px;
  width: 120px;
  border: none;
  background-color: rgba(255, 255, 255, 0.9);
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

/* Modales elegantes */
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

pre {
  white-space: pre-wrap;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.5;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid #3498db;
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

/* Animaciones */
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

/* Responsive */
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

.terms-section p {
  line-height: 1.6;
  color: #555;
}

.terms-section ul {
  padding-left: 1.2rem;
  margin-top: 0.5rem;
}

.terms-section li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
  color: #555;
}


</style>