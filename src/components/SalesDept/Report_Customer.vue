<template>
    <div class="container">

        <div class="container2">
          <div class="title">Customer Report</div>
          <!-- <h2>Customer Report</h2> -->

          <div class="search-bar">
            <v-text-field
                :loading="loading"
                density="compact"
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

        <div class="table-wrapper">
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
        </div>
        
        <div>
          <v-btn class="el-button" @click="downloadReport">Download Report</v-btn>
        </div>
        
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

<style scoped>
.container{
    padding: 30px;

}
.container2{
    flex: 1;
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    flex-wrap: wrap; /* Allow elements to wrap on smaller screens */
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
    text-align: left;
    border: 2px solid #6b6b6b;
  }
 
.el-button {
  margin-top: 20px;
  background-color: #4C4D6C;
  color: #ffffff;
}
.search-bar {
  width: 300px; /* Adjust the width as desired */
  margin-bottom: 20px;
}

.table-wrapper {
  overflow-y: auto;
}

</style>