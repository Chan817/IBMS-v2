<template>
    <div class="container">
      
      <div class="container2">
        <div class="title">Inventory</div>
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
          <table class="table table-bordered" id="platform-table">
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
      
    </div>
  </template>
  
  <script>
    import axios from 'axios';

  export default {
    data() {
      return {
        inventoryData: [], 
        searchKeyword:''
      };
    },
    mounted() {
      this.loadData();
    },
    methods: {
      loadData() {
        axios
          .get('/api/inventoryitem/product') // Replace with your actual API endpoint
          .then((response) => {
            this.inventoryData = response.data;
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
      onClick() {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.loaded = true;
            if (this.searchKeyword) {
              this.inventoryData = this.inventoryData;
          }
          }, 1000);
        },
    },
    computed: {
      inventoryData() {
      if (!this.searchKeyword) {
        return this.inventoryData;
      } else {
        const keyword = this.searchKeyword.toLowerCase();
        return this.inventoryData.filter((item) => {
          const itemStatus = this.getItemStatus(item).toLowerCase();
          return (
            (item.Inv_SKU_Num && item.Inv_SKU_Num.toLowerCase().includes(keyword)) ||
            (item.Inv_BarcodeNum && item.Inv_BarcodeNum.toString().toLowerCase().includes(keyword)) ||
            (item.Inv_Name && item.Inv_Name.toLowerCase().includes(keyword)) ||
            (item.Inv_StockLevel && item.Inv_StockLevel.toString().toLowerCase().includes(keyword)) ||
            (item.Inv_CostPrice && item.Inv_CostPrice.toString().toLowerCase().includes(keyword)) ||
            (itemStatus && itemStatus.includes(keyword))
          );
        });
      }
    },
  },
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
  flex-wrap: wrap;
  /* Allow elements to wrap on smaller screens */
}

.title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #9d9d9d;
}

table th,
table td {
  padding: 8px;
  text-align: center;
  border: 2px solid #6b6b6b;
}
th {
    background-color: #4C4D6C;
    font-weight: bold;
    color: #ffffff;
  }

  tr:nth-child(even) {
    background-color: #e4e4f3;
  }
.search-bar {
  width: 300px;
  /* Adjust the width as desired */
  margin-bottom: 20px;
}

.table-wrapper {
  overflow-y: auto;
}
  
  img {
    max-width: 100px;
    max-height: 100px;
  }
  </style>