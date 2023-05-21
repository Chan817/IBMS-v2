<template>
    <VNavigationDrawer 
    expand-on-hover
    rail
    style="background-color: #4C4D6C;"
    >
  
    <VList nav>
        <VListItem class="list"
        to="/"
        prepend-icon="mdi-view-dashboard" 
        title="Dashboard"
        />
        
        <VListItem class="list"
        to="/product"
        prepend-icon="mdi-warehouse" 
        title="Warehouse"
        />
        
        <VListItem class="list"
        to="/"
        prepend-icon="mdi-note-text" 
        title="Orders"
        />

        <VListItem class="list"
        to="/offline"
        prepend-icon="mdi-note-text" 
        title="Offline"
        />

        <VListItem class="list"
        to="/online"
        prepend-icon="mdi-note-text" 
        title="Online"
        />

        <VListItem class="list"
        to="/"
        prepend-icon="mdi-account" 
        title="Key In"
        />

        <VListItem class="list"
        to="/"
        prepend-icon="mdi-chart-line" 
        title="Reports"
        />
    
    </VList>
    </VNavigationDrawer>
</template>

<script>
export default {
  data: () => {
    return{
        drawer: false,
        
    }
  }
}
</script>

<style>
.image{
    padding-bottom: 0;
}
.logo{
    padding: 0;
}
.list{
    
    margin-top: 5px;
    color: #ffffff;
}
.link.icon{
    padding: 50%;
}
</style>