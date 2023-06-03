<template>
    <div class="container">
        

        <div class="container2">
            <div class="title">All Orders</div>
            
            <div class="container3">
                <div>
                    <v-menu class="categoty-menu">
                        <template v-slot:activator="{ props }">
                            <v-btn 
                            class="categoty-button"
                            color="primary"
                            v-bind="props"
                            >
                            Categories
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            :value="index"
                            :to="item.routePath"
                            >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu> 
                </div>
            
            
                <div>
                <v-text-field
                    class="searchbar"
                    :loading="loading"
                    density="compact"
                    variant="solo"
                    label="Search"
                    append-inner-icon="mdi-magnify"
                    single-line
                    hide-details
                    v-model="searchKeyword"
                    @click:append-inner="onClick"
                ></v-text-field> 
                </div>
            </div>
            

        </div>
        
        <div class="table-wrapper">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>Order Id</th>
                    <th>Order Type</th>
                    <th>Customer Name</th>
                    <th>Customer Address</th>
                    <th>Product List</th>
                    <th>Quantity</th>
                    <th>Order Date</th>
                    <th>Shipped Date-later change</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="order in orderList" :key="order._id">
                    <td>{{ order.order_ID }}</td>
                    <td>{{ order.order_type }}</td>
                    <td>{{ order.customer.customer_name }}</td>
                    <td>{{ order.customer.customer_address }}</td>
                    <td>
                        <p v-for="product in order.orderedProducts" :key="product._id">
                            {{ product.inventoryItemName }}
                        </p>
                    </td>
                    <td>
                        <p v-for="product in order.orderedProducts" :key="product._id">
                            {{ product.Op_Qty }}
                        </p>
                    </td>
                    <td>{{ order.order_Date }}</td>
                    <td>{{ order.order_Date }}</td>
                    <td>{{ order.order_status }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: 'Order',
        components: {
            
        },
        props: ['Order'],
        data: () => ({
            loaded: false,
            loading: false,
            orderList: [],
            searchKeyword:'',
            items: [
                { title: 'Pending', routePath: '/toship'},
                { title: 'Shipped' , routePath: '/shipping' },
                { title: 'Completed' , routePath: '/completed' },
                { title: 'Cancelled' , routePath: '/cancel' },
            ],
        }),
        mounted() {
            this.fetchOrders();
        },
        
        methods: {
            fetchOrders() {
                console.log("in vue script");
                axios
                    .get('/api/orderList') // Adjust the route path if necessary
                    .then((response) => {
                        console.log(response.data);
                        this.orderList = response.data;
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
                    this.orderList = this.orderList;
                }
                }, 1000)
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
                    (order.order_ID && order.order_ID.toLowerCase().includes(keyword)) ||
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

<style>
.container{
    padding: 30px;
}
.container2{
    
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    flex-wrap: wrap; 
}
.container3{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    margin-bottom: 20px;
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
    text-align:center;
    border: 2px solid #6b6b6b;
  }

.searchbar{
    width: 300px; /* Adjust the width as desired */
    margin-bottom: 20px;
    margin-right: 10px;
}
.table-wrapper {
  overflow-y: auto;
}
.categoty-button{
    width: 300px;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-top: 24px;
    background-color: #4C4D6C;
    color: #ffffff;
}
</style>