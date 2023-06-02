<template>
    <div class="container">

        <div class="container2">
            <h2>Order List</h2>
            <div>
                <v-text-field class="searchbar" :loading="loading" density="compact" variant="solo" label="Search"
                    append-inner-icon="mdi-magnify" single-line hide-details @click:append-inner="onClick"></v-text-field>
            </div>

        </div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Order Id</th>
                    <th>Category</th>
                    <th>Customer Name</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="list in orderList" :key="list._id">
                    <td>{{ list.order_ID }}</td>
                    <td>{{ list.order_type }}</td>
                    <td>{{ list.customer.customer_name }}</td>
                    <td>
                        <p v-for="product in list.orderedProducts" :key="product._id">
                            {{ product.inventoryItemName }}
                        </p>
                    </td>
                    <td>
                        <p v-for="product in list.orderedProducts" :key="product._id">
                            {{ product.Op_Qty }}
                        </p>
                    </td>
                    <td>
                        <p v-for="product in list.orderedProducts" :key="product._id">
                            {{ product.Op_UnitPrice }}
                        </p>
                    </td>
                    <td>
                        <p v-for="product in list.orderedProducts" :key="product._id" v-show="false">
                            {{ product.Op_UnitPrice * product.Op_Qty }}
                        </p>
                        <strong>{{ calculateTotalPrice(list.orderedProducts) }}</strong>
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
</template>

<script>
import axios from 'axios';
export default {
    name: 'orderList',
    data: () => ({
        loaded: false,
        loading: false,
        orderList: []
    }),
    components: {},
    mounted() {
        this.fetchOrders();
    },
    methods: {
        calculateTotalPrice(orderedProducts) {
            const total = orderedProducts.reduce(
                (total, product) => total + product.Op_Qty * product.Op_UnitPrice,
                0
            );
            return total.toFixed(2);
        },
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
        deleteOrder(orderId) {

        },
        editOrder(data) {

        }
    }
}
</script>

<style>
.container {
    padding: 20px;
}

.container2 {
    display: flex;
    justify-content: space-between;
}

h2 {
    margin-bottom: 30px;
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
</style>