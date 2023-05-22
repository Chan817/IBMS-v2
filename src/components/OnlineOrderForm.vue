<template>
    <div id="app">
      
      <div class="content">
        
        <div class="details">

          <div class="title">Order Details</div>

          <div class="form">

            <div class="form-item">
              <label for="orderId">Order ID:</label>
              <input id="orderId" v-model="orderId" />
            </div>

            <div class="form-item">
              <label for="customerName">Customer Name:</label>
              <input id="customerName" v-model="customerName" />
            </div>

            <div class="form-item">
              <label for="customerAddress">Customer Address:</label>
              <input id="customerAddress" v-model="customerAddress" />
            </div>

            <div class="form-item">
              <label for="customerEmail">Customer Email:</label>
              <input id="customerEmail" v-model="customerEmail" />
            </div>

            <div class="form-item">
              <label for="customerContact">Customer Contact:</label>
              <input id="customerContact" v-model="customerContact" />
            </div>

            <div class="form-item">
              <label for="orderPlatform">Order Platform:</label>
              <select id="orderPlatform" v-model="orderPlatform">
                <option value="Lazada">Lazada</option>
                <option value="Shopee">Shopee</option>
                <option value="Shopee">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Tiktok">Tiktok</option>
              </select>
              
              <label for="orderStatus">Order Status:</label>
              <select id="orderStatus" v-model="orderStatus">
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div class="form-item">
              <label for="orderProduct">Order Product:</label>
              <select id="orderProduct" v-model="selectedProduct">
                <option
                  v-for="product in products"
                  :key="product.id"
                  :value="product.id"
                >
                  {{ product.name }}
                </option>
              </select>
              <label for="unitPrice">Unit Price:</label>
              <input id="unitPrice" v-model="unitPrice" />
              <label for="quantity">Quantity:</label>
              <input id="quantity" v-model="quantity" />
              <v-btn class="add-item" @click="addItem">Add Item</v-btn>
            </div>
  
            <div class="form-item">
              <label for="totalPrice">Total Price:</label>
              <input id="totalPrice" v-model="totalPrice" />
            </div>

            <div class="form-item">
              <label for="trackingNumber">Tracking Number:</label>
              <input id="trackingNumber" v-model="trackingNumber" />
            </div>

            <div class="form-item">
              <label for="remark">Remark:</label>
              <input id="remark" v-model="remark" />
            </div>
          </div>

          <div class="actions">
            <v-btn class="el-button" type="primary" @click="save">Save</v-btn>
            <v-btn class="el-button" type="danger" @click="cancel">
              Cancel
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "OrderDetails",
    data() {
      return {
        currentTime: "",
        username: "John Doe",
        avatarUrl: "https://images.api.hahow.in/images/5ef5c9c316a75b4c31084fa8",
        orderId: "",
        customerName: "",
        customerAddress: "",
        customerEmail: "",
        customerContact: "",
        orderPlatform: "Lazada",
        orderStatus: "Pending",
        selectedProduct: "",
        unitPrice: "",
        quantity: "",
        trackingNumber: "",
        totalPrice: "",
        remark: "",
        products: [
          { id: 1, name: "Product 1" },
          { id: 2, name: "Product 2" },
          { id: 3, name: "Product 3" },
          // Add more products if needed
        ],
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
        // 处理保存逻辑
      },
      cancel() {
        // 处理取消逻辑
      },
      addItem() {
        // 处理添加商品逻辑
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
    justify-content: space-between;
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