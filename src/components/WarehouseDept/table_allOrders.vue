<template>
    <div class="container">
        

        <div class="container2">
            <div class="title">Order List</div>
            
            <div class="container3">
                <div>
                    <v-menu class="categoty-menu">
                        <template v-slot:activator="{ props }">
                            <v-btn 
                            class="categoty-button"
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
                    v-model="searchKeyword"
                    @click:append-inner="onClick"
                ></v-text-field> 
                </div>
            </div>
            

        </div>
        
        <div class="table-wrapper">
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
            items: [
                { title: 'Pending', routePath: '/toship'},
                { title: 'Shipped' ,routePath: '/shipping' },
                { title: 'Completed' ,routePath: '/completed' },
                { title: 'Cancelled' ,routePath: '/cancel' },
            ],
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
    padding: 30px;
}
.container2{
    
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    flex-wrap: wrap; 
}
.container3{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    margin-bottom: 20px;
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
    text-align:center;
    border: 2px solid #6b6b6b;
  }

.searchbar{
    width: 300px; /* Adjust the width as desired */
    margin-bottom: 20px;
}
.table-wrapper {
  overflow-y: auto;
}
.categoty-button{
    width: 300px;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    margin-right: 10px;
}
</style>