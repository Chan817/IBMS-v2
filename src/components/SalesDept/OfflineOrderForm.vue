<template>
  <div id="app">
    <div class="content">

      <div class="order-details">
        <div class="title">Order Details</div>

        <div class="form">

          <div class="form-item">
            <label for="order-id">Order ID:</label>
            <input id="order-id" v-model="order.orderId" required />

          </div>

          <div class="form-item">
            <label for="customer-name">Customer Name:</label>
            <input id="customer-name" v-model="customer.customerName" required />
          </div>

          <div class="form-item">
            <label for="customer-address">Customer Address:</label>
            <input id="customer-address" v-model="customer.customerAddress" required />
          </div>

          <div class="form-item">
            <label for="customer-email">Customer Email:</label>
            <input id="customer-email" v-model="customer.customerEmail" required />
          </div>

          <div class="form-item">
            <label for="customerContact">Customer Contact:</label>
            <input id="customerContact" v-model="customer.customerContact" required />
          </div>

          <div class="form-item">
            <label for="business-type">Business Type:</label>
            <select id="business-type" v-model="order.businessType">
              <option value="B2B">B2B</option>
              <option value="B2C">B2C</option>
            </select>
            <label class="space-left" for="order-status">Order Status:</label>
            <select id="order-status" v-model="order.orderStatus">
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div class="form-itemproduct" v-for="(item, index) in orderedproducts" :key="index">
            <label for="order-product">Order Product:</label>
            <select id="order-product" v-model="item.Inventory_ID">
              <option v-for="product in products" :key="product.id" :value="product.name">
                {{ product.name }}
              </option>
            </select>
            <label class="space-left" for="quantity">Quantity:</label>
            <input id="quantity" v-model="item.Op_Qty" @input="calculateTotalPrice" />
            <label class="space-left" for="unit-price">Unit Price:</label>
            <input id="unit-price" v-model="item.Op_UnitPrice" @input="calculateTotalPrice" />
            <label class="space-left" for="amount">Amount:</label>
            <input id="amount" :value="calculateAmount(item)" readonly />
            <v-btn class="add-item" @click="addItem">Add Item</v-btn>
          </div>

          <div class="form-item">
            <label for="total-price">Total Price:</label>
            <input id="total-price" v-model="totalPrice" required />
          </div>

          <div class="form-item">
            <label for="remark">Remark:</label>
            <input id="remark" v-model="order.remark" required />
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
      order: {
        orderId: "",
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
      products: [
        { id: 1, name: "Product Abgfgy" },
        { id: 2, name: "Product B" },
        { id: 3, name: "Product C" },
      ],
      orderedproducts: [
        {
          Inventory_ID: "",
          Op_UnitPrice: "",
          Op_Qty: "",
          amount: 0,
          totalPrice: 0,
        },
      ],
    };
  },
  methods: {
    save() {
      const orderData = {
        order_type: "Offline",
        customer_ID: "0",
        order_ID: this.order.orderId,
        customer_name: this.customer.customerName,
        customer_address: this.customer.customerAddress,
        customer_email: this.customer.customerEmail,
        customer_contact: this.customer.customerContact,
        business_type: this.order.businessType,
        order_status: this.order.orderStatus,
        items: this.orderedproducts,
        order_remark: this.order.remark,
      };

      axios.post('https://d61f-119-40-118-218.ngrok-free.app/api/order', orderData)
        .then(
          res => {
            console.log(res)
          }
        ).catch(
          err => {
            console.log(err)
          }
        )
      this.resetForm();
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
    cancel() {
      this.resetForm();

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
        !this.customer.customerAddress ||
        !this.customer.customerEmail ||
        !this.customer.customerContact ||
        !this.order.businessType ||
        !this.order.orderStatus
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

.form-itemproduct {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.form-itemproduct label {
  width: 100px;
  font-weight: bold;
}

.form-itemproduct input,
.form-itemproduct select {
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
  