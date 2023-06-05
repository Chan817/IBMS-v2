<template>
  <div class="container">
    <div class="title">Restock</div>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div class="form-group">
        <label for="category">Category:</label>
        <span class="required-field">*</span>
        <select class="select" id="category" v-model="form.category" @change="fetchInventoryItems" required>
          <option value="raw">Raw Material</option>
          <option value="neksom">Neksom Product</option>
        </select>
      </div>

      <div class="form-group">
        <label for="productName">Product Name:</label>
        <span class="required-field">*</span>
        <select id="productName" v-model="form.productName" @change="populateProductDetails" required>
          <option value="" disabled>Select an option</option>
          <option v-for="item in inventoryItems" :key="item._id" :value="item.Inv_Name">{{ item.Inv_Name }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="sku">SKU Number:</label>
        <input type="text" id="sku" v-model="form.sku">
      </div>

      <div class="form-group">
        <label for="barcode">Barcode Number:</label>
        <input type="text" id="barcode" v-model="form.barcode">
      </div>

      <div class="form-group">
        <label for="currentstock">Quantity:</label>
        <span class="required-field">*</span>
        <input type="number" id="currentstock" v-model="form.currentstock" required>
      </div>

      <div class="button-group">
        <button type="submit" class="save-button" :disabled="isSaveDisabled">Save</button>
        <button type="button" class="cancel-button" @click="cancelForm">Cancel</button>
      </div>
    </form>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  name: 'KeyIn',
  data() {
    return {
      itemId: null,
      form: {
        category: '',
        sku: '',
        barcode: '',
        productName: '',
        currentstock: null,
      },
      inventoryItems: [], // Array to store the inventory items
    };
  },
  mounted() {
    this.fetchInventoryItems();
  },
  methods: {
    populateProductDetails() {
      // Find the selected inventory item based on the product name
      const selectedItem = this.inventoryItems.find(item => item.Inv_Name === this.form.productName);
      if (selectedItem) {
        // Populate SKU number, barcode, and current quantity based on the selected item
        this.form.sku = selectedItem.Inv_SKU_Num;
        this.form.barcode = selectedItem.Inv_BarcodeNum;
        this.form.currentstock = selectedItem.Inv_StockLevel;
        this.itemId = selectedItem._id;
      } else {
        // Reset the fields if the selected item is not found
        this.form.sku = '';
        this.form.barcode = '';
        this.form.currentstock = null;
        this.itemId = null;
      }
    },
    submitForm() {
      // Handle form submission here
      const formData = new FormData();
      formData.append('Inv_Name', this.form.productName);
      formData.append('Inv_Catg', this.form.category);
      formData.append('Inv_StockLevel', this.form.currentstock);

      // Include optional fields only if they have a value
      if (this.form.sku) {
        formData.append('Inv_SKU_Num', this.form.sku);
      }
      if (this.form.barcode) {
        formData.append('Inv_BarcodeNum', this.form.barcode);
      }

      console.log("request");
      console.log(formData);
      axios.patch(`/api/inventoryitem/${this.itemId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(res => {
          console.log('Item updated:', res.data);
          this.resetForm();
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetForm() {
      this.form = {
        category: '',
        sku: '',
        barcode: '',
        productName: '',
        currentstock: null,
      };
      this.fetchInventoryItems();
    },
    cancelForm() {
      this.resetForm();
    },

    fetchInventoryItems() {
      if (this.form.category === 'raw') {
        // Make an API call to fetch inventory items with category "raw material"
        axios.get('/api/inventoryitem/raw')
          .then(res => {
            this.inventoryItems = res.data;
            this.populateProductDetails();
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.form.category === 'neksom') {
        // Make an API call to fetch inventory items with category "raw material"
        axios.get('/api/inventoryitem/product')
          .then(res => {
            this.inventoryItems = res.data;
            this.populateProductDetails();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        axios.get('/api/inventoryitem')
          .then(res => {
            this.inventoryItems = res.data;
            this.populateProductDetails();

          })
          .catch(err => {
            console.log(err);
          });
      }
    },
  },
  computed: {
    isSaveDisabled() {
      return (
        !this.form.category ||
        !this.form.productName ||
        !this.form.currentstock 
      );
    }
  }
};
</script>
  
<style scoped>
.container {
  padding: 30px;
}

.title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}

.select {
  width: 100%;
  height: 40px;
}

.img {
  margin-right: 15px;
}

.required-field {
  color: red;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-weight: bold;
}

.form-group input,
.form-group select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #4C4D6C;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button {
  background-color: #a60c1b;
}
</style>
  