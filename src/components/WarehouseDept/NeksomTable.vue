<template>
    <div class="container">
      <div class="container2">
        
        <div class="title">Neksom Product</div>
        <!-- <h2>Neksom Product</h2> -->
        
        <div class="search-bar">
            <v-text-field
                :loading="loading"
                density="compact"
                variant="solo"
                label="Search keyword"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                v-model="searchKeyword"
                @click:append-inner="onClick"
            ></v-text-field>
          </div>
      </div>
      
      <div class="table-wrapper">
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
        searchKeyword:'',
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
          if (this.searchKeyword) {
            this.inventoryItems = this.inventoryItems;
          }
        }, 1000);
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
          .get('/api/inventoryitem/product') // Replace with your actual API endpoint
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
    computed: {
      inventoryItems() {
        if (!this.searchKeyword) {
          return this.inventoryItems;
        } else {
          const keyword = this.searchKeyword.toLowerCase();
          return this.inventoryItems.filter((item) => {
            return (
              (item.Inv_SKU_Num && item.Inv_SKU_Num.toLowerCase().includes(keyword)) ||
              (item.Inv_BarcodeNum && item.Inv_BarcodeNum.toString().toLowerCase().includes(keyword)) ||
              (item.Inv_Name && item.Inv_Name.toLowerCase().includes(keyword)) ||
              (item.Inv_StockLevel && item.Inv_StockLevel.toString().toLowerCase().includes(keyword)) ||
              (item.Inv_CostPrice && item.Inv_CostPrice.toString().toLowerCase().includes(keyword)) ||
              (item.Inv_Desc && item.Inv_Desc.toLowerCase().includes(keyword))
            );
          });
        }
      }
    }
  };
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
    flex-wrap: wrap; /* Allow elements to wrap on smaller screens */
}
  
.title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
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
  .search-bar {
  width: 300px; /* Adjust the width as desired */
  margin-bottom: 20px;
}

.table-wrapper {
  overflow-y: auto;
}
  </style>
  