<template>
  <v-card class="card">
    <v-toolbar color="primary">
      <v-tabs v-model="tab" align-tabs="title">
        <v-tab v-for="item in items" :key="item" :value="item" @click="navigate(item)">
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-card flat>
      <router-view :key="tab" />
    </v-card>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      items: ['Offline Form', 'Online Form'],
    };
  },
  methods: {
    navigate(item) {
      if (item === 'Offline Form') {
        this.$router.push('/offline');
      } else if (item === 'Online Form') {
        this.$router.push('/online');
      }
    },
  },
};
</script>

<style>
.card {
  margin: 20px;
}
</style>
  
  

  