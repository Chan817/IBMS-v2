<template>
    <div class="container">
        
        <h2>Prospect Report</h2>

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
                <th>Prospect Name</th>
                <th>Prospect Email</th>
                <th>Prospect Address</th>
                <th>Prospect Contact</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="prospect in prospectList" :key="prospect.name">
                  <td>{{ prospect.name }}</td>
                  <td>{{ prospect.email }}</td>
                  <td>{{ prospect.address }}</td>
                  <td>{{ prospect.contact }}</td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'prospectReport',
        components: {
            
        },
        props: ['prospectReport'],
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