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
            
            <div class="search-wrapper">
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
            
            
            
        </div>
        
        <table class="table table-bordered" id="customer-table">
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
              <tr v-for="customer in customerList" :key="customer.name">
                  <td>{{ customer.name }}</td>
                  <td>{{ customer.email }}</td>
                  <td>{{ customer.address }}</td>
                  <td>{{ customer.contact }}</td>
                  <td>{{ customer.history }}</td>
              </tr>
            </tbody>
        </table>
        <button @click="downloadReport">Download Report</button>
    </div>
</template>

<script>
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  name: 'customerReport',
  data: () => ({
    selectedPeriod: '',
    customerList: [],
    loaded: false,
    loading: false,
  }),
  mounted() {
    this.fetchCustomers();
  },
  methods: {
    fetchCustomers() {
      axios
        .get('/api/customer') // Adjust the route path if necessary
        .then((response) => {
          this.customerList = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onClick() {
  this.loading = true;
  setTimeout(() => {
    this.loading = false;
    this.loaded = true;
    this.downloadReport(); // Call the method to generate and download the report
  }, 2000);
},
    downloadReport() {
  const doc = new jsPDF();
  doc.autoTable({ html: '#customer-table' });
  doc.save('report.pdf');
}
,
  },
};
</script>

<style>
.container{
    padding-left: 50px;
    padding-right: 50px;

}
h2{
    margin-bottom: 10px;
}
.select{
    border: 2px solid #6b6b6b;
    border-radius: 5px;
    width: 100px;
   
    margin-bottom: 20px;
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
.search{
    margin-left: 400px;
}
.searchbar{
    width: 200px;
    height: 20px;
    margin-left: 200px;
}
.search-wrapper {
    display: inline-block;
    margin-left: 700px;
}
</style>