<template>
  <div id="app">

    <div class="content">

      <div class="details">

        <div class="title">Order Details</div>

        <div class="form">

          <div class="form-item">
            <label for="order-id">Order ID: <span class="required-field">*</span></label>
            <input id="order-id" v-model="order.orderId" required />
          </div>

          <div class="form-item">
            <label for="customer-name">Customer Name: <span class="required-field">*</span></label>
            <input id="customer-name" v-model="customer.customerName" required />
          </div>

          <div class="form-item">
            <label for="customer-address">Customer Address:</label>
            <input id="customer-address" v-model="customer.customerAddress" />
          </div>

          <div class="form-item">
            <label for="customer-email">Customer Email:</label>
            <input id="customer-email" v-model="customer.customerEmail" />
          </div>

          <div class="form-item">
            <label for="customerContact">Customer Contact: <span class="required-field">*</span></label>
            <input id="customerContact" v-model="customer.customerContact" required />
          </div>

          <div class="form-item">
            <label for="orderPlatform">Order Platform: <span class="required-field">*</span></label>
            <select id="orderPlatform" v-model="order.orderPlatform">
              <option value="Lazada">Lazada</option>
              <option value="Shopee">Shopee</option>
              <option value="Shopee">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="Tiktok">Tiktok</option>
            </select>

            <label class="space-left" for="orderStatus">Order Status: <span class="required-field">*</span></label>
            <select id="orderStatus" v-model="order.orderStatus">
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
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
            <label for="trackingNumber">Tracking Number: </label>
            <input id="trackingNumber" v-model="order.trackingNumber" />
          </div>

          <div class="form-item">
            <label for="remark">Remark:</label>
            <input id="remark" v-model="order.remark" />
          </div>
        </div>

        <div class="actions">
          <v-btn class="el-button" type="primary" @click="save" :disabled="isSaveDisabled">Save</v-btn>
          <v-btn class="el-button" type="danger" @click="cancel">Cancel</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'onlineOrderUI',
  data() {
    return {
      order: {
        orderId: "",
        orderPlatform: "",
        trackingNumber: "",
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

    };
  },
  created() {
    this.fetchAvailableProducts();
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
    save() {
      const orderData = {
        order_type: "Online",
        customer_ID: "0",
        order_ID: this.order.orderId,
        customer_name: this.customer.customerName,
        customer_contact: this.customer.customerContact,
        order_status: this.order.orderStatus,
        items: this.orderedproducts,
        order_platform: this.order.orderPlatform,
        order_trackingNum: this.order.trackingNumber
      };
      if (this.order.trackingNumber) {
        orderData.order_trackingNum = this.order.trackingNumber;
      }
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
        trackingNumber: "",
        orderPlatform: "",
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
        !this.order.orderPlatform ||
        !this.order.orderStatus
      );
    },
  },
};
</script>
<style>
.required-field {
  color: red;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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