<template>
    <div class="container">
        <h2>Order List</h2>

        <div class="container">
            
            <div class="wrapper">
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
                <th>Order Id</th>
                <th>Order Type</th>
                <th>Customer Name</th>
                <th>Customer Address</th>
                <th>Product List</th>
                <th>Order Date</th>
                <th>Shipped Date</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="order in orderList" :key="order.id">
                  <td>{{ order.id }}</td>
                  <td>{{ order.type }}</td>
                  <td>{{ order.customer }}</td>
                  <td>{{ order.address }}</td>
                  <td>{{ order.product }}</td>
                  <td>{{ order.orderdate }}</td>
                  <td>{{ order.shippeddate }}</td>
                  <td>{{ order.status }}</td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'Order',
        components: {
            
        },
        props: ['Order'],
        data: () => ({
            loaded: false,
            loading: false,
        }),
        methods: {
            onClick () {
            this.loading = true

            setTimeout(() => {
            this.loading = false
            this.loaded = true
            }, 2000)
      },
        }
     }
</script>

<style>
.container{
    padding-left: 50px;
    padding-right: 50px;
}
h2{
    margin-bottom: 30px;
    margin-top: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    border: 2px solid #6b6b6b;
}
table th, table td {
    padding: 8px;
    text-align:center;
    border: 2px solid #6b6b6b;
  }
.search{
    margin-left: 400px;
}
.searchbar{
    width: 200px;
    height: 20px;
    margin-left: 200px;
}
.wrapper{
    margin-left: 900px;
}
</style>