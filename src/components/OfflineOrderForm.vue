<template>
  <div id="app">
    <div class="content">
      
      <div class="order-details">
        <div class="title">Order Details</div>

        <div class="form">

          <div class="form-item">
            <label for="order-id">Order ID:</label>
            <input id="order-id" v-model="post.orderId" required/>
            
          </div>

          <div class="form-item">
            <label for="customer-name">Customer Name:</label>
            <input id="customer-name" v-model="post.customerName" required/>
          </div>

          <div class="form-item">
            <label for="customer-address">Customer Address:</label>
            <input id="customer-address" v-model="post.customerAddress" required/>
          </div>

          <div class="form-item">
            <label for="customer-email">Customer Email:</label>
            <input id="customer-email" v-model="post.customerEmail" required/>
          </div>

          <div class="form-item">
            <label for="customerContact">Customer Contact:</label>
            <input id="customerContact" v-model="post.customerContact" required/>
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
                    <option
                      v-for="product in products"
                      :key="product.id"
                      :value="product.name"
                    >
                      {{ product.name }}
                    </option>
                  </select>
                  <label  class="space-left" for="unit-price">Unit Price:</label>
                  <input id="unit-price" v-model="unitPrice" />
                  <label  class="space-left" for="quantity">Quantity:</label>
                  <input id="quantity" v-model="quantity" />
                  <v-btn class="add-item" @click="addItem">Add Item</v-btn>
                </div>

          <div class="form-item">
            <label for="total-price">Total Price:</label>
            <input id="total-price" v-model="post.totalPrice" required/>
          </div>

          <div class="form-item">
            <label for="remark">Remark:</label>
            <input id="remark" v-model="post.remark" required/>
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
import API from '../api';

export default {
  data() {
    return {
      rules: [(value) => !!value || "This field is required!"],
      post:{
        orderId: "",
        customerName: "",
        customerAddress: "",
        customerEmail: "",
        customerContact: "",
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
      }
      };
    },
    
    methods: {
      async save() {
        const orderData = new FormData();
      orderData.append('order_ID', this.post.orderId);
      orderData.append('customer_name', this.post.customerName);
      orderData.append('customer_address', this.post.customerAddress);
      orderData.append('customer_email', this.post.customerEmail);
      orderData.append('customer_contact', this.post.customerContact);
      orderData.append('business_type', this.post.businessType);
      orderData.append('order_status', this.post.orderStatus);
      orderData.append('order_remark', this.post.remark);

      // const orderData = {
      //   order_ID: this.post.orderId,
      //   customer_name: this.post.customerName,
      //   customer_address: this.post.customerAddress,
      //   customer_email: this.post.customerEmail,
      //   customer_contact: this.post.customerContact,
      //   business_type: this.post.businessType,
      //   order_status: this.post.orderStatus,
      //   order_remark: this.post.remark,
      // }
      if(this.$refs.form.validate()){
        const response = await API.addOrder(orderData);
        this.$router.push({name: "offline", params:{message: response.message}});
      }
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
  .space-left{
    margin-left: 50px;
  }
  </style>
  