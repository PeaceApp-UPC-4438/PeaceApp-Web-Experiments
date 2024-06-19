<template>
  <div class="parent-container">
    <div class="list-container">
      <AuthorityReportListComponent />
    </div>
    <div class="header-container">
      <router-link to="/user/create-report-form" class="btn btn-primary">{{ $t('reports.button') }}</router-link>
    </div>
  </div>
</template>

<script>
import AuthorityReportListComponent from "./authority-report-list.component.vue";
export default {
  name: "ReportListComponent",
  components: {
    AuthorityReportListComponent
  },
};
</script>

<style scoped>
.parent-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

/* Estilos para el contenedor de la lista */
.list-container {
  width: 100%;
  max-width: 1200px;
}

/* Estilos para el botón */
.btn {
  background-color: #EEF221;
  color: #161616;
  font-weight: bolder;
  border: none;
  border-radius: 0.25em;
  padding: 0.5em 1em;
  margin: 0.5em;
  cursor: pointer;
  font-size: 20px;
  text-decoration: none;
}
.btn:hover {
  background-color: #9EA016;
}
</style>
