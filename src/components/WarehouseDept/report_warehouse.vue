<template>
    <div class="container">
        <div class="wrapper">
            <h2>Report</h2>

            <div>
                <v-select
                label="Select"
                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                variant="solo"
                ></v-select>
            </div>

            <div>
                <v-select
                label="Select"
                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                variant="solo"
                ></v-select>
            </div>

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

        <table class="table table-bordered">
            <thead>
            <tr>
                <th>SKU Number</th>
                <th>Product</th>
                <th>Inventory</th>
                <th>In</th>
                <th>Out</th>
                <th>Total</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="report in reportList" :key="report.id">
                  <td>{{ report.sku }}</td>
                  <td>{{ report.product }}</td>
                  <td>{{ report.inventory }}</td>
                  <td>{{ report.in }}</td>
                  <td>{{ report.out }}</td>
                  <td>{{ report.total }}</td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'report',
        components: {
            
        },
        props: ['report'],
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