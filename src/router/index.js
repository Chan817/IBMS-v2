import { createRouter, createWebHistory } from 'vue-router'
import DashboardVue from '@/components/Dashboard.vue'
import OfflineOrderFormVue from '@/components/OfflineOrderForm.vue'
import OnlineOrderFormVue from '@/components/OnlineOrderForm.vue'
import ProductsVue from '@/components/Products.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
