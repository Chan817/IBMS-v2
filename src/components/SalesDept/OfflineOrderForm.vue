<template>
  <div id="app">
    <div class="content">

      <div class="order-details">
        <div class="title">Order Details</div>

        <div class="form">

          <div class="form-item">
            <label for="order-id">Order ID:</label>
            <input id="order-id" v-model="orderId" required />

          </div>

          <div class="form-item">
            <label for="customer-name">Customer Name:</label>
            <input id="customer-name" v-model="customerName" required />
          </div>

          <div class="form-item">
            <label for="customer-address">Customer Address:</label>
            <input id="customer-address" v-model="customerAddress" required />
          </div>

          <div class="form-item">
            <label for="customer-email">Customer Email:</label>
            <input id="customer-email" v-model="customerEmail" required />
          </div>

          <div class="form-item">
            <label for="customerContact">Customer Contact:</label>
            <input id="customerContact" v-model="customerContact" required />
          </div>

          <div class="form-item">
            <label for="business-type">Business Type:</label>
            <select id="business-type" v-model="businessType">
              <option value="B2B">B2B</option>
              <option value="B2C">B2C</option>
            </select>
            <label class="space-left" for="order-status">Order Status:</label>
            <select id="order-status" v-model="orderStatus">
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div class="form-item">
            <label for="order-product">Order Product:</label>
            <select id="order-product" v-model="selectedProduct">
              <option v-for="product in products" :key="product.id" :value="product.name">
                {{ product.name }}
              </option>
            </select>
            <label class="space-left" for="unit-price">Unit Price:</label>
            <input id="unit-price" v-model="unitPrice" />
            <label class="space-left" for="quantity">Quantity:</label>
            <input id="quantity" v-model="quantity" />
            <v-btn class="add-item" @click="addItem">Add Item</v-btn>
          </div>

          <div class="form-item">
            <label for="total-price">Total Price:</label>
            <input id="total-price" v-model="totalPrice" required />
          </div>

          <div class="form-item">
            <label for="remark">Remark:</label>
            <input id="remark" v-model="remark" required />
          </div>

          <div class="actions">
            <v-btn class="el-button" type="primary" @click="save" :disabled="isSaveDisabled">Save</v-btn>
            <v-btn class="el-button" type="danger" @click="cancel">Cancel</v-btn>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'offlineOrderUI',
  data() {
    return {
      orderId: "",
      customerName: "",
      customerAddress: "",
      customerEmail: "",
      customerContact: "",
      businessType: "",
      orderStatus: "",
      products: [
        { id: 1, name: "Product Abgfgy" },
        { id: 2, name: "Product B" },
        { id: 3, name: "Product C" },
      ],
      selectedProduct: "",
      unitPrice: "",
      quantity: "",
      totalPrice: "",
      remark: "",

    };
  },
  methods: {
    save() {
      const orderData = {
        order_ID: this.orderId,
        customer_name: this.customerName,
        customer_address: this.customerAddress,
        customer_email: this.customerEmail,
        customer_contact: this.customerContact,
        business_type: this.businessType,
        order_status: this.orderStatus,
        order_remark: this.remark,
      };

      axios.post('https://6108-119-40-120-147.ngrok-free.app/api/order', orderData)
        .then(
          res => {
            console.log(res)
          }
        ).catch(
          err => {
            console.log(err)
          }
        )
    },
    cancel() {

    },
    addItem() {

    },
    
  },
  computed: {
    isSaveDisabled() {
      return (
        !this.orderId ||
        !this.customerName ||
        !this.customerAddress ||
        !this.customerEmail ||
        !this.customerContact ||
        !this.businessType ||
        !this.orderStatus ||
        !this.selectedProduct ||
        !this.unitPrice ||
        !this.quantity ||
        !this.totalPrice ||
        !this.remark
      );
    },
  },
};
</script>
<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.order-details {
  margin-right: 50px;
  margin-left: 50px;
  margin-top: 20px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.form-item label {
  width: 160px;
  font-weight: bold;
}

.form-item input,
.form-item select {
  flex: 1;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.add-item {
  margin-left: 10px;
  background-color: #4C4D6C;
  color: #ffffff;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.el-button {
  margin-left: 10px;
  background-color: #4C4D6C;
  color: #ffffff;
}

.space-left {
  margin-left: 50px;
}
</style>
  