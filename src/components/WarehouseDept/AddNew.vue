<template>
  <div class="container">
    <h2>Add New Product</h2>
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
        <label class="img" for="image">Upload Image:</label>
        <!-- <input type="file" id="image" accept="image/*" @change="handleImageUpload" name="image"> -->
        <input type="file" id="image" @change="selectFile" accept="image/*">

      </div>

      <div class="form-group">
        <label for="productName">Product Name:</label>
        <span class="required-field">*</span>
        <input type="text" id="productName" v-model="form.productName" required>
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="form.description"></textarea>
      </div>

      <div class="form-group">
        <label for="price">Price:</label>
        <span class="required-field">*</span>
        <input type="text" id="price" v-model="form.price" required>
      </div>

      <div class="form-group">
        <label for="currentstock">Current stock:</label>
        <span class="required-field">*</span>
        <input type="number" id="currentstock" v-model="form.currentstock" required>
      </div>

      <div class="form-group">
        <label for="minstock">Minimum stock level:</label>
        <span class="required-field">*</span>
        <input type="number" id="minstock" v-model="form.minstock" required>
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
  name: 'AddNewInventoryItem',
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
      formData.append('Inv_MinStockLevel', this.form.minstock);
      formData.append('Inv_StockLevel', this.form.currentstock);      
        formData.append('Inv_CostPrice', this.form.price);
        formData.append('InvImg', this.form.image);
//  formData = {
      //   Inv_Name: this.form.productName,
      //   Inv_Catg: this.form.category,
      //   Inv_MinStockLevel: this.form.minstock,
      //   Inv_StockLevel: this.form.currentstock,
      //   Inv_CostPrice: this.form.price,
      // };
      // Include optional fields only if they have a value
      if (this.form.sku) {
        formData.Inv_SKU_Num = this.form.sku;
      }
      if (this.form.barcode) {
        formData.Inv_BarcodeNum = this.form.barcode;
      }
      if (this.form.image) {
        console.log(this.form.image);
        formData.InvImg = this.form.image;
  

        //formData.append('image', imageBlob, 'image.jpg');
      }
      if (this.form.description) {
        formData.Inv_Desc = this.form.description;
      }
      console.log(formData);
      axios.post('http://localhost:5000/api/inventoryitem', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
        .then(res => {
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
        barcode: '',
        image: null,
        productName: '',
        description: '',
        price: null,
        currentstock: null,
        minstock: null
      };
    },
    cancelForm() {
      this.resetForm();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      // Perform image upload logic here
      const reader = new FileReader();

      // Set up the FileReader onload event handler
      reader.onload = () => {
        // Access the image data from the FileReader result
        const imageData = reader.result;

        // Store the image data in the form data object
        this.form.image = imageData;

        // You can also display a preview of the uploaded image if needed
        // For example, if you have an image preview element with id "imagePreview":
        // const imagePreviewElement = document.getElementById("imagePreview");
        // imagePreviewElement.src = imageData;
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
      console.log(file);
    },
    selectFile(event){
      console.log(event.target.files)
      this.form.image= event.target.files[0];
    }
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

h2 {
  margin-bottom: 30px;
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

input[type="text"],
input[type="number"],
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
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button {
  background-color: #dc3545;
}

button:hover {
  background-color: #0056b3;
}

.cancel-button:hover {
  background-color: #c82333;
}
</style>
