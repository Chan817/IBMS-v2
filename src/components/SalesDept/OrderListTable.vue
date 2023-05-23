<template>
    <div class="container">
        <h2>Order List</h2>
        
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Order Id</th>
                <th>Category</th>
                <th>Customer Name</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="list in lists" :key="list.id">
                  <td>{{ list.id }}</td>
                  <td>{{ list.category }}</td>
                  <td>{{ list.name }}</td>
                  <td>{{ list.product }}</td>
                  <td>{{ list.quantity }}</td>
                  <td>{{ list.price }}</td>
                  <td>{{ list.status }}</td>
                  <td>
                    <div class="row">
                        <v-btn icon="mdi-vuetify" variant="plain" @click='editOrder(list.id)'></v-btn>
                        <v-btn icon="mdi-vuetify" variant="plain" @click='deleteOrder(list.id)'></v-btn>
                    </div>
                  </td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'list',
        components: {
            
        },
        props: ['list'],
        methods: {
            deleteOrder(orderId) {
               
            },
            editOrder(data) {
                
            }
        }
     }
</script>

<style>
.container{
    padding: 20px;
}
h2{
    margin-bottom: 30px;
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
</style>