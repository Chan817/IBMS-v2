<template>
    <div class="report">
      <h1>Sales Report</h1>
      <div class="controls">
        <div class="period-select">
          <label for="period">Period:</label>
          <select v-model="selectedPeriod" @change="loadData" id="period">
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
             <option value="weekly">1</option>
            <option value="monthly">2</option>
            <option value="yearly">3</option>
          </select>
        </div>
        <div class="search-input">
          <label for="search">Search:</label>
          <input v-model="searchQuery" @input="filterData" type="text" id="search" placeholder="Enter keyword">
        </div>
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
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedPeriod: 'weekly', // 默认选择每周数据报告
        selectedCategory: 'all', // 默认选择所有类别
        searchQuery: '', // 搜索关键词
        weeklyData: [], // 存储每周数据的数组
        monthlyData: [], // 存储每月数据的数组
        categories: [], // 存储类别的数组
      };
    },
    mounted() {
      // 页面加载时获取初始数据
      this.loadData();
  
      // 设置定时器，每隔一段时间自动更新数据
      setInterval(() => {
        this.loadData();
      }, 30000); // 30秒更新一次数据
    },
    methods: {
      loadData() {
        // 使用适合的方式从数据库或实时数据源获取最新的数据
        // 更新weeklyData和monthlyData数组，使其包含最新的数据
      },
      filterData() {
        
        const filteredWeeklyData = this.weeklyData.filter(item => {
          return (this.selectedCategory === 'all' || item.category === this.selectedCategory) &&
            item.productName.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
        const filteredMonthlyData = this.monthlyData.filter(item => {
          return (this.selectedCategory === 'all' || item.category === this.selectedCategory) &&
            item.productName.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
  
        
        this.filteredWeeklyData = filteredWeeklyData;
        this.filteredMonthlyData = filteredMonthlyData;
      },
    },
    computed: {
      filteredWeeklyData() {
        
        return this.weeklyData;
      },
      filteredMonthlyData() {
        
        return this.monthlyData;
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