<template>
    <div>
      <h2>{{ item.Inv_Name }}</h2>
      <p>{{ item.Inv_Desc }}</p>
      <!-- Display other relevant data fields -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'ViewScannedItem',
    props: ['item'],
  };
  </script>