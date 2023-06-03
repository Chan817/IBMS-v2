<template>
    <div class="container">

        <div class="container2">
            <div class="title">Order List</div>
            
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
                        <th>Category</th>
                        <th>Customer Name</th>
                        <th>Address</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="list in orderList" :key="list._id">
                        <td>{{ list.order_ID }}</td>
                        <td>{{ list.order_type }}</td>  
                        <td>{{ list.customer.customer_name }}</td>
                        <td>{{ list.customer.customer_address }}</td>
                        <td>
                            <p v-for="product in list.orderedProducts" :key="product._id">
                                {{ product.inventoryItemName }}
                            </p>
                        </td>
                        <td>{{ list.order_status }}</td>
                        <td>
                            <div class="row">
                                <v-btn icon="mdi-vuetify" variant="plain" @click='editOrder(list.id)'></v-btn>
                                <v-btn icon="mdi-vuetify" variant="plain" @click='deleteOrder(list.id)'></v-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'orderList',
    data: () => ({
        loaded: false,
        loading: false,
        orderList: [],
        searchKeyword:'',
    }),
    components: {},
    mounted() {
        this.fetchOrders();
    },
    methods: {
        fetchOrders() {
            console.log("in vue script");
            axios
                .get('/api/orderList/pending') // Adjust the route path if necessary
                .then((response) => {
                    console.log(response.data);
                    this.orderList = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        deleteOrder(orderId) {

        },
        editOrder(data) {

        },
        onClick() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.loaded = true;
                if (this.searchKeyword) {
                    this.orderList = this.orderList;
                }
            }, 1000);
        },
    },
    computed: {
        orderList(){
            if (!this.searchKeyword) {
                return this.orderList;
                } else {
                const keyword = this.searchKeyword.toLowerCase();
                return this.orderList.filter((order) => {
                    
                    const customerName = order.customer.customer_name.toLowerCase();
                    const inventoryItems = order.orderedProducts.map(
                    (product) => product.inventoryItemName.toLowerCase()
                    );

                    return (
                    (order.order_IDorder_type && order.order_IDorder_type.toLowerCase().includes(keyword)) ||
                    (order.order_type && order.order_type.toLowerCase().includes(keyword)) ||
                    (order.order_status && order.order_status.toLowerCase().includes(keyword)) ||
                    (order.customer.customer_name && order.customer.customer_name.toLowerCase().includes(keyword)) ||
                    inventoryItems.some((item) => item.includes(keyword))
                    
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
    border: 2px solid #6b6b6b;
}

table th,
table td {
    padding: 8px;
    text-align: left;
    border: 2px solid #6b6b6b;
}
.search-bar {
  width: 300px; /* Adjust the width as desired */
  margin-bottom: 20px;
}

.table-wrapper {
  overflow-y: auto;
}
</style>