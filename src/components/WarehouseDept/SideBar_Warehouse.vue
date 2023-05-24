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
        
        <VListGroup class="listNav">
            <template v-slot:activator="{ props }">
                    <v-list-item
                        v-bind="props"
                        prepend-icon="mdi-warehouse"
                        title="Inventory"
                        link
                    ></v-list-item>
                </template>
  
                <v-list-item
                    v-for="([title, icon, links], i) in inventory"
                    :key="i"
                    :title="title"
                    :prepend-icon="icon"
                    :to="links"
                    :value="title"
                    link
                ></v-list-item>    
        </VListGroup>
        
        <VListGroup class="listNav">
            <template v-slot:activator="{ props }">
                    <v-list-item
                        v-bind="props"
                        prepend-icon="mdi-location-enter"
                        title="Storage"
                        link
                    ></v-list-item>
                </template>
  
                <v-list-item
                    v-for="([title, icon, links], i) in storage"
                    :key="i"
                    :title="title"
                    :prepend-icon="icon"
                    :to="links"
                    :value="title"
                    link
                ></v-list-item>    
        </VListGroup>
        <VListGroup class="listNav">
            <template v-slot:activator="{ props }">
                    <v-list-item
                        v-bind="props"
                        prepend-icon="mdi-truck"
                        title="Shipping"
                        link
                    ></v-list-item>
                </template>
  
                <v-list-item
                    v-for="([title, icon, links], i) in ship"
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
            to="/"
            prepend-icon="mdi-note-text" 
            title="Order"
            />
        </VList>

        <VList>
            <VListItem class="listNav"
            to="/"
            prepend-icon="mdi-chart-line" 
            title="Report"
            />
        </VList>

    </VList>
    </VNavigationDrawer>
</template>

<script>
export default {
  data: () => ({
    drawerWidth: 64,
    open: [],
    inventory:[
        ['Raw Material', '', '/raw'],
        ['Neksom Product','', '/neksom'],
        ['Add New Product','', '/add'],
    ],
    storage:[
        ['Scan', '','/'],
        ['Key In','', '/'],
    ],
    ship:[
        ['Scan', '','/'],
        
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