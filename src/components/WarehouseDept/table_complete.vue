<template>
    <div class="container">

        <div class="container2">
            <div class="title">Completed Orders</div>

            <div class="search-bar">
                <v-text-field class="searchbar" :loading="loading" density="compact" variant="solo" label="Search"
                    append-inner-icon="mdi-magnify" single-line hide-details @click:append-inner="onClick"></v-text-field>
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
                        <th>Shipped Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="Completed in CompletedList" :key="Completed._id">
                        <td>{{ Completed.order_ID }}</td>
                        <td>{{ Completed.order_type }}</td>
                        <td>{{ Completed.customer.customer_name }}</td>
                        <td>{{ Completed.order_Date }}</td>
                        <td>{{ Completed.shipped_Date }}</td>
                        <td>{{ Completed.order_status }}</td>
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
    name: 'completeOrder',
    components: {

    },
    props: ['completeOrder'],
    data: () => ({
        loaded: false,
        loading: false,
        CompletedList: [],
        searchKeyword: '',
    }),
    methods: {
        fetchOrders() {
            console.log("in vue script");
            axios
                .get('/api/orderList/complete') // Adjust the route path if necessary
                .then((response) => {
                    console.log(response.data);
                    this.CompletedList = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        onClick() {
            this.loading = true

            setTimeout(() => {
                this.loading = false
                this.loaded = true
                if (this.searchKeyword) {
                    this.CompletedList = this.CompletedList;
                }
            }, 1000);
        },
        backPrevious() {
            this.$router.go(-1);
        }
    },
    CompletedList() {
        if (!this.searchKeyword) {
            return this.CompletedList;
        } else {
            const keyword = this.searchKeyword.toLowerCase();
            return this.CompletedList.filter((order) => {

                return (
                    (order.order_ID && order.order_ID.toLowerCase().includes(keyword)) ||
                    (order.order_type && order.order_type.toLowerCase().includes(keyword)) ||
                    (order.order_Date && order.order_Date.toLowerCase().includes(keyword)) ||
                    (order.order_status && order.order_status.toLowerCase().includes(keyword)) ||
                    (order.customer.customer_name && order.customer.customer_name.toLowerCase().includes(keyword)) ||
                    (order.shipped_Date && order.shipped_Date.toLowerCase().includes(keyword))
                );
            });
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

.el-button {
    margin-top: 20px;
    background-color: #4C4D6C;
    color: #ffffff;
}
</style>