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
              <tr v-for="prospect in prospectList" :key="prospect._id">
                  <td>{{ prospect.prospect_name }}</td>
                  <td>{{ prospect.prospect_email }}</td>
                  <td>{{ prospect.prospect_address }}</td>
                  <td>{{ prospect.prospect_contact }}</td>
              </tr>
            </tbody>
        </table>
        <v-btn @click="downloadReport">Download Report</v-btn>
    </div>
</template>

<script>
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

    export default {
        name: 'prospectReport',
        data: () => ({
            selectedPeriod: '',
    prospectList: [],
    loaded: false,
    loading: false,
            loaded: false,
            loading: false,
        }),
        mounted() {
            this.fetchProspect();
        },
        methods: {
            fetchProspect() {
            axios
                .get('/api/prospect') // Adjust the route path if necessary
                .then((response) => {
                    console.log(response.data); 
                this.prospectList = response.data;
                })
                .catch((error) => {
                console.error(error);
                });
            },
            onClick () {
            this.loading = true

            setTimeout(() => {
            this.loading = false
            this.loaded = true;
            this.downloadReport();
            }, 2000)
            },
            downloadReport() {
            const doc = new jsPDF();
            doc.autoTable({ html: '#prospect-table' });
            doc.save('NeksomProspect_Report.pdf');
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