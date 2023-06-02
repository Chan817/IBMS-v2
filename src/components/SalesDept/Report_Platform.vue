<template>
    <div class="container">
      <div class="container2">
        <div class="title">Platform Report</div>
        <div class="search-bar">
            <v-text-field
                :loading="loading"
                density="compact"
                variant="solo"
                label="Search keyword"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                v-model="searchKeyword"
                @click:append-inner="onClick"
            ></v-text-field>
          </div>
      </div>
      
      <div class="table-wrapper">
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
      </div>
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
      platformList: [],
      searchKeyword:''
    }),
    mounted() {
      this.fetchPlatformSales();
    },
    methods: {
        fetchPlatformSales() {
          axios
            .get('/api/order') 
            .then(response => {
              const data = response.data; 

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
              console.log(platformList);
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
            if (this.searchKeyword) {
              this.platformList = this.platformList;
          }
          }, 1000);
        },
        
        downloadReport() {
          const doc = new jsPDF();
          doc.autoTable({ html: '#platform-table' });
          doc.save('NeksomPlatform_Report.pdf');
        },
    },
    computed: {
      platformList() {
      if (!this.searchKeyword) {
        return this.platformList;
      } else {
        const keyword = this.searchKeyword.toLowerCase();
        return this.platformList.filter((platform) => {
          return (
            (platform.name && platform.name.toLowerCase().includes(keyword)) 
          );
        });
      }
    },
  },
  }
</script>
  
<style scoped>
.container{
  padding: 30px;
}
.container2{
    flex: 1;
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    flex-wrap: wrap; /* Allow elements to wrap on smaller screens */
}
.title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
} 

table {
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #6b6b6b;
}

table th, table td {
    padding: 8px;
    text-align: center;
    border: 2px solid #6b6b6b;
}
  .el-button {
  margin-top: 20px;
  background-color: #4C4D6C;
  color: #ffffff;
}
.search-bar {
  width: 300px; /* Adjust the width as desired */
  margin-bottom: 20px;
}

.table-wrapper {
  overflow-y: auto;
}
  </style>
  