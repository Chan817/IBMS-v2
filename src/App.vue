<script setup>
import Dashboard from './components/Dashboard.vue';
import SideBar from './components/SideBar.vue';
import TopBar from './components/TopBar.vue';

</script>

<template>
  <v-app>
    <TopBar/>
    <SideBar/>
    
      <v-main>
        <RouterView/>
      </v-main>
  </v-app>
</template>

