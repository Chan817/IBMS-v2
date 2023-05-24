import { createRouter, createWebHistory } from 'vue-router'
import DashboardVue from '@/components/SalesDept/Dashboard.vue'
import OfflineOrderFormVue from '@/components/SalesDept/OfflineOrderForm.vue'
import OnlineOrderFormVue from '@/components/SalesDept/OnlineOrderForm.vue'
import ProductsVue from '@/components/SalesDept/Products.vue'
import ProspectFormVue from '@/components/SalesDept/ProspectForm.vue'
import ReportVue from '@/components/SalesDept/Report_Sale.vue'
import OrderListTableVue from '@/components/SalesDept/OrderListTable.vue'
import Report_CustomerVue from '@/components/SalesDept/Report_Customer.vue'
import Report_ProspectVue from '@/components/SalesDept/Report_Prospect.vue'
import Report_PlatformVue from '@/components/SalesDept/Report_Platform.vue'
import barChartVue from '@/components/SalesDept/barChart.vue'
import testCardVue from '@/components/testCard.vue'
import RawMaterialTableVue from '@/components/WarehouseDept/RawMaterialTable.vue'
import NeksomTableVue from '@/components/WarehouseDept/NeksomTable.vue'
import AddNewVue from '@/components/WarehouseDept/AddNew.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardVue
  },
  {
    path: '/bar',
    name: 'bar',
    component: barChartVue
  },
  {
    path: '/offline',
    name: 'offline',
    component: OfflineOrderFormVue
  },
  {
    path: '/test',
    name: 'test',
    component: testCardVue
  },
  {
    path: '/online',
    name: 'online',
    component: OnlineOrderFormVue
  },
  {
    path: '/list',
    name: 'list',
    component: OrderListTableVue
  },
  {
    path: '/product',
    name: 'product',
    component: ProductsVue
  },
  {
    path: '/prospect',
    name: 'prospect',
    component: ProspectFormVue
  },
  {
    path: '/report',
    name: 'report',
    component: ReportVue
  },
  {
    path: '/report_customer',
    name: 'report_customer',
    component: Report_CustomerVue
  },
  {
    path: '/report_prospect',
    name: 'report_prospect',
    component: Report_ProspectVue
  },
  {
    path: '/report_platform',
    name: 'report_platform',
    component: Report_PlatformVue
  },
  {
    path: '/raw',
    name: 'raw',
    component: RawMaterialTableVue
  },
  {
    path: '/neksom',
    name: 'neksom',
    component: NeksomTableVue
  },
  {
    path: '/add',
    name: 'add',
    component: AddNewVue
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
