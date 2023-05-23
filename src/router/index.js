import { createRouter, createWebHistory } from 'vue-router'
import DashboardVue from '@/components/Dashboard.vue'
import OfflineOrderFormVue from '@/components/OfflineOrderForm.vue'
import OnlineOrderFormVue from '@/components/OnlineOrderForm.vue'
import ProductsVue from '@/components/Products.vue'
import ProspectFormVue from '@/components/ProspectForm.vue'
import ReportVue from '@/components/Report.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
