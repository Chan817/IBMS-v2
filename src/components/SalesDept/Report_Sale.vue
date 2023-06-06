  <template>
    <div class="container">

      <div class="container2">

        <div class="title1">Sales Report</div>

        <div class="container3">
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

          <div class="search-bar">
            <v-text-field :loading="loading" density="compact" variant="solo" label="Search" append-inner-icon="mdi-magnify"
              single-line hide-details v-model="searchKeyword" @click:append-inner="onClick"></v-text-field>
          </div>
        </div>
      </div>

      <div v-if="selectedPeriod === 'all'" class="data-section">

        <div class="title">All data report</div>

        <div class="table-wrapper">
          <table id="sales-table">
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
      </div>

      <div v-if="selectedPeriod === 'weekly'" class="data-section">

        <div class="title">Weekly data report</div>

        <div class="table-wrapper">
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
      </div>

      <div v-if="selectedPeriod === 'monthly'" class="data-section">

        <div class="title">Monthly data report</div>

        <div class="table-wrapper">
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
        <div class="title">Yearly data report</div>

        <div class="table-wrapper">
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
      </div>
      <v-btn class="el-button" @click="downloadReport">Download Report</v-btn>
    </div>
  </template>
  <script>
  import axios from 'axios';
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';

  export default {
    data() {
      return {
        selectedPeriod: 'all',
        selectedCategory: 'all',
        searchQuery: '',
        allData: [],
        weeklyData: [],
        monthlyData: [],
        yearlyData: [],
        categories: [],
        
      };
    },
    mounted() {
      this.loadData();

      setInterval(() => {
        this.loadData();
      }, 30000);
    },
    watch: {
      selectedPeriod() {
        this.loadData();
      }
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
      downloadReport() {
        const doc = new jsPDF();

        let data;
        let title;

        if (this.selectedPeriod === 'all') {
          data = this.filteredAllData;
          title = 'All data report';
        } else if (this.selectedPeriod === 'weekly') {
          data = this.filteredWeeklyData;
          title = 'Weekly data report';
        } else if (this.selectedPeriod === 'monthly') {
          data = this.filteredMonthlyData;
          title = 'Monthly data report';
        } else if (this.selectedPeriod === 'yearly') {
          data = this.filteredYearlyData;
          title = 'Yearly data report';
        }

        const tableData = data.map(item => [item.sku, item.productName, item.totalSale]);

        doc.autoTable({
          head: [['SKU Number', 'Product Name', 'Total Sale']],
          body: tableData,
          theme: 'grid',
          startY: 20
        });

        doc.text(title, 14, 10);

        doc.save('Sales_Report.pdf');
      },
      onClick() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.loaded = true;
          
        }, 1000);
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
  .container {
    padding: 30px;
  }

  .container2 {
    flex: 1;
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    flex-wrap: wrap;
    /* Allow elements to wrap on smaller screens */
  }

  .container3 {
    flex: 1;
    display: flex;
    margin-bottom: 20px;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .title1 {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
    margin-right: 50px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-right: 30px;
  }

  .period-select select {
    width: 50%;
    height: 40px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 1px;
  }

  .period-select {
    flex: 1;
    display: flex;
    margin-bottom: 20px;
    justify-content: flex-end;
    margin-right: 10px;
  }

  .period-select label {
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
    align-items: center;
    margin-top: 10px;
    
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    border: 1px solid #9d9d9d;
  }

  th,
  td {
    border: 2px solid #6b6b6b;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #4C4D6C;
    font-weight: bold;
    color: #ffffff;
  }

  tr:nth-child(even) {
    background-color: #e4e4f3;
  }

  .search-bar {
    width: 300px;
    /* Adjust the width as desired */
    margin-bottom: 20px;
  }

  .table-wrapper {
    overflow-y: auto;
  }
  .el-button {
  margin-top: 20px;
  background-color: #4C4D6C;
  color: #ffffff;
}
  </style>