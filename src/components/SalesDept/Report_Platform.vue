<template>
    <div class="container">
      <h2>Platform Report</h2>
  
      <div class="container">
        <div class="wrapper">
          <v-text-field
            class="searchbar"
            :loading="loading"
            density="compact"
            variant="solo"
            label="Search templates"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            @click:append-inner="onClick"
          ></v-text-field>
        </div>
      </div>
  
      <table class="table table-bordered" id="platform-table">
        <thead>
          <tr>
            <th>Platform</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="platform in platformList" :key="platform.name">
            <td>{{ platform.name }}</td>
            <td>{{ platform.sales }}</td>
          </tr>
        </tbody>
      </table>
      <v-btn class="el-button" @click="downloadReport">Download Report</v-btn>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import jsPDF from 'jspdf';
import 'jspdf-autotable';

  
  export default {
    name: 'platformReport',
    components: {},
    props: ['platformReport'],
    data: () => ({
      loaded: false,
      loading: false,
      platformList: []
    }),
    mounted() {
      this.fetchPlatformSales();
    },
    methods: {
        fetchPlatformSales() {
  axios
    .get('/api/order') // 根据您的实际接口路径进行修改
    .then(response => {
      const data = response.data; // 假设返回的数据是一个数组

      // 计算每个平台的总销售额（订单数量）
      const platformList = [
        {
          name: 'Lazada',
          sales: data.filter(item => item.order_platform === 'Lazada').length
        },
        {
          name: 'Shopee',
          sales: data.filter(item => item.order_platform === 'Shopee').length
        },
        {
          name: 'Instagram',
          sales: data.filter(item => item.order_platform === 'Instagram').length
        },
        {
          name: 'Facebook',
          sales: data.filter(item => item.order_platform === 'Facebook').length
        },
        {
          name: 'Tiktok',
          sales: data.filter(item => item.order_platform === 'Tiktok').length
        }
      ];

      this.platformList = platformList;
    })
    .catch(error => {
      console.error('Error fetching platform sales:', error);
    });
},

onClick() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
        this.downloadReport(); // Call the method to generate and download the report
      }, 2000);
    },
    downloadReport() {
      const doc = new jsPDF();
      doc.autoTable({ html: '#platform-table' });
      doc.save('NeksomPlatform_Report.pdf');
    },
  }
}
</script>
  
  <style>
  .container {
    padding-left: 50px;
    padding-right: 50px;
  }
  h2 {
    margin-bottom: 30px;
    margin-top: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    border: 2px solid #6b6b6b;
  }
  table th,
  table td {
    padding: 8px;
    text-align: center;
    border: 2px solid #6b6b6b;
  }
  .el-button {
  margin-top: 20px;
  background-color: #4C4D6C;
  color: #ffffff;
}
  .search {
    margin-left: 400px;
  }
  .searchbar {
    width: 200px;
    height: 20px;
    margin-left: 200px;
  }
  .wrapper {
    margin-left: 900px;
  }
  </style>
  