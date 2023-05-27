<template>
    <div class="dashboard">
  
      <!-- Top part -->
      <section class="section">
        <div class="widget">
          <div class="widget-header">Total Sale</div>
          <div class="widget-content">
            <div class="data">{{ totalSale }}</div>
            <router-link to="/report">More Info -></router-link>
          </div>
        </div>
  
        <div class="widget">
          <div class="widget-header">Total Order</div>
          <div class="widget-content">
            <div class="data">{{ totalOrder }}</div>
            <router-link to="/list">More Info -></router-link>
          </div>
        </div>
  
        <div class="widget">
          <div class="widget-header">Total Customer</div>
          <div class="widget-content">
            <div class="data">{{ totalCustomer }}</div>
            <router-link to="/report_customer">More Info -></router-link>
          </div>
        </div>
        

        <div class="widget">
          <div class="widget-header">Total Prospects</div>
          <div class="widget-content">
            <div class="data">{{ totalProspects }}</div>
            <router-link to="/report_prospect">More Info -></router-link>
          </div>
        </div>
      </section>
    

      <!-- Chart -->
      <section class="section">
        <div class="chart">
          <div class="sales-chart">
            <h4>Platform Analysis</h4>
            <div class="sales-chart">
            <canvas ref="salesChart"></canvas>
          </div>
          </div>
          

          <!-- Platform Analytics -->
          <div class="analytics-chart">
            <div class="container">
              <h4>Sales Performance</h4>
              <v-select
                class="year"
                label="Select"
                :items="['2023', '2024']"
                variant="solo"
                density="compact"
                ></v-select>
            </div>
            
            <div class="analytics-chart">
            <canvas ref="analyticsChart"></canvas>
          </div>
          </div>
          
        </div>
      </section>
  
      <!-- Recent Activities -->
      <section class="section">
        <h2>Recent Activities</h2>
        <table class="activity-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Done by</th>
              <th>Action</th>
              <th>Order ID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="activity in recentActivities" :key="activity.id">
              <td>{{ activity.date }}</td>
              <td>{{ activity.time }}</td>
              <td>{{ activity.doneBy }}</td>
              <td>{{ activity.action }}</td>
              <td>{{ activity.orderId }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
    
  </template>

  
  
  <script>
  import { Chart, registerables } from 'chart.js';

  // Register the required chart types
  Chart.register(...registerables);


  export default {
    data() {
        return {
            period: "Monthly",
            user: {
                name: "John Doe",
                avatar: "path_to_avatar",
            },
            insufficientStock: true,
            totalSale: 0,
            totalOrder: 0,
            totalCustomer: 0,
            totalProspects: 0,
            recentActivities: [
                {
                    id: 1,
                    date: "2023-05-18",
                    time: "10:00 AM",
                    doneBy: "John Doe",
                    action: "Product added",
                    orderId: "ORD001",
                },
                // add database
            ],
        };
    },

    mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const salesData = {
        labels: ["Product A", "Product B", "Product C", "Product D"],
        datasets: [
          {
            label: "Sales",
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            data: [120, 150, 180, 90],
          },
        ],
      };

      const analyticsData = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"],
        datasets: [
          {
            label: "Analytics",
            borderColor: "#FF6384",
            data: [100, 200, 150, 300, 250],
          },
        ],
      };

      this.renderPieChart(salesData, "salesChart");
      this.renderLineChart(analyticsData, "analyticsChart");
    },
    renderPieChart(data, element) {
    this.$refs[element]._chart = new Chart(this.$refs[element].getContext('2d'), {
        type: 'pie',
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
    renderLineChart(data, element) {
      this.$refs[element]._chart = new Chart(this.$refs[element].getContext('2d'), {
      type: 'line',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
    },
  },
    
};
  </script>
  
  <style scoped>
  .dashboard {
    margin: 50px;
  }
  
  .section {
    margin-top: 20px;
  }
  
  .widget {
    display: inline-block;
    width: calc(25% - 10px);
    margin-right: 10px;
    padding: 20px;
    background-color: #f1f1f1;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .widget-header {
    font-weight: bold;
  }
  
  .widget-content {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
  
  .data {
    font-size: 32px;
    font-weight: bold;
    flex-grow: 1;
  }
  
  .more-info {
    opacity: 0.6;
    cursor: pointer;
  }
  
  .chart {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  
  .activity-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .activity-table th,
  .activity-table td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  .analytics-chart{
    width:90%;
    height: 320px;
    
  }
  .sales-chart{
    margin-top: 20px;
    width: 60%;
    height: 60%;
  }
  .year{
    width: 100px;
    height: 20px;
    margin-left: 300px;
  }
  .container{
    display: flex;
    justify-content: space-between;
  }
  </style>