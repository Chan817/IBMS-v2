<template>
    <div class="container">

        <div class="container2">
          <div class="title">Low in Stock - Raw Material</div>

          <div class="search-bar">

            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn
                    color="primary"
                    v-bind="props"
                    >
                    Categories
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    :value="index"
                    :to="item.routePath"
                    >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

          </div>
        </div>

        <div class="table-wrapper">
          <table class="table table-bordered" id="customer-table">
            <thead>
            <tr>
                <th>Product</th>
                <th>Current Quantity</th>
                <th>Minimum Quantity Set</th>
                <th>Status</th>
                
            </tr>
            </thead>
            <tbody>
              <tr v-for="low in lowlist" :key="low.product">
                  <td>{{ low.Inv_Name }}</td>
                  <td>{{ low.Inv_StockLevel }}</td>
                  <td>{{ low.Inv_MinStockLevel }}</td>
                  <td>{{ low.status }}</td>
              </tr>
            </tbody>
        </table>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'lowinstock',
  data: () => ({
    selectedPeriod: '',
    customerList: [],
    loaded: false,
    loading: false,
    items: [
        { title: 'Neksom Product', routePath: '/low_neksom'},
        { title: 'Raw Material' , routePath: '/low_raw' },
      ],
      lowlist: [],
  }),
  mounted() {
    this.fetchLow();
  },
  methods: {
    fetchLow() {
      axios
        .get('/api/notification/raw/') // Adjust the route path if necessary
        .then((response) => {
          console.log(response.data);
          this.lowlist = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onClick() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
        
      }, 1000);
    },
  },
  

};
</script>

<style scoped>
.container{
    padding: 30px;

}
.container2{
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
table th, table td {
    padding: 8px;
    text-align: left;
    border: 2px solid #6b6b6b;
  }
 
.el-button {
  margin-top: 20px;
  background-color: #4C4D6C;
  color: #ffffff;
}
.search-bar {
  width: 300px; /* Adjust the width as desired */
  margin-bottom: 20px;
}

.table-wrapper {
  overflow-y: auto;
}

</style>