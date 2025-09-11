import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/views/RegisterView.vue'
import CustomerDashboardView from '@/views/CustomerDashboardView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/login',
      name: 'loginPage',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: CustomerDashboardView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboardView
    }
  ]
})

export default router