<template>
    <div class="container">
        <h2>Customer Report</h2>

        <div class="container">
            <label class="label" for="period">Period:</label>
            <select class="select" v-model="selectedPeriod" id="period">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="custom">Customize</option>
            </select>
                
            

            <template>
                <div class="data-table-search-filter">
                    <span>{{ searchText }}</span>
                    <input type="search" :value="search" @input="$emit('set-search')" /> 
                </div>
            </template>
        </div>
        
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Customer Address</th>
                <th>Customer Contact</th>
                <th>History</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="customer in customerList" :key="customer.id">
                  <td>{{ customer.name }}</td>
                  <td>{{ customer.email }}</td>
                  <td>{{ customer.address }}</td>
                  <td>{{ customer.contact }}</td>
                  <td>{{ customer.history }}</td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'customerReport',
        components: {
            
        },
        props: ['customerReport'],
        methods: {
            
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
.select{
    border: 2px solid #6b6b6b;
    border-radius: 5px;
    width: 100px;
}
.label{
    margin-right: 10px;
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