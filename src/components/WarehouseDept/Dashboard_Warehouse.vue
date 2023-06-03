<template>
  <div class="dashboard">
    
    <div class="title">Dashboard</div>
    <!-- Top part -->
    <div class="container-widger">
      <div class="card-total">
        <v-card>
            <div class="container-total">
              <div class="title1">Pending</div>
                <div class="data">{{ toship }}</div>
                <div class="text-right" >
                    <router-link to="/toship">More Info -></router-link>
                </div>
            </div>
          </v-card>
      </div>
      
      <div class="card-total">
        <v-card>
            <div class="container-total">
              <div class="title1">Shipping</div>
                <div class="data">{{ shipping }}</div>
                <div class="text-right" >
                    <router-link to="/shipping">More Info -></router-link>
                </div>
            </div>
          </v-card>
      </div>
      
      <div class="card-total">
        <v-card>
            <div class="container-total">
              <div class="title1">Completed</div>
                <div class="data">{{ completed }}</div>
                <div class="text-right" >
                    <router-link to="/completed">More Info -></router-link>
                </div>
            </div>
          </v-card>
      </div>
      
      <div class="card-total">
        <v-card>
            <div class="container-total">
              <div class="title1">Cancellation</div>
                <div class="data">{{ cancellation }}</div>
                <div class="text-right" >
                    <router-link to="/cancel">More Info -></router-link>
                </div>
            </div>
          </v-card>
      </div>
      

    </div>
  

    <!-- Chart -->
    <div class="container-chart">

      <!--Platform Analysis-->
      <v-card class="card-platf">
        <div class="platform-chart">
          <div class="title1">Platform Analysis</div>
          <div class="platform-chart">
            <canvas ref="salesChart"></canvas>
          </div>
        </div>
      </v-card>
      
        <!--Sales Performance-->
        <v-card class="card-sales">
          <div class="container-sales">
            <div class="container2">
              <div class="title1">Sales Performance</div>
              <v-select
                class="year"
                label="Select"
                :items="['2023', '2024']"
                variant="solo"
                density="compact"
                ></v-select>
            </div>
            <div class="sales-chart">  
              <canvas ref="analyticsChart"></canvas>
            </div>
          </div>
            
        </v-card>

    </div> 
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
  padding: 50px;
  background-color: #f8f8f8;
}
.title {
font-size: 30px;
font-weight: bold;
margin-bottom: 20px;
}
.card-total{
flex: 1;
margin-bottom: 20px;
margin-right: 20px;
width: 100%;
}
.container-widger{
  
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: start;
}
.container-total{
padding: 30px;
}
.title1 {
font-size: 20px;
font-weight: bold;
margin-bottom: 20px;
margin-right: 20px;
}
.container2 {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.container1 {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.container-chart {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}
.container-widget{
  padding: 10px;
}
.widget {
  width: 100%;
  padding: 30px;
  background-color: #f1f1f1;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 20px;
}

.widget-header {
  font-size: 20px;
  font-weight: bold;
}

.widget-content {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.data {
  font-size: 40px;
  font-weight: bold;
  flex-grow: 1;
  text-align: center;
}
.text-right{
  margin-top: 10px;
}
.card-platf{
margin-right: 20px;
margin-bottom: 30px;
} 
.card-sales{
padding: 20px;
width: 900px;
margin-bottom: 30px;
}

.year{
  width: 100px;
}
.container-sales{
width: 100%;

}
.sales-chart{
height: 300px;
width: 100%;
}
.platform-chart{
padding: 20px;

}
</style>