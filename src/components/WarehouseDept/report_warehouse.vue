<template>
    <div class="container">
        <section class="section">
            <div class="container2">
            <h2>Report</h2>
                <v-select
                class="selectbar"
                label="Select"
                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                variant="solo-filled"
                density="compact"
                ></v-select>

                <v-select
                class="selectbar"
                label="Select"
                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                variant="solo-filled"
                density="compact"
                ></v-select>
            
            <v-text-field 
                :loading="loading"
                density="compact"
                variant="solo"
                label="Search"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                @click:append-inner="onClick"
                class="filterbar"
            ></v-text-field>
        </div>
        </section>
        
        <section class="section">
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
        </section>
        
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
    margin-right: 200px;
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
.container2{
    display: flex;
}
.section{
    margin-top: 20px;
}
.selectbar{
    width: 100px;
    margin-right: 40px;
    height: 0px;
    margin-top: 10px;
}
.filterbar{
    width: 200px;
    height: 50px;
    margin-top: 10px;
}
</style>