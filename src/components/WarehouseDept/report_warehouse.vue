<template>
    <div class="container">
        <div class="container2">

            <div class="title">Inventory Report</div>
            <!-- <h2>Neksom Product</h2> -->

            <div class="container3">
                <div>
                    <v-menu class="categoty-menu">
                        <template v-slot:activator="{ props }">
                            <v-btn class="categoty-button" v-bind="props">
                                Categories
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="(item, index) in items" :key="index" :value="index" :to="item.routePath">
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>

                <div class="search-bar">
                    <v-text-field :loading="loading" density="compact" variant="solo" label="Search keyword"
                        append-inner-icon="mdi-magnify" single-line hide-details v-model="searchKeyword"
                        @click:append-inner="onClick"></v-text-field>
                </div>
            </div>

        </div>

        <div class="table-wrapper">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>SKU Number</th>
                        <th>Category</th>
                        <th>Product Name</th>
                        <th>Stock Level</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in inventoryItems" :key="item._id">
                        <td>{{ item.Inv_SKU_Num }}</td>
                        <td>{{ item.Inv_Catg }}</td>
                        <td>{{ item.Inv_Name }}</td>
                        <td>{{ item.Inv_StockLevel }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <v-btn class="el-button" @click="downloadReport">Download Report</v-btn>
    </div>
</template>
    
<script>
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
    name: 'neksom',
    data() {
        return {
            inventoryItems: [],
            loaded: false,
            loading: false,
            searchKeyword: '',
            items: [
                { title: 'All', routePath: '/reportWarehouse'},
                { title: 'Neksom Product', routePath: '/toship'},
                { title: 'Raw Material' , routePath: '/shipping' },
                
            ],
        };
    },
    created() {
        this.fetchInventoryItems();
    },
    methods: {
        onClick() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.loaded = true;
                if (this.searchKeyword) {
                    this.inventoryItems = this.inventoryItems;
                }
            }, 1000);
        },
        fetchInventoryItems() {
            axios
                .get('/api/inventoryitem/') // Replace with your actual API endpoint
                .then((response) => {
                    this.inventoryItems = response.data;
                })
                .catch((error) => {
                    console.error('Error fetching inventory items:', error);
                });
        },
        downloadReport() {
            const doc = new jsPDF();

            let data;
            let title;

            data = this.inventoryItems;
            title = 'All data report';

            const tableData = data.map(item => [item.Inv_SKU_Num, item.Inv_Catg, item.Inv_Name, item.Inv_StockLevel]);

            doc.autoTable({
                head: [['SKU Number', 'Product Name', 'Total']],
                body: tableData,
                theme: 'grid',
                startY: 20
            });

            doc.text(title, 14, 10);

            doc.save('Inventory_Report.pdf');
        },
    },
    computed: {
        inventoryItems() {
            if (!this.searchKeyword) {
                return this.inventoryItems;
            } else {
                const keyword = this.searchKeyword.toLowerCase();
                return this.inventoryItems.filter((item) => {
                    return (
                        (item.Inv_SKU_Num && item.Inv_SKU_Num.toLowerCase().includes(keyword)) ||
                        (item.Inv_Catg && item.Inv_Catg.toLowerCase().includes(keyword)) ||
                        (item.Inv_Name && item.Inv_Name.toLowerCase().includes(keyword)) ||
                        (item.Inv_StockLevel && item.Inv_StockLevel.toString().toLowerCase().includes(keyword))

                    );
                });
            }
        }
    }
};
</script>
    
<style scoped>
.container {
    padding: 30px;
}

.container2 {
    flex: 1;
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    flex-wrap: wrap;
    /* Allow elements to wrap on smaller screens */
}
.container3{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    margin-bottom: 20px;
}
.title {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
    
}

table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #6b6b6b;
}

table th,
table td {
    padding: 8px;
    text-align: center;
    border: 1px solid #6b6b6b;
}

th {
    background-color: #4C4D6C;
    font-weight: bold;
    color: #ffffff;
}

tr:nth-child(even) {
    background-color: #e4e4f3;
}

.search-bar {
    width: 300px;
    
    margin-bottom: 20px;
}

.table-wrapper {
    overflow-y: auto;
}

.categoty-button{
    width: 200px;
    margin-right: 10px;
    background-color: #4C4D6C;
    color: #ffffff;
}
.el-button {
    margin-top: 20px;
    background-color: #4C4D6C;
    color: #ffffff;
}
</style>
    