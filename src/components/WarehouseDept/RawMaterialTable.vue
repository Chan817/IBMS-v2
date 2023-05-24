<template>
    <div class="container">
        
        <h2>Raw Material</h2>
        <h3>I will change later</h3>

        <div class="wrapper">
            <v-text-field
                class="searchbar"
                :loading="loading"
                density="compact"
                variant="solo"
                label="Search templates"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                @click:append-inner="onClick"
            ></v-text-field> 
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
              <tr v-for="list in lists" :key="list.sku">
                  <td>{{ list.sku }}</td>
                  <td>{{ list.barcode }}</td>
                  <td>{{ list.image }}</td>
                  <td>{{ list.product }}</td>
                  <td>{{ list.stock }}</td>
                  <td>{{ list.desc }}</td>
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
        name: 'raw',
        components: {
            
        },
        props: ['raw'],
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

.searchbar{
    width: 200px;
    height: 20px;
    margin-bottom: 50px;
    margin-left: 100px;
}
.wrapper{
    margin-left: 900px;
}
</style>