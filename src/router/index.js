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
import RawMaterialTableVue from '@/components/WarehouseDept/RawMaterialTable.vue'
import NeksomTableVue from '@/components/WarehouseDept/NeksomTable.vue'
import AddNewVue from '@/components/WarehouseDept/AddNew.vue'
import Dashboard_WarehouseVue from '@/components/WarehouseDept/Dashboard_Warehouse.vue'
import table_toshipVue from '@/components/WarehouseDept/table_toship.vue'
import table_shippingVue from '@/components/WarehouseDept/table_shipping.vue'
import table_completeVue from '@/components/WarehouseDept/table_complete.vue'
import table_cancelVue from '@/components/WarehouseDept/table_cancel.vue'
import table_allOrdersVue from '@/components/WarehouseDept/table_allOrders'
import report_warehouseVue from '@/components/WarehouseDept/report_warehouse.vue'
import BarcodeScanner from '@/components/WarehouseDept/BarcodeScanner.vue'
import lowstock_notiVue from '@/components/lowstock_noti.vue'
import raw_lowstock_notiVue from '@/components/raw_lowstock_noti.vue'
import UpdateNeksomVue from '@/components/WarehouseDept/UpdateNeksom.vue'
import Storage_keyin_formVue from '@/components/WarehouseDept/Storage_keyin_form.vue'
import UpdateOrderVue from '@/components/SalesDept/UpdateOrder.vue'

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
    path: '/ware_dashboard',
    name: 'wareDash',
    component: Dashboard_WarehouseVue
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
  },
  
  {
    path: '/toship',
    name: 'toship',
    component: table_toshipVue
  },
  {
    path: '/shipping',
    name: 'shipping',
    component: table_shippingVue
  },
  {
    path: '/completed',
    name: 'completed',
    component: table_completeVue
  },
  {
    path: '/cancel',
    name: 'cancel',
    component: table_cancelVue
  },
  {
    path: '/allorder',
    name: 'allorder',
    component: table_allOrdersVue
  },
  {
    path: '/reportWarehouse',
    name: 'reportWarehouse',
    component: report_warehouseVue
  },
  {
    path: '/scan',
    name: 'scan',
    component: BarcodeScanner
  },
  {
    path: '/low_neksom',
    name: 'low_neksom',
    component: lowstock_notiVue
  },
  {
    path: '/low_raw',
    name: 'low_raw',
    component: raw_lowstock_notiVue
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: UpdateNeksomVue
  },
  {
    path: '/editOrder/:id',
    name: 'editOrder',
    component: UpdateOrderVue
  },
 
  {
    path: '/store_keyin',
    name: 'store_keyin',
    component: Storage_keyin_formVue
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
