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
              <div class="title1">Shipped</div>
                <div class="data">{{ shipped }}</div>
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
                <div class="data">{{ cancelled }}</div>
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
          <div class="title1">Order Status Analysis</div>
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
import axios from "axios";
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
          toship: 0,
          shipped: 0,
          completed: 0,
          cancelled: 0,
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
  async created() {
    await this.fetchTotalPending();
    await this.fetchTotalShipping();
    await this.fetchTotalCompleted();
    await this.fetchTotalCancel();
  },
  mounted() {
    this.fetchPlatformSales();
},
methods: {

  async fetchTotalPending() {
      try {
        // Perform the logic to fetch email notifications
        const response = await axios.get('/api/orderList/pending');
        const pending = response.data;
        console.log(pending);
        // Update the notification property based on the number of notifications
        this.toship = pending.length; // Set the number property to the length of notifications array
        this.pending = pending.length > 0;
      } catch (error) {
        console.error('Error fetching total order which are pending:', error);
      }
    },
    async fetchTotalShipping() {
      try {
        // Perform the logic to fetch email notifications
        const response = await axios.get('/api/orderList/shipped');
        const shipped = response.data;
        console.log(shipped);
        // Update the notification property based on the number of notifications
        this.shipped = shipped.length; // Set the number property to the length of notifications array
        this.shipping = shipped.length > 0;
      } catch (error) {
        console.error('Error fetching total order shipped:', error);
      }
    },
    async fetchTotalCompleted() {
      try {
        // Perform the logic to fetch email notifications
        const response = await axios.get('/api/orderList/complete');
        const complete = response.data;
        console.log(complete);
        // Update the notification property based on the number of notifications
        this.completed = complete.length; // Set the number property to the length of notifications array
        this.complete = complete.length > 0;
      } catch (error) {
        console.error('Error fetching total order completed:', error);
      }
    },
    async fetchTotalCancel() {
      try {
        // Perform the logic to fetch email notifications
        const response = await axios.get('/api/orderList/cancel');
        const cancel = response.data;
        console.log(cancel);
        // Update the notification property based on the number of notifications
        this.cancelled = cancel.length; // Set the number property to the length of notifications array
        this.cancel = cancel.length > 0;
      } catch (error) {
        console.error('Error fetching total cancelled order:', error);
      }
    },

    fetchPlatformSales() {
      axios
        .get('/api/order')
        .then((response) => {
          const data = response.data;
          const platformList = [
            {
              name: 'Lazada',
              sales: data.filter((item) => item.order_platform === 'Lazada').length
            },
            {
              name: 'Shopee',
              sales: data.filter((item) => item.order_platform === 'Shopee').length
            },
            {
              name: 'Instagram',
              sales: data.filter((item) => item.order_platform === 'Instagram').length
            },
            {
              name: 'Facebook',
              sales: data.filter((item) => item.order_platform === 'Facebook').length
            },
            {
              name: 'Tiktok',
              sales: data.filter((item) => item.order_platform === 'Tiktok').length
            }
          ];
          this.platformList = platformList;
          console.log(platformList)
          var x = [];
          var y = [];
          for (var i = 0; i < platformList.length; i++) {
            x.push("January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December");
            y.push(platformList[i].sales);
          }
          const salesChart = new Chart(this.$refs.salesChart.getContext("2d"), {
            type: "pie",
            data: {
              labels: ["Pending", "Shipped", "Completed", "Cancelled"],
              datasets: [
                {
                  label: "Orders",
                  backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                  ],
                  data: [
                    data.filter((item) => item.order_status === 'Pending').length,
                    data.filter((item) => item.order_status === 'Shipped').length,
                    data.filter((item) => item.order_status === 'Completed').length,
                    data.filter((item) => item.order_status === 'Cancelled').length,
                    
                  ],
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
            },
          });

          const analyticsChart = new Chart(this.$refs.analyticsChart.getContext("2d"), {
            type: 'line',
            data: {
              labels: x,
              datasets: [{
                label: 'Total order',
                data: y,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                lineTension: 0.1
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    fontColor: "black",
                    fontSize: 15
                  },
                  gridLines: {
                    lineWidth: 2,
                  }
                }],
                xAxes: [{
                  type: 'category',
                  ticks: {
                    fontColor: "#456ef4",
                    fontSize: 12
                  },
                  gridLines: {
                    lineWidth: 2,
                  }
                }]
              },
              legend: {
                labels: {
                  fontColor: 'blue',
                  fontSize: 15
                }
              }
            }
          });


        })
        .catch((error) => {
          console.error('Error fetching platform sales:', error);
        });
      }
  
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