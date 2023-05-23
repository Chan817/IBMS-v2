<script setup>
import Dashboard from './components/Dashboard.vue';
import SideBar from './components/SideBar.vue';
import TopBar from './components/TopBar.vue';
import TestCard from './components/testCard.vue';

</script>

<template>
  <v-app>
      <v-main>
        <TopBar/>
        <SideBar/>
        <RouterView/>
      </v-main>
  </v-app>
</template>

