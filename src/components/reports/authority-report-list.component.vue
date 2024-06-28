<template>
  <header>
    <div v-if="role === 'citizen'">
      <CitizenToolbar/>
    </div>
    <div v-else-if="role === 'authority'">
      <AuthorityToolbar/>
    </div>
  </header>
  <div class="container">
    <h1>
      {{$t("reports.title")}}
    </h1>
    <div class="filters">
      <div class="filter-option">
        <label for="filter-type">{{$t("reports.type_label")}}</label>
        <select v-model="filterType" id="filter-type">
          <option value="">{{ $t('reports.all') }}</option>
          <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
      <div class="filter-option">
        <label for="filter-date">{{$t('reports.date_label')}}</label>
        <input type="date" v-model="filterDate" id="filter-date">
      </div>
      <div class="filter-option">
        <label for="filter-district">{{$t('reports.district_label')}}</label>
        <select v-model="filterDistrict" id="filter-district">
          <option value="">{{ $t('reports.all') }}</option>
          <option v-for="district in uniqueDistricts" :key="district" :value="district">{{ district }}</option>
        </select>
      </div>
      <div class="filter-option">
        <button @click="clearFilters">{{$t('reports.clear_filters')}}</button>
      </div>
    </div>
    <div class="reports-container">
      <ul v-if="filteredReports.length" class="reports-grid">
        <li v-for="report in filteredReports" :key="report.id" class="report-item">
          <h2>{{ report.type }}</h2>
          <p><strong>{{ $t('reports.date_label') }}</strong> {{ report.date }} <strong>Time:</strong> {{ report.time }}</p>
          <p><strong>{{$t('reports.district_label')}}</strong> {{ report.district }}</p>
          <p><strong>{{$t('reports.location_label')}}</strong> {{ report.location }}</p>
          <p><strong>{{$t('reports.description_label')}}</strong> {{ report.description }}</p>
          <p><strong>{{$t('reports.user_label')}}</strong> {{ report.user?.firstname + ' ' + report.user?.lastname}}</p>
          <p><strong>{{$t('reports.evidence_label')}}</strong> <a :href="report.urlEvidence" target="_blank">{{ $t('reports.view_evidence') }}</a></p>
        </li>
      </ul>
      <ul v-else class="reports-grid">
        <li class="report-item"><h2>{{$t('reports.no_reports')}}</h2></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ReportApiService } from "../../services/reportapi.service.js";
import AuthorityToolbar from "../toolbar/toolbarAuthority.component.vue";
import CitizenToolbar from "../toolbar/toolbarCitizen.component.vue";
import ToolbarCitizen from "../../app.vue";
export default {
  name: "ReportsList",
  components: {
    CitizenToolbar,
    AuthorityToolbar
  },
  data() {
    return {
      reports: [],
      api: new ReportApiService(),
      filterType: "",
      filterDate: "",
      filterDistrict: "",
      role: ""
    };
  },
  async created() {
    try {
      const response = await this.api.getAll();
      this.reports = response.data;
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
    await this.getRole();
  },
  computed: {
    uniqueTypes() {
      return [...new Set(this.reports.map(report => report.type))];
    },
    uniqueDistricts() {
      return [...new Set(this.reports.map(report => report.district))];
    },
    filteredReports() {
      let filtered = this.reports;
      if (this.filterType) {
        filtered = filtered.filter(report => report.type === this.filterType);
      }
      if (this.filterDate) {
        filtered = filtered.filter(report => report.date === this.filterDate);
      }
      if (this.filterDistrict) {
        filtered = filtered.filter(report => report.district === this.filterDistrict);
      }
      return filtered;
    }
  },
  methods: {
    async clearFilters() {
      this.filterType = "";
      this.filterDate = "";
      this.filterDistrict = "";
    },
    async getRole() {
      this.role = localStorage.getItem('userRole');
    }
  },
};
</script>

<style scoped>
.container {
  background-color: #01A1FF;
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
</style>
