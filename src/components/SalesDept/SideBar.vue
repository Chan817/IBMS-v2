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
        title="Inventory"
        />
        
        <VListItem class="list"
        to=""
        prepend-icon="mdi-note-text" 
        title="Orders"
        />

        <VListItem class="sublist"
        to="/offline"
        title="Offline"
        />

        <VListItem class="sublist"
        to="/online"
        title="Online"
        />

        <VListItem class="sublist"
        to="/list"
        title="Order List"
        />

        <VListItem class="list"
        to="/prospect"
        prepend-icon="mdi-account" 
        title="Key In"
        />

        <VListItem class="list"
        to="/report"
        prepend-icon="mdi-chart-line" 
        title="Reports"
        />

        <VListItem class="sublist"
        to="/report"
        title="Sales"
        />

        <VListItem class="sublist"
        to="/report_customer"
        title="Customer"
        />

        <VListItem class="sublist"
        to="/list"
        title="Prospect"
        />

        <VListItem class="sublist"
        to="/list"
        title="Platform"
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
.sublist{
    margin-left: 50px;
    color: #ffffff;
}
</style>