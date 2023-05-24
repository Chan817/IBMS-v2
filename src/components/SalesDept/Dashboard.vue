<template>
    <div class="dashboard">
  
      <!-- Top part -->
      <section class="section">
        <div class="widget">
          <div class="widget-header">Total Sale</div>
          <div class="widget-content">
            <div class="data">{{ totalSale }}</div>
            <div class="more-info">More Info -></div>
          </div>
        </div>
  
        <div class="widget">
          <div class="widget-header">Total Order</div>
          <div class="widget-content">
            <div class="data">{{ totalOrder }}</div>
            <div class="more-info">More Info -></div>
          </div>
        </div>
  
        <div class="widget">
          <div class="widget-header">Total Customer</div>
          <div class="widget-content">
            <div class="data">{{ totalCustomer }}</div>
            <div class="more-info">More Info -></div>
          </div>
        </div>
        

        <div class="widget">
          <div class="widget-header">Total Prospects</div>
          <div class="widget-content">
            <div class="data">{{ totalProspects }}</div>
            <div class="more-info">More Info -></div>
          </div>
        </div>
      </section>
      
      <!-- Chart -->
      <section class="section">
        <div class="chart">
          <!-- Sales Performance  -->
          <!-- Platform Analytics  -->
        </div>

        <template>
          <Bar
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
          />
        </template>
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
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Bar },
    data() {
      return {

        period: 'Monthly',
        user: {
          name: 'John Doe',
          avatar: 'path_to_avatar',
        },
        insufficientStock: true, // notification
        totalSale: 0,
        totalOrder: 0, 
        totalCustomer: 0, 
        totalProspects: 0, 
        recentActivities: [
          {
            id: 1,
            date: '2023-05-18',
            time: '10:00 AM',
            doneBy: 'John Doe',
            action: 'Product added',
            orderId: 'ORD001',
          },
          // add database
        ],
        chartData: {
          labels: [ 'January', 'February', 'March' ],
          datasets: [ { data: [40, 20, 12] } ]
        },
        chartOptions: {
          responsive: true
        }
      };
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    margin: 50px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .period {
    font-size: 24px;
  }
  
  .user-profile {
    display: flex;
    align-items: center;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .user-name {
    font-weight: bold;
  }
  
  .message-icon {
    position: relative;
  }
  
  .notification {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ccc;
  }
  
  .red-notification {
    background-color: red;
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
  </style>