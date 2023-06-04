<template>
    <div id="app">
        <div class="container">
            <div class="title">Update This Order</div>
            <form @submit.prevent="updateForm" enctype="multipart/form-data">

                <div class="form-group">
                    <label for="order-type">Category:</label>
                    <span class="required-field">*</span>
                    <select class="select" id="order-type" v-model="order.orderType" required>
                        <option value="online">Offline</option>
                        <option value="offline">Online</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="order-id">Order ID: <span class="required-field">*</span></label>
                    <input id="order-id" v-model="order.orderId" required />
                </div>

                <div class="form-group">
                    <label for="customer-name">Customer Name: <span class="required-field">*</span></label>
                    <input id="customer-name" v-model="customer.customerName" required />
                </div>

                <div class="form-group">
                    <label for="customer-address">Customer Address:</label>
                    <input id="customer-address" v-model="customer.customerAddress" />
                </div>

                <div class="form-group">
                    <label for="customer-email">Customer Email:</label>
                    <input id="customer-email" v-model="customer.customerEmail" />
                </div>

                <div class="form-group">
                    <label for="customerContact">Customer Contact: <span class="required-field">*</span></label>
                    <input id="customerContact" v-model="customer.customerContact" required />
                </div>

                <div class="form-group">
                    <label for="business-type">Business Type: <span class="required-field">*</span></label>
                    <select id="business-type" v-model="order.businessType">
                        <option value="B2B">B2B</option>
                        <option value="B2C">B2C</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="order-status">Order Status: <span class="required-field">*</span></label>
                    <select id="order-status" v-model="order.orderStatus">
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>

                <div class="form-itemproduct" v-for="(item, index) in orderedproducts" :key="index">

                    <div class="form-group">
                        <label for="order-product">Order Product:</label>
                        <select id="order-product" v-model="item.inventoryItemName">
                            <option v-for="product in products" :key="product.id" :value="product.name">
                                {{ product.name }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="quantity">Quantity:</label>
                        <input id="quantity" v-model="item.Op_Qty" @input="calculateTotalPrice" />
                    </div>

                    <div class="form-group">
                        <label for="unit-price">Unit Price:</label>
                        <input id="unit-price" v-model="item.Op_UnitPrice" @input="calculateTotalPrice" />
                    </div>


                    <div class="form-group">
                        <label for="amount">Amount:</label>
                        <input id="amount" :value="calculateAmount(item)" readonly />
                    </div>

                    <div class="container2">
                        <v-btn class="el-button1" @click="addItem">Add Item</v-btn>
                    </div>

                </div>

                <div class="form-group">
                    <label for="total-price">Total Price:</label>
                    <input type="number" id="total-price" v-model="totalPrice" required />
                </div>

                <div class="form-group">
                    <label for="remark">Remark:</label>
                    <textarea id="remark" v-model="order.remark"></textarea>
                </div>

                <div class="button-group">
                    <v-btn type="submit" class="save-button" :disabled="isSaveDisabled" @click="updateForm">Update</v-btn>
                    <v-btn type="button" class="cancel-button" @click="backPrevious">Cancel</v-btn>
                </div>

            </form>
            <!-- Update confirmation dialog -->
            <v-dialog v-model="showUpdateConfirmation" max-width="500px">
                <v-card>
                    <v-card-title>Update Item</v-card-title>
                    <v-card-text>
                        Are you sure you want to update this item?
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" text @click="confirmUpdateItem">Update</v-btn>
                        <v-btn text @click="showUpdateConfirmation = false">Cancel</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>

    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'EditOfflineOrder',
    data() {
        return {
            order: {
                orderId: "",
                orderType:"",
                businessType: "",
                orderStatus: "",
                remark: "",
            },
            customer: {
                customerName: "",
                customerAddress: "",
                customerEmail: "",
                customerContact: "",
            },
            products: [],
            orderedproducts: [
                {
                    Inventory_ID: "",
                    Op_UnitPrice: "",
                    Op_Qty: "",
                    amount: 0,
                },
            ],
            totalPrice: 0,
            showUpdateConfirmation: false,
        };
    },
    created() {
        this.fetchAvailableProducts();
        const orderId = this.$route.params.id;
        this.orderId = orderId; // Assign itemId to component's data property
        this.fetchItem(orderId);
    },
    methods: {
        async fetchAvailableProducts() {
            try {
                const response = await axios.get("/api/inventoryitem/product");
                this.products = response.data.map((product) => ({
                    id: product._id,
                    name: product.Inv_Name,
                }));
                console.log(this.products);
            } catch (error) {
                console.error(error);
            }
        },
        fetchItem(orderId) {
            axios
                .get(`/api/order/orderdetail/${orderId}`)
                .then((response) => {
                    const orderdetails = response.data;
                    this.order.orderId = orderdetails.order_ID;
                    this.order.orderType = orderdetails.order_type;
                    this.order.businessType = orderdetails.business_type;
                    this.order.orderStatus = orderdetails.order_status;
                    this.order.remark = orderdetails.order_remark;
                    this.customer.customerName = orderdetails.customer.customer_name;
                    this.customer.customerAddress = orderdetails.customer.customer_address;
                    this.customer.customerEmail = orderdetails.customer.customer_email;
                    this.customer.customerContact = orderdetails.customer.customer_contact;
                    this.orderedproducts = orderdetails.orderedProducts;

                    // Calculate the amount for each ordered product and populate quantity and unit price
                    this.orderedproducts.forEach((item) => {
                        this.orderedproducts.inventoryItemName = orderdetails.orderedProducts.inventoryItemName;
                        this.orderedproducts.Op_Qty = orderdetails.orderedProducts.Op_Qty || ""; // Populate quantity if available, otherwise empty string
                        this.orderedproducts.Op_UnitPrice = orderdetails.orderedProducts.Op_UnitPrice || ""; // Populate unit price if available, otherwise empty string
                        this.orderedproducts.amount = this.calculateAmount(item);
                    });

                    this.totalPrice = this.calculateTotalPrice();


                })
                .catch((error) => {
                    console.error('Error fetching item:', error);
                });
        },
        updateForm() {
            // Show the update confirmation dialog
            this.showUpdateConfirmation = true;
        },
        confirmUpdateItem() {
            const orderData = {
                order_type: "Offline",
                customer_ID: "0",
                order_ID: this.order.orderId,
                customer_name: this.customer.customerName,
                customer_contact: this.customer.customerContact,
                business_type: this.order.businessType,
                order_status: this.order.orderStatus,
                items: this.orderedproducts,
            };
            if (this.customer.customerAddress) {
                orderData.customer_address = this.customer.customerAddress;
            }
            if (this.customer.customerEmail) {
                orderData.customer_email = this.customer.customerEmail;
            }
            if (this.order.order_remark) {
                orderData.order_remark = this.order.order_remark;
            }
            console.log(orderData)

            axios.post('http://localhost:5000/api/order', orderData)
                .then(
                    console.log(orderData.data),
                    res => {
                        console.log(res)
                    }
                ).catch(
                    err => {
                        console.log(err)
                    }
                )
            this.$router.go(-1);
        },

        calculateAmount(item) {
            if (item.Op_UnitPrice && item.Op_Qty) {
                const amount = (parseFloat(item.Op_UnitPrice) * parseInt(item.Op_Qty)).toFixed(2);
                item.amount = amount; // Add the amount property to the item
                this.calculateTotalPrice(); // Recalculate the total price
                return amount;
            }
            return 0;
        },
        calculateTotalPrice() {
            let totalPrice = 0;
            for (const item of this.orderedproducts) {
                if (item.amount) {
                    totalPrice += parseFloat(item.amount);
                }
            }
            this.totalPrice = totalPrice.toFixed(2);
        },
        backPrevious() {
            this.$router.go(-1);
        },
        addItem() {
            // Create a new item object with empty values
            const newItem = {
                Inventory_ID: "",
                Op_UnitPrice: "",
                Op_Qty: ""
            };

            // Push the new item to the products array
            this.orderedproducts.push(newItem);
        },
        resetForm() {
            this.order = {
                orderId: "",
                businessType: "",
                orderStatus: "",
                remark: "",
            };
            this.customer = {
                customerName: "",
                customerAddress: "",
                customerEmail: "",
                customerContact: "",
            };

            this.orderedproducts = [{
                Inventory_ID: "",
                Op_UnitPrice: "",
                Op_Qty: "",
                amount: 0,
                totalPrice: 0,
            }],
                this.selectedProduct = "";
            this.Op_UnitPrice = "";
            this.Op_Qty = "";
            this.totalPrice = 0;
        },


    },
    computed: {
        isSaveDisabled() {
            return (
                !this.order.orderId ||
                !this.customer.customerName ||
                !this.customer.customerContact ||
                !this.order.businessType ||
                !this.order.orderStatus
            );
        },
    },
};
</script>
<style scoped>
.required-field {
    color: red;
}

.title {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
}

.container {
    padding: 30px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    font-weight: bold;
}

.form-group input,
.form-group select,
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-itemproduct {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    justify-content: space-between;
}

.form-itemproduct label {
    font-weight: bold;
}

.form-itemproduct input,
.form-itemproduct select {
    flex: 1;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}


.button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.save-button {
    padding: 10px 20px;
    margin-left: 10px;
    background-color: #4C4D6C;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.el-button1 {

    background-color: #4C4D6C;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.container2 {
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.cancel-button {
    margin-left: 10px;
    background-color: #a60c1b;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>
    