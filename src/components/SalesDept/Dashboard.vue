<template>
  <div class="dashboard">

    <div class="title">Dashboard</div>
    <!-- Top part -->
    <div class="container-widger">
      <div class="card-total">
        <v-card>
          <div class="container-total">
            <div class="title1">Total Sales</div>
            <div class="data">{{ totalSale }}</div>
            <div class="text-right">
              <router-link to="/report">More Info -></router-link>
            </div>
          </div>
        </v-card>
      </div>

      <div class="card-total">
        <v-card>
          <div class="container-total">
            <div class="title1">Total Completed Orders</div>
            <div class="data">{{ totalOrder }}</div>
            <div class="text-right">
              <router-link to="/list">More Info -></router-link>
            </div>
          </div>
        </v-card>
      </div>

      <div class="card-total">
        <v-card>
          <div class="container-total">
            <div class="title1">Total Customers</div>
            <div class="data">{{ totalCustomer }}</div>
            <div class="text-right">
              <router-link to="/report_customer">More Info -></router-link>
            </div>
          </div>
        </v-card>
      </div>

      <div class="card-total">
        <v-card>
          <div class="container-total">
            <div class="title1">Total Prospects</div>
            <div class="data">{{ totalProspects }}</div>
            <div class="text-right">
              <router-link to="/report_prospect">More Info -></router-link>
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
            <v-select class="year" label="Select" :items="['2023', '2024']" variant="solo" density="compact"></v-select>
          </div>
          <div class="sales-chart">
            <canvas ref="analyticsChart"></canvas>
          </div>
        </div>

      </v-card>

    </div>

    <!-- Recent Activities -->
    <div class="container1">
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
    </div>
  </div>
</template>



<script>
import axios from "axios";
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
      recentActivities: [],
      order: false,
      customer: false,
    };
  },

  mounted() {

    this.fetchPlatformSales();
  },
  async created() {
    await this.fetchTotalSales();
    await this.fetchTotalOrder();
    await this.fetchTotalCustomer();
    await this.fetchTotalProspect();
  },
  methods: {
    async fetchTotalSales() {
      try {
        // Perform the logic to fetch email notifications
        const response = await axios.get('/api/orderList/complete');
        const orderList = response.data;
        console.log(orderList);

        let totalSales = 0;

        for (const order of orderList) {
          for (const product of order.orderedProducts) {
            const totalPrice = product.Op_UnitPrice * product.Op_Qty;
            totalSales += totalPrice;
          }
        }
        this.totalSale = totalSales;

        console.log('Total Sales:', totalSales);
      } catch (error) {
        console.error('Error fetching total sales:', error);
      }
    },

    async fetchTotalOrder() {
      try {
        // Perform the logic to fetch email notifications
        const response = await axios.get('/api/orderList/complete');
        const orderList = response.data;
        console.log(orderList);
        // Update the notification property based on the number of notifications
        this.totalOrder = orderList.length; // Set the number property to the length of notifications array
        this.order = orderList.length > 0;
      } catch (error) {
        console.error('Error fetching total orders:', error);
      }
    },

    async fetchTotalCustomer() {
      try {
        // Perform the logic to fetch email notifications
        const response = await axios.get('/api/customer');
        const customer = response.data;
        console.log(customer);
        // Update the notification property based on the number of notifications
        this.totalCustomer = customer.length; // Set the number property to the length of notifications array
        this.customer = customer.length > 0;
      } catch (error) {
        console.error('Error fetching total customer:', error);
      }
    },

    async fetchTotalProspect() {
      try {
        // Perform the logic to fetch email notifications
        const response = await axios.get('/api/prospect');
        const prospect = response.data;
        console.log(prospect);
        // Update the notification property based on the number of notifications
        this.totalProspects = prospect.length; // Set the number property to the length of notifications array
        this.prospect = prospect.length > 0;
      } catch (error) {
        console.error('Error fetching total prospect:', error);
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
              labels: ["Lazada", "Shopee", "Instagram", "Facebook", "TikTok"],
              datasets: [
                {
                  label: "Orders",
                  backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#FF9F40",
                  ],
                  data: [
                    data.filter((item) => item.order_platform === 'Lazada').length,
                    data.filter((item) => item.order_platform === 'Shopee').length,
                    data.filter((item) => item.order_platform === 'Instagram').length,
                    data.filter((item) => item.order_platform === 'Facebook').length,
                    data.filter((item) => item.order_platform === 'Tiktok').length,
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

  computed: {
    filteredRecentActivitiesJSON() {
      return JSON.stringify(this.recentActivities, null, 2);
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

.card-total {
  flex: 1;
  margin-bottom: 20px;
  margin-right: 20px;
  width: 100%;
}

.container-widger {

  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: start;
}

.container-total {
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

.data {
  font-size: 40px;
  font-weight: bold;
  flex-grow: 1;
  text-align: center;
}

.text-right {
  margin-top: 10px;
}

.card-platf {
  margin-right: 20px;
  margin-bottom: 30px;
}

.card-sales {
  padding: 20px;
  width: 900px;
  margin-bottom: 30px;
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

.year {
  width: 200px;
}

.container-sales {
  width: 100%;

}

.sales-chart {
  height: 300px;
  width: 100%;
}

.platform-chart {
  padding: 20px;

}
</style>