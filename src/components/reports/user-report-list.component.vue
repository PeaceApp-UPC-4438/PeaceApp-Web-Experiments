<template>
  <header>
    <CitizenToolbar />
  </header>
  <div class="container">
    <h1>{{ $t("reports.title") }}</h1>
    <div class="filters">
      <div class="filter-option">
        <label for="reportScope">{{ $t('reports.view_scope') }}</label>
        <select v-model="reportScope" id="reportScope" @change="fetchReports">
          <option value="user">{{ $t('reports.my_reports') }}</option>
          <option value="all">{{ $t('reports.all_reports') }}</option>
        </select>
      </div>
      <div class="filter-option">
        <label for="filterType">{{ $t('reports.type_label') }}</label>
        <select v-model="filterType" id="filterType">
          <option value="">{{ $t('reportForm.placeholders.all_types') }}</option>
          <option value="Robo">{{ $t('reportForm.placeholders.robbery') }}</option>
          <option value="Accidente">{{ $t('reportForm.placeholders.accident') }}</option>
          <option value="Oscuro">{{ $t('reportForm.placeholders.dark_area') }}</option>
          <option value="Acoso">{{ $t('reportForm.placeholders.harassment') }}</option>
          <option value="Otro">{{ $t('reportForm.placeholders.other') }}</option>
        </select>
      </div>
    </div>

    <div class="reports-container">
      <ul v-if="filteredReports.length" class="reports-grid">
        <router-link
            v-for="report in filteredReports"
            :key="report.id"
            :to="`/user/report/${report.id}/comments`"
            class="report-item-link"
        >
          <li class="report-item">
            <h2>{{ report.title }}</h2>
            <p><strong>{{ $t('reports.type_label') }}</strong> {{ translateType(report.type) }}</p>
            <p><strong>{{ $t('reports.address_label') || 'Address:' }}</strong> {{ report.address }}</p>
            <p><strong>{{ $t('reports.description_label') }}</strong> {{ report.detail }}</p>
            <p>
              <strong>{{ $t('reports.user_label') }}</strong>
              <span v-if="report.citizenFullName">{{ report.citizenFullName }}</span>
              <span v-else>{{ formatDate(report.createdAt) }}</span>
            </p>
            <p v-if="report.image">
              <strong>{{ $t('reports.evidence_label') || 'Evidence:' }}</strong><br>
              <img :src="report.image" alt="Evidence" style="max-width: 100%; border-radius: 8px; margin-top: 8px;" />
            </p>
          </li>
        </router-link>
      </ul>

      <ul v-else class="reports-grid">
        <li class="report-item">
          <h2>{{ $t("reports.no_reports") }}</h2>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ReportApiService } from "../../services/reportapi.service.js";
import { UserApiService } from "../../services/userapi.service.js";
import CitizenToolbar from "../toolbar/toolbarCitizen.component.vue";

export default {
  name: "ReportsList",
  components: { CitizenToolbar },
  data() {
    return {
      reports: [],
      api: new ReportApiService(),
      userService: new UserApiService(),
      reportScope: "user",
      filterType: "",
      role: ""
    };
  },
  async created() {
    await this.fetchReports();
    this.role = localStorage.getItem("userRole");
  },
  computed: {
    filteredReports() {
      if (!this.filterType) return this.reports;
      const filter = this.filterType.toLowerCase();
      return this.reports.filter(report => {
        const type = (report.type || '').toLowerCase();
        return (
            (filter === 'robo' && (type === 'robo' || type === 'robbery')) ||
            (filter === 'accidente' && (type === 'accidente' || type === 'accident')) ||
            (filter === 'oscuro' && (type === 'oscuro' || type === 'dark_area')) ||
            (filter === 'acoso' && (type === 'acoso' || type === 'harassment')) ||
            (filter === 'otro' && (type === 'otro' || type === 'other'))
        );
      });
    }
  },
  methods: {
    translateType(type) {
      const types = {
        Robo: this.$t('reportForm.placeholders.robbery'),
        Accidente: this.$t('reportForm.placeholders.accident'),
        Oscuro: this.$t('reportForm.placeholders.dark_area'),
        Acoso: this.$t('reportForm.placeholders.harassment'),
        Otro: this.$t('reportForm.placeholders.other'),
        robbery: this.$t('reportForm.placeholders.robbery'),
        accident: this.$t('reportForm.placeholders.accident'),
        dark_area: this.$t('reportForm.placeholders.dark_area'),
        harassment: this.$t('reportForm.placeholders.harassment'),
        other: this.$t('reportForm.placeholders.other')
      };
      return types[type] || type;
    },
    async fetchReports() {
      try {
        const userId = localStorage.getItem("userId");
        const response = this.reportScope === "all"
            ? await this.api.getAll()
            : await this.api.getByUserId(userId);
        this.reports = response.data;

        for (const report of this.reports) {
          if (report.citizenId) {
            const res = await this.userService.getUserByEmail(report.citizenId);
            report.citizenFullName = res?.data?.fullName || null;
          }
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    }
  }
};
</script>


<style scoped>
.container {
  background-color: #1F79AA;
  padding: 10vh 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}

.filters {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.filter-option {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.filter-option label {
  margin-right: 10px;
  color: white;
}

.filter-option select,
.filter-option input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.filter-option button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: fit-content;
  font-weight: normal;
  font-size: 1rem;
}

.filter-option button:hover {
  background-color: #2980b9;
}

.reports-container {
  border-radius: 8px;
  max-width: 1200px;
  width: 100%;
}

h1 {
  text-align: center;
  color: white;
}

.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.report-item {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.report-item h2{
  text-align: center;
}

.report-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

h2 {
  margin-top: 0;
  color: #01A1FF;
}

p {
  margin: 5px 0;
  color: #555;
}

a {
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
@media (max-width: 1000px){
  .container{
    padding: 3vh 0 0 0;
  }
  .filter-option{
    margin-bottom: 0;
  }
  .reports-container{
    padding: 20px 0 0 0;
  }
}
/* ================= MODO OSCURO ================= */
body.dark .container {
  background-color: #121212;
}

body.dark h1,
body.dark .filter-option label {
  color: #f5f5f5;
}

body.dark .filter-option select,
body.dark .filter-option input {
  background-color: #2a2a2a;
  color: #f5f5f5;
  border: 1px solid #555;
}

body.dark .report-item {
  background-color: #1e1e1e;
  border-color: #333;
  box-shadow: 0 1px 6px rgba(255, 255, 255, 0.05);
}

body.dark .report-item:hover {
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
}

body.dark .report-item h2 {
  color: #4ea3ff;
}

body.dark p {
  color: #ccc;
}

body.dark a {
  color: #7bbfff;
}
.report-item-link {
  text-decoration: none;
  color: inherit;
}
.report-item-link:hover {
  text-decoration: none;
}
</style>