<template>
    <div class="container">

        <div class="container2">
            <h2>To Ship</h2>
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
                <th>Customer Address</th>
                <th>Order Date</th>
                <th>Product List</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="toship in cancelList" :key="toship.id">
                  <td>{{ toship.id }}</td>
                  <td>{{ toship.type }}</td>
                  <td>{{ toship.customer }}</td>
                  <td>{{ toship.address }}</td>
                  <td>{{ toship.date }}</td>
                  <td>{{ toship.productlist }}</td>
                  <td>
                    <div class="row">
                        <v-btn @click=''>Shipped</v-btn>
                        
                    </div>
                  </td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'ToShipOrder',
        components: {
            
        },
        props: ['ToShipOrder'],
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
.searchbar{
    margin-top: 20px;
    width: 100px;
}
</style>