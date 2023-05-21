<template>
    <header>Add New Product</header>
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <label for="sku">SKU Number:</label>
            <input type="text" id="sku" v-model="form.sku" required>
        </div>
      
        <div class="form-group">
      <label for="barcode">Barcode Number:</label>
      <input type="text" id="barcode" v-model="form.barcode" required>
    </div>
    
    <div class="form-group">
      <label for="image">Upload Image:</label>
      <input type="file" id="image" accept="image/*" @change="handleImageUpload" required>
    </div>
    
    <div class="form-group">
      <label for="productName">Product Name:</label>
      <input type="text" id="productName" v-model="form.productName" required>
    </div>
    
    <div class="form-group">
      <label for="description">Description:</label>
      <textarea id="description" v-model="form.description" required></textarea>
    </div>
    
    <div class="form-group">
      <label for="price">Price:</label>
      <input type="number" id="price" v-model="form.price" required>
    </div>
    
    <div class="button-group">
      <button type="submit" class="save-button">Save</button>
      <button type="button" class="cancel-button" @click="cancelForm">Cancel</button>
    </div>
    </form>
  </template>
  
  <style scoped>
.form-group {
  margin-bottom: 20px;
}

.label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
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


  <script>
  export default {
    data() {
      return {
        form: {
          sku: '',
          barcode: '',
          image: null,
          productName: '',
          description: '',
          price: null,
        },
      };
    },
    methods: {
      submitForm() {
        // Handle form submission here
        console.log(this.form);
      },
      handleImageUpload(event) {
        const file = event.target.files[0];
        // Perform image upload logic here
        console.log(file);
      },
      
    },
  };
  </script>