<template>
  <div class="parent-container">
    <div class="list-container">
      <AuthorityReportListComponent />
    </div>
    <div class="header-container">
      <router-link to="/user/create-report-form" class="btn btn-primary">New Report</router-link>
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

/* Estilos para el contenedor del encabezado */
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
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 2rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  color: #fff;
  background-color: #0056b3;
  border-color: #004085;
}

.btn-primary:focus, .btn-primary.focus {
  color: #fff;
  background-color: #0056b3;
  border-color: #004085;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}
</style>
