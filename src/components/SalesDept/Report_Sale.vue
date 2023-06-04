<template>
  <div class="container">
    
    <div class="container2">

      <div class="title">Sales Report</div>
      
      <div class="period-select">
        <label for="period">Period:</label>
        <select v-model="selectedPeriod" @change="loadData" id="period">
          <option value="all">All</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="custom">Customize</option>
        </select>
      </div>
      <div class="category-select">
        <label for="category">Categories:</label>
        <select v-model="selectedCategory" @change="filterData" id="category">
          <option value="all">All</option>
          <option v-for="category in categories" :value="category" :key="category">{{ category }}</option>
          <option value="all">1</option>
          <option value="weekly">2</option>
          <option value="monthly">3</option>
          <option value="yearly">4</option>
        </select>
      </div>
      <div class="search-input">
        <label for="search">Search:</label>
        <input v-model="searchQuery" @input="filterData" type="text" id="search" placeholder="Enter keyword">
      </div>
    </div>
    <div v-if="selectedPeriod === 'all'" class="data-section">
        <h2>All data report</h2>
        <table>
          <thead>
            <tr>
              <th>SKU Number</th>
              <th>Product Name</th>
              <th>Total Sale</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredAllData" :key="item.sku">
              <td>{{ item.sku }}</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.totalSale }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="selectedPeriod === 'weekly'" class="data-section">
        <h2>Weekly data report</h2>
        <table>
          <thead>
            <tr>
              <th>SKU Number</th>
              <th>Product Name</th>
              <th>Total Sale</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredWeeklyData" :key="item.sku">
              <td>{{ item.sku }}</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.totalSale }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="selectedPeriod === 'monthly'" class="data-section">
        <h2>Monthly data report</h2>
        <table>
          <thead>
            <tr>
              <th>SKU Number</th>
              <th>Product Name</th>
              <th>Total Sale</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredMonthlyData" :key="item.sku">
              <td>{{ item.sku }}</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.totalSale }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="selectedPeriod === 'yearly'" class="data-section">
        <h2>Yearly data report</h2>
        <table>
          <thead>
            <tr>
              <th>SKU Number</th>
              <th>Product Name</th>
              <th>Total Sale</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredYearlyData" :key="item.sku">
              <td>{{ item.sku }}</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.totalSale }}</td>
            </tr>
          </tbody>
        </table>
      </div>

</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedPeriod: 'all',
      selectedCategory: 'all',
      searchQuery: '',
      allData: [],
      weeklyData: [],
      monthlyData: [],
      yearlyData:[],
      categories: [],
    };
  },
  mounted() {
    this.loadData();

    setInterval(() => {
      this.loadData();
    }, 30000);
  },
  methods: {
    async loadData() {
      try {
        const response = await axios.get('api/inventoryitem/withTotalSale');
        const data = response.data.map(item => ({
          sku: item.Inv_SKU_Num,
          productName: item.Inv_Name,
          totalSale: item.totalSale,
        }));

        this.allData = data;
        // If the server provides weekly and monthly data, you can update weeklyData and monthlyData in a similar way.
        const responseweekly = await axios.get('api/inventoryitem/withWeeklyTotalSale');
        const weeklydata = responseweekly.data.map(item => ({
          sku: item.Inv_SKU_Num,
          productName: item.Inv_Name,
          totalSale: item.totalSale,
        }));

        this.weeklyData = weeklydata;

        const responsemonthly = await axios.get('api/inventoryitem/withMonthlyTotalSale');
        const monthlydata = responsemonthly.data.map(item => ({
          sku: item.Inv_SKU_Num,
          productName: item.Inv_Name,
          totalSale: item.totalSale,
        }));

        this.monthlyData = monthlydata;

        const responseyearlyly = await axios.get('api/inventoryitem/withYearlyTotalSale');
        const yearlydata = responseyearlyly.data.map(item => ({
          sku: item.Inv_SKU_Num,
          productName: item.Inv_Name,
          totalSale: item.totalSale,
        }));

        this.yearlyData = yearlydata;


      } catch (error) {
        console.error('Error loading data:', error);
      }
    },
    filterData() {
      // Filter data based on selected category and search query
    },
  },
  computed: {
    filteredAllData() {
      return this.allData;
    },
    filteredWeeklyData() {
      return this.weeklyData;
    },
    filteredMonthlyData() {
      return this.monthlyData;
    },
    filteredYearlyData() {
      return this.yearlyData;
    },
  },
};
</script>

<style scoped>
.report {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.period-select,
.category-select,
.search-input {
  display: flex;
  align-items: center;
}

.period-select label,
.category-select label,
.search-input label {
  margin-right: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f1f1f1;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>