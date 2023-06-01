<template>
    <div class="container">
      <div class="container2">
        <h2>Neksom Product</h2>
        <div>
          <v-text-field
            class="searchbar"
            :loading="loading"
            density="compact"
            variant="solo"
            label="Search"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            @click:append-inner="onClick"
          ></v-text-field>
        </div>
      </div>
  
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>SKU Number</th>
            <th>Barcode Number</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Stock Level</th>
            <th>Description</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inventoryItems" :key="item._id">
            <td>{{ item.Inv_SKU_Num }}</td>
            <td>{{ item.Inv_BarcodeNum }}</td>
            <td>
              <img :src="item.InvImg" alt="Product Image" width="50" height="50" />
            </td>
            <td>{{ item.Inv_Name }}</td>
            <td>{{ item.Inv_StockLevel }}</td>
            <td>{{ item.Inv_Desc }}</td>
            <td>{{ item.Inv_CostPrice }}</td>
            <td>{{ getItemStatus(item) }}</td>
            <td>
              <div class="row">
                <v-btn icon="mdi-vuetify" variant="plain" @click="editItem(item._id)"></v-btn>
                <v-btn icon="mdi-vuetify" variant="plain" @click="deleteItem(item._id)"></v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'neksom',
    data() {
      return {
        inventoryItems: [],
        loaded: false,
        loading: false,
      };
    },
    created() {
      this.fetchInventoryItems();
    },
    methods: {
      onClick() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.loaded = true;
        }, 2000);
      },
      getItemStatus(item) {
        if (item.Inv_StockLevel >= item.Inv_MinStockLevel) {
          return 'In stock';
        } else if (item.Inv_StockLevel > 0) {
          return 'Low in stock';
        } else {
          return 'Out of stock';
        }
      },
      fetchInventoryItems() {
        axios
          .get('/api/inventoryitem') // Replace with your actual API endpoint
          .then((response) => {
            this.inventoryItems = response.data;
          })
          .catch((error) => {
            console.error('Error fetching inventory items:', error);
          });
      },
      editItem(itemId) {
        // Handle edit item action
      },
      deleteItem(itemId) {
        // Handle delete item action
      },
    },
  };
  </script>
  
  <style>
  .container {
    padding-left: 50px;
    padding-right: 50px;
  }
  
  .container2 {
    display: flex;
    justify-content: space-between;
  }
  
  h2 {
    margin-bottom: 30px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    border: 2px solid #6b6b6b;
  }
  
  table th,
  table td {
    padding: 8px;
    text-align: left;
    border: 2px solid #6b6b6b;
  }
  
  .searchbar {
    margin-top: 20px;
    width: 100px;
  }
  </style>
  