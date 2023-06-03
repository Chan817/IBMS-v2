<template>
    <div class="inventory-report">
      <h1>Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>SKU Number</th>
            <th>Barcode Number</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Current Quantity</th>
            <th>Cost Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inventoryData" :key="item.sku">
            <td>{{ item.Inv_SKU_Num }}</td>
            <td>{{ item.Inv_BarcodeNum }}</td>
            <td><img :src="item.InvImg" :alt="item.Inv_Name" /></td>
            <td>{{ item.Inv_Name }}</td>
            <td>{{ item.Inv_StockLevel }}</td>
            <td>{{ item.Inv_CostPrice }}</td>
            <td>{{ getItemStatus(item) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
    import axios from 'axios';

  export default {
    data() {
      return {
        inventoryData: [] // 存储库存数据的数组
      };
    },
    mounted() {
      // 页面加载时获取初始库存数据
      this.loadData();
    },
    methods: {
      loadData() {
        axios
          .get('/api/inventoryitem/product') // Replace with your actual API endpoint
          .then((response) => {
            this.inventoryItems = response.data;
          })
          .catch((error) => {
            console.error('Error fetching inventory items:', error);
          });
      },
      getItemStatus(item) {
        if (item.Inv_StockLevel > item.Inv_MinStockLevel) {
          return 'In stock';
        } else if (item.Inv_StockLevel > 0) {
          return 'Low in stock';
        } else {
          return 'Out of stock';
        }
      },
    }
  };
  </script>
  
  <style scoped>
  .inventory-report {
    padding: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
  }
  
  table th,
  table td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  img {
    max-width: 100px;
    max-height: 100px;
  }
  </style>