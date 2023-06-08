<template>
    <div class="container">

        <div class="container2">
            <div class="title">Pending Order</div>

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
                                <v-btn class="shipped-button" @click='shipOrder(list._id)'>Ship Order</v-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div>
            <v-btn class="el-button" @click="backPrevious">Back</v-btn>
        </div>

        <v-dialog v-model="showUpdateConfirmation" max-width="500px">
            <v-card>
                <v-card-title>Please update the tracking number.</v-card-title>
                <v-text-field class="textfield-trackNum" label="Tracking Number" variant="outlined"
                    v-model="trackingNumber"></v-text-field>
                <v-card-actions>
                    <v-btn color="red" text @click="confirmUpdateItem">Update</v-btn>
                    <v-btn text @click="showUpdateConfirmation = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment-timezone';

export default {
    name: 'orderList',
    data: () => ({
        loaded: false,
        loading: false,
        orderList: [],
        searchKeyword: '',
        showUpdateConfirmation: false,
        orderId: null,
        trackingNumber: null
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
        shipOrder(orderId) {

            this.showUpdateConfirmation = true;
            this.orderId = orderId;

        },
        confirmUpdateItem() {
            this.showUpdateConfirmation = false;
            const malaysiaTimeZone = 'Asia/Kuala_Lumpur';
            const shippedDate = moment().tz(malaysiaTimeZone).format('YYYY-MM-DD HH:mm:ss');
            const trackingNumber = this.trackingNumber;

            // Find the index of the order in the orderList array
            const orderIndex = this.orderList.findIndex(order => order._id === this.orderId);


            // Make API call or update the order status and shipped date locally
            axios
                .patch(`/api/order/shippedOrder/${this.orderId}`, {
                    order_status: 'Shipped',
                    shipped_Date: shippedDate,
                    order_trackingNum: this.trackingNumber,
                })
                .then((response) => {
                    console.log('Order shipped successfully');
                    // Update the order locally
                    this.orderList[orderIndex].order_status = 'Shipped';

                    this.orderList.splice(orderIndex, 1);
                })
                .catch((error) => {
                    console.error('Error shipping order:', error);
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
        backPrevious() {
            this.$router.go(-1);
        }
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

.shipped-button {
    background-color: #4C4D6C;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.el-button {
    margin-top: 20px;
    background-color: #4C4D6C;
    color: #ffffff;
}

.textfield-trackNum {
    padding: 20px;
}
</style>