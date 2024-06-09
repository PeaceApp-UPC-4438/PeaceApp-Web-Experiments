<template>
  <div class="container">
    <h1>Report List</h1>
    <div class="filters">
      <div class="filter-option">
        <label for="filter-type">Type:</label>
        <select v-model="filterType" id="filter-type">
          <option value="">All</option>
          <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
      <div class="filter-option">
        <label for="filter-date">Date:</label>
        <input type="date" v-model="filterDate" id="filter-date">
      </div>
      <div class="filter-option">
        <label for="filter-district">District:</label>
        <select v-model="filterDistrict" id="filter-district">
          <option value="">All</option>
          <option v-for="district in uniqueDistricts" :key="district" :value="district">{{ district }}</option>
        </select>
      </div>
      <div class="filter-option">
        <button @click="clearFilters">Clear Filters</button>
      </div>
    </div>
    <div class="reports-container">
      <ul v-if="filteredReports.length" class="reports-grid">
        <li v-for="report in filteredReports" :key="report.id" class="report-item">
          <h2>{{ report.type }}</h2>
          <p><strong>Date:</strong> {{ report.date }} <strong>Time:</strong> {{ report.time }}</p>
          <p><strong>District:</strong> {{ report.district }}</p>
          <p><strong>Location:</strong> {{ report.location }}</p>
          <p><strong>Description:</strong> {{ report.description }}</p>
          <p><strong>Evidence:</strong> <a :href="report.urlEvidence" target="_blank">View Evidence</a></p>
        </li>
      </ul>
      <ul v-else class="reports-grid">
        <li class="report-item"><h2>No reports available.</h2></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ReportApiService } from "../../pages/reports/service/reportapi.service.js";

export default {
  name: "ReportsList",
  data() {
    return {
      reports: [],
      api: new ReportApiService(),
      filterType: "",
      filterDate: "",
      filterDistrict: ""
    };
  },
  async created() {
    try {
      const response = await this.api.getAll();
      this.reports = response.data;
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
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
