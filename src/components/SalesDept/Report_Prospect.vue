<template>
    <div class="container">

        <div class="container2">
            <div class="title">Prospect Report</div>
            <!-- <h2>Prospect Report</h2> -->
        
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
    border: 1px solid #9d9d9d;
}
table th, table td {
    padding: 8px;
    text-align: center;
    border: 2px solid #6b6b6b;
  }
  th {
    background-color: #4C4D6C;
    font-weight: bold;
    color: #ffffff;
  }

  tr:nth-child(even) {
    background-color: #e4e4f3;
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