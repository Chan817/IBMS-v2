<template>
    <div class="container">

        <div class="container2">
            <div class="title">Order List</div>

            <div class="search-bar">
                <v-text-field :loading="loading" density="compact" variant="solo" label="Search keyword"
                    append-inner-icon="mdi-magnify" single-line hide-details v-model="searchKeyword"
                    @click:append-inner="onClick"></v-text-field>
            </div>

        </div>

        <div class="table-wrapper">
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
                                <v-btn icon="mdi-pencil" variant="plain" @click='editOrder(list._id)'></v-btn>
                                <v-btn icon="mdi-delete" variant="plain" @click='deleteOrder(list._id)'></v-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <v-dialog v-model="showDeleteConfirmation" max-width="500px">
                <v-card>
                    <v-card-title>Delete Item</v-card-title>
                    <v-card-text>
                        Are you sure you want to delete this item?
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="red" text @click="confirmDeleteItem">Delete</v-btn>
                        <v-btn text @click="showDeleteConfirmation = false">Cancel</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
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
        searchKeyword: '',
        showDeleteConfirmation: false,
        deleteOrderId: null,
    }),
    components: {},
    mounted() {
        this.fetchOrders();
    },
    methods: {
        fetchOrderDetails(orderId) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/api/order/${orderId}`)
                    .then(response => {
                        const data = response.data;
                        console.log("In fetchOrderDetails");
                        console.log(data);
                        resolve(data);
                    })
                    .catch(error => {
                        console.error('Error fetching order details', error);
                        reject(error);
                    });
            });
        },
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
            this.showDeleteConfirmation = true;
            this.deleteOrderId = orderId;
        },
        confirmDeleteItem() {
            this.showDeleteConfirmation = false;
            const orderId = this.deleteOrderId;
            // Proceed with the deletion
            axios.delete(`/api/order/${orderId}`)
                .then((response) => {
                    const index = this.orderList.findIndex((list) => list._id === orderId);
                    if (index !== -1) {
                        this.orderList.splice(index, 1);
                    }
                })
                .catch((error) => {
                    console.error('Error deleting item:', error);
                });
        },
        editOrder(orderId) {
            this.fetchOrderDetails(orderId)
                .then(order => {
                    this.$router.push({ name: 'editOrder', params: { id: orderId } });
                })
                .catch(error => {
                    // Handle any errors that occur during fetching order details
                    console.error('Error fetching order details', error);
                });
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
        orderList() {
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

<style scoped>
.container {
    padding: 30px;
}

.container2 {
    flex: 1;
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    flex-wrap: wrap;
    /* Allow elements to wrap on smaller screens */
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
    text-align: center;
    border: 2px solid #6b6b6b;
}

.search-bar {
    width: 300px;
    /* Adjust the width as desired */
    margin-bottom: 20px;
}

.table-wrapper {
    overflow-y: auto;
}

.row {
    justify-content: center;
    display: flex;
}
</style>