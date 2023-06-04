<template>
    <div>
        
      <div class="container">
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

            <div class="button-grp">
                <v-btn class="button" type="submit" @click="submitForm" :disabled="isSaveDisabled">Submit</v-btn>
                <v-btn class="cancel-button" type="button" @click="cancelForm">Cancel</v-btn>
            </div>
        </div>
      </div>
      
    </div>
  </template>
  
  <script>
  import axios from 'axios'

  export default {
    name: 'ProspectForm',
    data() {
      return {
        prospect: {
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
  
  <style scoped>
 
 .container {
  padding: 30px;
} 
.form-item {
  margin-bottom: 20px;
}

.form-item label {
  font-weight: bold;
} 
.form-item input{
    width: 100%;
    flex: 1;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .button-grp{
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #4C4D6C;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  }
  .title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}
.cancel-button {
  margin-left: 10px;
  background-color: #a60c1b;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
  </style>
  



