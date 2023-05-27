<template>
    <div class="container">
        <div class="container2">
            <h2>Shipping Orders</h2>
            <div >
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
                <th>Order Date</th>
                <th>Shipped Date</th>
                <th>Tracking Number</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="Shipping in ShippingList" :key="Shipping.id">
                  <td>{{ Shipping.id }}</td>
                  <td>{{ Shipping.type }}</td>
                  <td>{{ Shipping.customer }}</td>
                  <td>{{ Shipping.date }}</td>
                  <td>{{ Shipping.shipdate }}</td>
                  <td>{{ Shipping.tracking }}</td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'ShippingOrder',
        components: {
            
        },
        props: ['ShippingOrder'],
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
.container2{
    display: flex;
    justify-content: space-between;
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
    margin-top: 20px;
    width: 100px;
}

</style>