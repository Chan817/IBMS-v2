<template>
    <div class="container">
        
        <div class="container2">
        <h2>Neksom Product</h2>
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
                @click:append-inner="onClick"
            ></v-text-field>
        </div>
             
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
                  <td>
                    <img :src="list.image" alt="Product Image" width="50" height="50" />
                  </td>
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
        name: 'neksom',
        components: {
            
        },
        props: ['neksom'],
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
    margin-top: 20px;
    width: 100px;
}

</style>