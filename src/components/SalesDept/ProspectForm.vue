<template>
    <div>
        
      <div class="text-left">
        <div class="title">Prospect Details</div>
        <div class="form">
            <div class="form-item">
                <label for="name">Name:</label>
                <input id="name" v-model="prospect.name" required>
            </div>

            <div class="form-item">
                <label for="address">Address:</label>
                <input id="address" v-model="prospect.address" required>
            </div>

            <div class="form-item">
                <label for="email">Email:</label>
                <input id="email" v-model="prospect.email" required>
            </div>

            <div class="form-item">
                <label for="contact">Contact:</label>
                <input id="contact" v-model="prospect.contact" required>
            </div>

            <div class="text-right">
                <v-btn class="button" type="submit" @click="submitForm" :disabled="isSaveDisabled">Submit</v-btn>
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
        const prospectData = {
          prospect_name:this.prospect.name,
          prospect_address: this.prospect.address,
          prospect_email: this.prospect.email,
          prospect_contact: this.prospect.contact,
        };
        console.log(this.prospect);
        axios.post('http://localhost:5000/api/prospect', prospectData)
        .then(
          res => {
            console.log(res)
          }
        ).catch(
          err => {
            console.log(err)
          }
        )
        this.resetForm();
        
      },
      resetForm(){
        // Reset the form
        this.prospect = {
          name: '',
          address: '',
          email: '',
          contact: ''
        };
      },
      cancelForm(){
        this.resetForm();
      }
    },
    computed: {
    isSaveDisabled() {
      return (
        !this.prospect.address ||
        !this.prospect.email ||
        !this.prospect.name ||
        !this.prospect.contact 
      );
    },
  },
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
  



