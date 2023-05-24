<script setup>
import Dashboard from './components/SalesDept/Dashboard.vue';
import SideBar from './components/SalesDept/SideBar.vue';
import TopBar from './components/SalesDept/TopBar.vue';
import SideBar_Warehouse from './components/WarehouseDept/SideBar_Warehouse.vue';

import TestCard from './components/testCard.vue';

</script>

<template>
  <v-app>
      <v-main>
        <TopBar/>
        
        <!--<SideBar_Warehouse/>-->
        
        <SideBar/>
        <RouterView/>
      </v-main>
  </v-app>
</template>

