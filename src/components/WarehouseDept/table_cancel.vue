<template>
    <div class="container">
        

        <div class="container2">
            <!-- <h2>Cancellation Orders</h2> -->
            <div class="title">Cancellation Orders</div>
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
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>Order Id</th>
                    <th>Order Type</th>
                    <th>Customer Name</th>
                    <th>Order Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="cancel in cancelList" :key="cancel._id">
                    <td>{{ cancel.order_ID }}</td>
                    <td>{{ cancel.order_type }}</td>
                    <td>{{ cancel.customer.customer_name }}</td>
                    <td>{{ cancel.order_Date }}</td>
                    <td>{{ cancel.order_status }}</td>

                </tr>
                </tbody>
            </table>
        </div>
        <div>
          <v-btn class="el-button" @click="backPrevious">Back</v-btn>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: 'cancelOrder',
        components: {
            
        },
        
        data: () => ({
            loaded: false,
            loading: false,
            cancelList: [],
            searchKeyword:'',
        }),
        mounted() {
            this.fetchOrders();
        },
        methods: {
            fetchOrders() {
                console.log("in vue script");
                axios
                    .get('/api/orderList/cancel') // Adjust the route path if necessary
                    .then((response) => {
                        console.log(response.data);
                        this.cancelList = response.data;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
            onClick () {
                this.loading = true

                setTimeout(() => {
                this.loading = false
                this.loaded = true
                if (this.searchKeyword) {
                        this.cancelList = this.cancelList;
                    }
                }, 1000);
            },
            backPrevious(){
                this.$router.go(-1);
            }
        },
        computed: {
        cancelList(){
            if (!this.searchKeyword) {
                return this.cancelList;
                } else {
                const keyword = this.searchKeyword.toLowerCase();
                return this.cancelList.filter((order) => {

                    return (
                    (order.order_ID && order.order_ID.toLowerCase().includes(keyword)) ||
                    (order.order_type && order.order_type.toLowerCase().includes(keyword)) ||
                    (order.order_status && order.order_status.toLowerCase().includes(keyword)) ||
                    (order.customer.customer_name && order.customer.customer_name.toLowerCase().includes(keyword)) ||
                    (order.order_status && order.order_status.toLowerCase().includes(keyword))  
                    );
                });
            }
        }
    }
     }
</script>

<style scoped>
.container {
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
    border: 1px solid #6b6b6b;
}

table th,
table td {
    padding: 8px;
    text-align: center;
    border: 1px solid #6b6b6b;
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
  width: 300px; /* Adjust the width as desired */
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