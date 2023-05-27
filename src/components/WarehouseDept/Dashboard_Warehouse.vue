<template>
    <div class="dashboard">
  
      <!-- Top part -->
      <section class="section">
        <div class="widget">
          <div class="widget-header">Unpaid</div>
          <div class="widget-content">
            <div class="data">{{ Unpaid }}</div>
            <div class="more-info" >
                <router-link to="/unpaid">More Info -></router-link>
            </div>
          </div>
        </div>
  
        <div class="widget">
          <div class="widget-header">To Ship</div>
          <div class="widget-content">
            <div class="data">{{ ToShip }}</div>
            <div class="more-info" >
                <router-link to="/toship">More Info -></router-link>
            </div>
          </div>
        </div>
  
        <div class="widget">
          <div class="widget-header">Shipping</div>
          <div class="widget-content">
            <div class="data">{{ Shipping }}</div>
            <div class="more-info" >
                <router-link to="/shipping">More Info -></router-link>
            </div>
          </div>
        </div>
        

        <div class="widget">
          <div class="widget-header">Completed</div>
          <div class="widget-content">
            <div class="data">{{ Completed }}</div>
            <div class="more-info" >
                <router-link to="/completed">More Info -></router-link>
            </div>
          </div>
        </div>

        <div class="widget">
          <div class="widget-header">Cancellation</div>
          <div class="widget-content">
            <div class="data">{{ Cancellation }}</div>
            <div class="more-info" >
                <router-link to="/cancel">More Info -></router-link>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="chart">
          <!-- 添加图表的功能的地方 -->
          <!-- Sales Performance -->
          <div class="piechart">
            <canvas ref="pieChart"></canvas>
          </div>

          <!-- Platform Analytics -->
          <div class="linechart">
            <canvas ref="lineChart"></canvas>
          </div>
        </div>
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
          
        };
        
    },
    mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const pie = {
        labels: ["Product A", "Product B", "Product C", "Product D"],
        datasets: [
          {
            label: "Sales",
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            data: [120, 150, 180, 90],
          },
        ],
      };

      const line = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"],
        datasets: [
          {
            label: "Analytics",
            borderColor: "#FF6384",
            data: [100, 200, 150, 300, 250],
          },
        ],
      };

      this.renderPieChart(pie, "pieChart");
      this.renderLineChart(line, "lineChart");
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
    margin-bottom: 50px;
  }
  
  .widget {
    display: inline-block;
    width: calc(25% - 10px);
    margin-right: 10px;
    margin-bottom: 10px;
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
  .chart {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .more-info {
    opacity: 0.6;
    cursor: pointer;
  }
  .linechart{
    width: 60%;
    margin-right: 50px;
  }
  .piechart{
    margin-left: 50px;
  }
  
  
  </style>