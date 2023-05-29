<template>
    <div class="container">
        <div class="container2">
        <h2>Prospect Report</h2>
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

        <table class="table table-bordered" id="prospect-table">
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
        <v-btn class="el-button" @click="downloadReport">Download Report</v-btn>
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
            searchKeyword: '',
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
            if (this.searchKeyword) {
                this.prospectList = this.prospectList;
            }
            }, 2000)
            },
            downloadReport() {
                if (this.prospectList.length > 0) {
                const doc = new jsPDF();
                doc.autoTable({ html: '#prospect-table' });
                doc.save('NeksomProspect_Report.pdf');
                }
            },
        },
        computed: {
            prospectList(){
                if (!this.searchKeyword) {
                    return this.prospectList;
                } else {
                const keyword = this.searchKeyword.toLowerCase();
                    return this.prospectList.filter((prospect) => {
                        return (
                        prospect.prospect_name.toLowerCase().includes(keyword) ||
                        prospect.prospect_email.toLowerCase().includes(keyword) ||
                        prospect.prospect_address.toLowerCase().includes(keyword) ||
                        prospect.prospect_contact.toLowerCase().includes(keyword)
                        );
                    });
                }
            },
        },
     }
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
    width: 100%;
}
.el-button {
  margin-top: 20px;
  background-color: #4C4D6C;
  color: #ffffff;
}

</style>