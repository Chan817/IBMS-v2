<template>
    <div id="app">
      <div class="content">
    <div class="order-details">
              <div class="title">Order Details</div>

              <div class="form">

                <div class="form-item">
                  <label for="order-id">Order ID:</label>
                  <input id="order-id" v-model="orderId" />
                </div>

                <div class="form-item">
                  <label for="customer-name">Customer Name:</label>
                  <input id="customer-name" v-model="customerName" />
                </div>

                <div class="form-item">
                  <label for="customer-address">Customer Address:</label>
                  <input id="customer-address" v-model="customerAddress" />
                </div>

                <div class="form-item">
                  <label for="customer-email">Customer Email:</label>
                  <input id="customer-email" v-model="customerEmail" />
                </div>

                <div class="form-item">
                  <label for="business-type">Business Type:</label>
                  <select id="business-type" v-model="businessType">
                    <option value="B2B">B2B</option>
                    <option value="B2C">B2C</option>
                  </select>
                  <label for="order-status">Order Status:</label>
                  <select id="order-status" v-model="orderStatus">
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div class="form-item">
                  <label for="order-product">Order Product:</label>
                  <select id="order-product" v-model="selectedProduct">
                    <option
                      v-for="product in products"
                      :key="product.id"
                      :value="product.name"
                    >
                      {{ product.name }}
                    </option>
                  </select>
                  <label for="unit-price">Unit Price:</label>
                  <input id="unit-price" v-model="unitPrice" />
                  <label for="quantity">Quantity:</label>
                  <input id="quantity" v-model="quantity" />
                  <v-btn class="add-item" @click="addItem">Add Item</v-btn>
                </div>

                <div class="form-item">
                  <label for="total-price">Total Price:</label>
                  <input id="total-price" v-model="totalPrice" />
                </div>

                <div class="form-item">
                  <label for="remark">Remark:</label>
                  <input id="remark" v-model="remark" />
                </div>

                <div class="actions">
                  <v-btn class="el-button" type="primary" @click="save">Save</v-btn>
                  <v-btn class="el-button" type="danger" @click="cancel">Cancel</v-btn>
                </div>

              </div>
            </div>
      </div>
        
      </div>
    
  </template>
  <script>
  export default {
    name: "CustomerDetails",
    data() {
      return {
        currentTime: "",
        username: "John Doe",
        avatarUrl: "https://images.api.hahow.in/images/5ef5c9c316a75b4c31084fa8",
        orderId: "",
        customerName: "",
        customerAddress: "",
        customerEmail: "",
        businessType: "B2B",
        orderStatus: "Pending",
        products: [
          { id: 1, name: "Product A" },
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
    mounted() {
      setInterval(() => {
        const now = new Date();
        this.currentTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      }, 1000);
    },
    methods: {
      save() {
        
      },
      cancel() {
        
      },
      addItem() {
        
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
  
  .header {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 20px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
  }
  
  .time {
    font-size: 16px;
    margin-right: 20px;
  }
  
  .user {
    display: flex;
    align-items: center;
  }
  
  .name {
    font-size: 16px;
    margin-right: 10px;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .icon-bell {
    font-size: 24px;
  }
  
  .divider {
    width: 100%;
    height: 2px;
    background-color: #ccc;
    margin: 20px 0;
  }
  
  .menu {
    height: 50px;
    background-color: #333;
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
  }
  
  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .el-button {
    margin-left: 10px;
  }
  </style>
  