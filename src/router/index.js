import { createRouter, createWebHistory } from 'vue-router'
import DashboardVue from '@/components/SalesDept/Dashboard.vue'
import OfflineOrderFormVue from '@/components/SalesDept/OfflineOrderForm.vue'
import OnlineOrderFormVue from '@/components/SalesDept/OnlineOrderForm.vue'
import ProductsVue from '@/components/SalesDept/Products.vue'
import ProspectFormVue from '@/components/SalesDept/ProspectForm.vue'
import ReportVue from '@/components/SalesDept/Report_Sale.vue'
import OrderListTableVue from '@/components/SalesDept/OrderListTable.vue'
import Report_CustomerVue from '@/components/SalesDept/Report_Customer.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardVue
  },
  {
    path: '/offline',
    name: 'offline',
    component: OfflineOrderFormVue
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
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
