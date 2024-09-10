import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '../views/AdminView.vue'
import OrdersList from '../views/OrdersList.vue'
import ProductsList from '../views/ProductsList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AdminView
    },
    {
      path: '/orders-list',
      name: 'ordersList',
      component: OrdersList
    },
    {
      path: '/products-list',
      name: 'productsList',
      component: ProductsList
    }
  ]
})

export default router
