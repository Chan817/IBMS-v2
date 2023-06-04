<template>
    <div class="container">
        <div class="container2">
            <h2>Shipping Orders</h2>
            <div>
                <v-text-field class="searchbar" :loading="loading" density="compact" variant="solo" label="Search"
                    append-inner-icon="mdi-magnify" single-line hide-details @click:append-inner="onClick"></v-text-field>
            </div>

        </div>

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Order Id</th>
                    <th>Order Type</th>
                    <th>Customer Name</th>
                    <th>Order Date</th>
                    <th>Shipped Date</th>
                    <th>Tracking Number</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="Shipping in orderList" :key="Shipping.id">
                    <td>{{ Shipping.order_ID }}</td>
                    <td>{{ Shipping.order_type }}</td>
                    <td>{{ Shipping.customer.customer_name }}</td>
                    <td>{{ Shipping.order_Date }}</td>
                    <td>{{ Shipping.shipped_Date }}</td>
                    <td>{{ Shipping.order_trackingNum }}</td>
                </tr>
            </tbody>
        </table>

        <div>
            <v-btn class="el-button" @click="backPrevious">Back</v-btn>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ShippingOrder',
    data: () => ({
        loaded: false,
        loading: false,
        orderList: []
    }),
    mounted() {
        this.fetchOrders();
    },
    methods: {
        fetchOrders() {
            console.log("in vue script");
            axios
                .get('/api/orderList/shipped') // Adjust the route path if necessary
                .then((response) => {
                    console.log(response.data);
                    this.orderList = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        backPrevious() {
            this.$router.go(-1);
        }
    }
}
</script>

<style>
.container {
    padding-left: 50px;
    padding-right: 50px;
}

.container2 {
    display: flex;
    justify-content: space-between;
}

h2 {
    margin-bottom: 30px;
    margin-top: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    border: 2px solid #6b6b6b;
}

table th,
table td {
    padding: 8px;
    text-align: center;
    border: 2px solid #6b6b6b;
}

.search {
    margin-left: 400px;
}

.searchbar {
    margin-top: 20px;
    width: 100px;
}

.el-button {
    margin-top: 20px;
    background-color: #4C4D6C;
    color: #ffffff;
}
</style>