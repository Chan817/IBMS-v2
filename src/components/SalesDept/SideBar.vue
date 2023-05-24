<template>
    <VNavigationDrawer 
    expand-on-hover
    rail
    style="background-color: #4C4D6C;"
    :style="{ width: drawerWidth}"
    @mouseout="collapseDrawer"
    @mouseover="expandDrawer"
    >

    <VList v-model:opened="open">
        <VList>
            <VListItem class="listNav"
            to="/"
            prepend-icon="mdi-view-dashboard" 
            title="Dashboard"
            />
        </VList>
        
        <VList>
            <VListItem class="listNav"
            to="/bar"
            prepend-icon="mdi-view-dashboard" 
            title="Bar chart test"
            />
        </VList>
        
        <VList>
            <VListItem class="listNav"
            to="/product"
            prepend-icon="mdi-warehouse" 
            title="Inventory"
            />
        </VList>
        
        <VListGroup class="listNav">
            <template v-slot:activator="{ props }">
                    <v-list-item
                        v-bind="props"
                        prepend-icon="mdi-note-text"
                        title="Orders"
                        link
                    ></v-list-item>
                </template>
  
                <v-list-item
                    v-for="([title, icon, links], i) in orders"
                    :key="i"
                    :title="title"
                    :prepend-icon="icon"
                    :to="links"
                    :value="title"
                    link
                ></v-list-item>    
        </VListGroup>
        
        <VList>
            <VListItem class="listNav"
            to="/prospect"
            prepend-icon="mdi-account" 
            title="Prospect"
            />
        </VList>
        
        <VListGroup class="listNav">
            <template v-slot:activator="{ props }">
                    <v-list-item
                        v-bind="props"
                        prepend-icon="mdi-chart-line"
                        title="Reports"
                        link
                    ></v-list-item>
                </template>
  
                <v-list-item
                    v-for="([title, icon, links], i) in report"
                    :key="i"
                    :title="title"
                    :prepend-icon="icon"
                    :to="links"
                    :value="title"
                    link
                ></v-list-item>    
        </VListGroup>
    </VList>
    </VNavigationDrawer>
</template>

<script>
export default {
  data: () => ({
    drawerWidth: 64,
    open: [],
    orders:[
        ['Offline Order', '','/offline'],
        ['Online Order',  '','/online'],
    ],
    report:[
    ['Sales', '','/report'],
    ['Customer','', '/report_customer'],
    ['Prospect','', '/report_prospect'],
    ['Platform','', '/report_platform'],
    ],
  }),
  methods: {
        expandDrawer() {
        this.drawerWidth = '330px'; // Set the expanded width of the drawer
        },
  
        collapseDrawer() {
        this.drawerWidth = '64px'; // Set the collapsed width of the drawer
        },
    },
}
</script>
  
<style>
  .listNav{
      color: #ffffff;
  }
</style>