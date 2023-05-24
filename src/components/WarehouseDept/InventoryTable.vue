<template>
    <v-card class="card">
      <v-toolbar color="primary">
        <v-tabs v-model="tab" align-tabs="title">
          <v-tab label="Home" @click="$router.push('/offline')"></v-tab>
        </v-tabs>
      </v-toolbar>
  
      <v-card flat>
        <router-view></router-view>
      </v-card>
    </v-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        
      };
    },
  };
  </script>
  
  <style>
  .card {
    margin: 20px;
  }
  </style>