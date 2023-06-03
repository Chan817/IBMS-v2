<template>
    <div class="container">
        <div class="title">Restock</div>
      <form @submit.prevent="submitForm" enctype="multipart/form-data">
        <div class="form-group">
          <label for="category">Category:</label>
          <span class="required-field">*</span>
          <select class="select" id="category" v-model="form.category" required>
            <option value="raw">Raw Material</option>
            <option value="neksom">Neksom Product</option>
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
          <label for="productName">Product Name:</label>
          <span class="required-field">*</span>
          <input type="text" id="productName" v-model="form.productName" required>
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
        form: {
          category: '',
          sku: '',
          barcode: '',
          image: null,
          productName: '',
          description: '',
          price: null,
          currentstock: null,
          minstock: null
        }
      };
    },
    methods: {
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
        axios.post('http://localhost:5000/api/inventoryitem', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
          .then(res => {
            console.log("response");
            console.log(res);
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
          productName: '',
          currentstock: null,
        };
      },
      cancelForm() {
        this.resetForm();
      },
      
    },
    computed: {
      isSaveDisabled() {
        return (
          !this.form.productName ||
          !this.form.category ||
          !this.form.minstock ||
          !this.form.currentstock ||
          !this.form.price
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
  