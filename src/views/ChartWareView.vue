<template>
    <div>
      <bar-chart :chart-data="chartData" :options="chartOptions"></bar-chart>
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs';
  
  export default {
    extends: Bar,
    props: ['chartData', 'chartOptions'],
    mounted() {
      this.renderChart(this.chartData, this.chartOptions);
    }
  };
  </script> 