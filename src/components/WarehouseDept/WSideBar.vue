<template>
  <v-navigation-drawer
      class="drawer"
      rail
      style="background-color: #4C4D6C;"
      :style="{ width: drawerWidth}"
      @mouseout="collapseDrawer"
      @mouseover="expandDrawer"
  >
      <v-list v-model:opened="open">
          <v-list>
              <v-list-item
                  class="listNav"
                  v-bind="props"
                  prepend-icon="mdi-home"
                  title="Home"
                  :to="'/'"
                  link
              ></v-list-item>
          </v-list>
          <v-list-group class="listNav" value="Management">
              <template v-slot:activator="{ props }">
                  <v-list-item
                      v-bind="props"
                      prepend-icon="mdi-briefcase-account"
                      title="Management"
                      link
                  ></v-list-item>
              </template>

              <v-list-item
                  v-for="([title, icon, links], i) in Home"
                  :key="i"
                  :title="title"
                  :prepend-icon="icon"
                  :to="links"
                  :value="title"
                  link
              ></v-list-item>
          </v-list-group>
          <v-list-group class="listNav" value="Finance">
              <template v-slot:activator="{ props }">
                  <v-list-item
                      v-bind="props"
                      prepend-icon="mdi-finance"
                      title="Finance"
                  ></v-list-item>
              </template>

              <v-list-item
                  v-for="([title, icon, links], i) in Finance"
                  :key="i"
                  :title="title"
                  :prepend-icon="icon"
                  :to="links"
                  :value="title"
                  link
              ></v-list-item>
              <v-list-group class="listNav" value="Transaction">
              <template v-slot:activator="{ props }">
                  <v-list-item
                      v-bind="props"
                      prepend-icon="mdi-swap-horizontal"
                      title="Transaction"
                  ></v-list-item>
              </template>

              <v-list-item
                  v-for="([title, icon, links], i) in Transaction"
                  :key="i"
                  :title="title"
                  :prepend-icon="icon"
                  :to="links"
                  :value="title"
                  link
              ></v-list-item>
          </v-list-group>
          </v-list-group>
          <v-list-group class="listNav" value="Production">
              <template v-slot:activator="{ props }">
                  <v-list-item
                      v-bind="props"
                      prepend-icon="mdi-factory"
                      title="Production"
                  ></v-list-item>
              </template>

              <v-list-item
                  v-for="([title, icon, links], i) in Production"
                  :key="i"
                  :title="title"
                  :prepend-icon="icon"
                  :to="links"
                  :value="title"
                  link
              ></v-list-item>
          </v-list-group>
          <v-list-group class="listNav" value="salesMarketing">
              <template v-slot:activator="{ props }">
                  <v-list-item
                      v-bind="props"
                      prepend-icon="mdi-cash-register"
                      title="Sales & Marketing"
                  ></v-list-item>
              </template>

              <v-list-item
                  v-for="([title, icon, links], i) in salesMarketing"
                  :key="i"
                  :title="title"
                  :prepend-icon="icon"
                  :to="links"
                  :value="title"
                  link
              ></v-list-item>
          </v-list-group>
          <v-list-group class="listNav" value="warehouse">
              <template v-slot:activator="{ props }">
                  <v-list-item
                      v-bind="props"
                      prepend-icon="mdi-warehouse"
                      title="Warehouse"
                  ></v-list-item>
              </template>

              <v-list-item
                  v-for="([title, icon, links], i) in warehouse"
                  :key="i"
                  :title="title"
                  :prepend-icon="icon"
                  :to="links"
                  :value="title"
                  link
              ></v-list-item>
          </v-list-group>
      </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
      drawerWidth: 64,
      open: [],
      Home: [
          ['Company Profile', 'mdi-domain', '/companyProfile'],
          ['Employee', 'mdi-account', '/employee'],
      ],
      Management: [
          ['Company Profile', 'mdi-domain', '/companyProfile'],
          ['Employee', 'mdi-account', '/employee'],
      ],
      Finance: [
          ['Quote', 'mdi-account-multiple-outline', '/quoteList'],
          ['Invoice', 'mdi-receipt', '/invoiceList'],
          ['Customer', 'mdi-account-group', '/customerList'],
          ['Vendor', 'mdi-account-supervisor', '/vendorList'],
          ['Purchase Order', 'mdi-cart-arrow-down', '/POList'],
          ['Sales Order', 'mdi-cart-arrow-up', '/SOList'],
          ['Bill', 'mdi-file-document', '/billList'],
          ['Chart of Account', 'mdi-chart-areaspline', '/accList'],
      ],
      Transaction: [
          ['Income', 'mdi-currency-usd', '/addIncome'],
          ['Expense', 'mdi-currency-usd-off', '/addExpense'],
      ],
      Production: [
          ['Product List', 'mdi-package-variant', '/productList'],
          ['Schedule', 'mdi-calendar-clock', '/scheduleList'],
      ],
      salesMarketing: [],
      warehouse: [],
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
  

  