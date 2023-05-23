<template>
    <div>
        
      <div class="text-left">
        <div class="title">Prospect Details</div>
        <div class="form">
            <div class="form-item">
                <label for="name">Name:</label>
                <input id="name" v-model="customerName" required>
            </div>

            <div class="form-item">
                <label for="address">Address:</label>
                <input id="address" v-model="customerAddress" required>
            </div>

            <div class="form-item">
                <label for="email">Email:</label>
                <input id="email" v-model="customerEmail" required>
            </div>

            <div class="form-item">
                <label for="contact">Contact:</label>
                <input id="contact" v-model="customerContact" required>
            </div>

            <div class="text-right">
                <v-btn class="button" type="submit" @click="submitForm">Submit</v-btn>
                <v-btn class="button" type="button" @click="cancelForm">Cancel</v-btn>
            </div>
        </div>
      </div>
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        customer: {
          name: '',
          address: '',
          email: '',
          contact: ''
        }
      };
    },
    methods: {
      submitForm() {
        // Perform any desired logic with the form data
        console.log(this.customer);
        // Reset the form
        this.customer = {
          name: '',
          address: '',
          email: '',
          contact: ''
        };
      },
      cancelForm(){
        
      }
    }
  };
  </script>
  
  <style>
 
  .form-item input{
    flex: 1;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .button {
    margin-left: 10px;
    background-color: #4C4D6C; 
    color: #ffffff; 
  }
  .text-left{
    margin: 40px;
  }
  .form{
    margin-top: 40px;
  }
  .title{
    font-size:x-large;
  }
 
  </style>
  



