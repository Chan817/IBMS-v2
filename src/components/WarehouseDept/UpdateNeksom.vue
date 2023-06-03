<template>
    <div class="container">
      <div class="title">Edit This Product</div>
      
      <form @submit.prevent="updateForm" enctype="multipart/form-data">
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
          <v-btn type="submit" class="save-button" :disabled="isSaveDisabled" @click="updateForm">Update</v-btn>
          <v-btn type="button" class="cancel-button" @click="cancelForm">Cancel</v-btn>
        </div>
      </form>

      <!-- Update confirmation dialog -->
        <v-dialog v-model="showUpdateConfirmation" max-width="500px">
        <v-card>
            <v-card-title>Update Item</v-card-title>
            <v-card-text>
            Are you sure you want to update this item?
            </v-card-text>
            <v-card-actions>
            <v-btn color="primary" text @click="confirmUpdateItem">Update</v-btn>
            <v-btn text @click="showUpdateConfirmation = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EditInventoryItem',
    data() {

      return {
        itemId: null,
        form: {
          category: '',
          sku: '',
          barcode: '',
          image: null,
          productName: '',
          description: '',
          price: null,
          currentstock: null,
          minstock: null,
          showUpdateConfirmation: false,
        }
      };
    },
    created() {
        const itemId = this.$route.params.id;
        this.itemId = itemId; // Assign itemId to component's data property
        this.fetchItem(itemId);
    },
    methods: {
        fetchItem(itemId) {
            axios
                .get(`/api/inventoryitem/${itemId}`)
                .then((response) => {
                const item = response.data;
                this.form.category = item.Inv_Catg;
                this.form.sku = item.Inv_SKU_Num;
                this.form.barcode = item.Inv_BarcodeNum;
                this.form.image = item.InvImg;
                this.form.productName = item.Inv_Name;
                this.form.description = item.Inv_Desc;
                this.form.price = item.Inv_CostPrice;
                this.form.currentstock = item.Inv_StockLevel;
                this.form.minstock = item.Inv_MinStockLevel;
                })
                .catch((error) => {
                console.error('Error fetching item:', error);
                });
        }, 
        updateForm() {
      // Show the update confirmation dialog
        this.showUpdateConfirmation = true;
        }, 
        confirmUpdateItem() {
        // Handle the confirmed update
        const formData = new FormData();
        // Populate form data with the item details

      axios
        .patch(`/api/inventoryitem/${this.itemId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('Item updated:', res.data);
          this.resetForm();
          this.$router.go(-1); // Redirect to the previous page
        })
        .catch((err) => {
          console.error('Error updating item:', err);
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
        this.$router.go(-1);
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
      selectFile(event) {
        console.log(event.target.files)
        this.form.image = event.target.files[0];
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
  
  .form-group input,
  .form-group select,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .form-group label {
    font-weight: bold;
  }
  .button-group {
    display: flex;
    justify-content: flex-end;
  }
  
  button {
    padding: 10px 20px;
    margin-left: 10px;
    background-color: #4C4D6C;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .cancel-button {
    background-color: #a60c1b;
  }
  
  </style>
  