<template>
    <div class="container">
        <div class="container2">
          <h2>Customer Report</h2>
          <div class="text-right">
            <div class="search-wrapper">
            <v-text-field
               class="searchbar"
                :loading="loading"
                density="comfortable"
                variant="solo"
                label="Search keyword"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                v-model="searchKeyword"
                @click:append-inner="onClick"
            ></v-text-field>
          </div>
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
                  <td>{{ customer.customer_name }}</td>
                  <td>{{ customer.customer_email }}</td>
                  <td>{{ customer.customer_address }}</td>
                  <td>{{ customer.customer_contact }}</td>
                  <td>{{ customer.history }}</td>
              </tr>
            </tbody>
        </table>
        <v-btn class="el-button" @click="downloadReport">Download Report</v-btn>
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
    searchKeyword:'',
  }),
  mounted() {
    this.fetchCustomers();
  },
  methods: {
    fetchCustomers() {
      axios
        .get('/api/customer') // Adjust the route path if necessary
        .then((response) => {
          console.log(response.data);
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
        if (this.searchKeyword) {
          this.customerList = this.customerList;
      }
      }, 1000);
    },
    resetFilter() {
      this.searchKeyword = ''; // Clear the search keyword
      this.fetchCustomers(); // Fetch customers again to get the original list
    },
    downloadReport() {
      const doc = new jsPDF();
      doc.autoTable({ html: '#customer-table' });
      doc.save('NeksomCustomer_Report.pdf');
    },
  },
  computed: {
  customerList() {
    if (!this.searchKeyword) {
      return this.customerList;
    } else {
      const keyword = this.searchKeyword.toLowerCase();
      return this.customerList.filter((customer) => {
        return (
          (customer.customer_name && customer.customer_name.toLowerCase().includes(keyword)) ||
          (customer.customer_email && customer.customer_email.toLowerCase().includes(keyword)) ||
          (customer.customer_address && customer.customer_address.toLowerCase().includes(keyword)) ||
          (customer.customer_contact && customer.customer_contact.toLowerCase().includes(keyword))
        );
      });
    }
  },
},

};
</script>

<style>
.container{
    padding: 20px;

}
.container2{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap; /* Allow elements to wrap on smaller screens */
}
.text-right{
  display: flex;
  flex-wrap: wrap; /* Allow elements to wrap on smaller screens */
  justify-content: flex-end;
}
.search-wrapper {
  margin-right: 10px; /* Add some spacing between search field and button */
  flex-grow: 1; /* Allow the search field to expand and fill available space */
  max-width: 400px; /* Limit the maximum width of the search field */
}
h2{
    margin-bottom: 10px;
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
  .searchbar{
    width: 100%;
}
.el-button {
  margin-top: 20px;
  background-color: #4C4D6C;
  color: #ffffff;
}


</style>