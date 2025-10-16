import { createRouter, createWebHistory } from 'vue-router'

const Dashboard  = () => import('@/views/DashboardView.vue')
const Warehouses = () => import('@/views/WarehousesView.vue')
const Vehicles   = () => import('@/views/VehiclesView.vue')
const Employees  = () => import('@/views/EmployeesView.vue')
const Reports    = () => import('@/views/ReportsView.vue')
const Settings   = () => import('@/views/SettingsView.vue')

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/warehouses' },
    { path: '/dashboard',  name: 'dashboard',  component: Dashboard },
    { path: '/warehouses', name: 'warehouses', component: Warehouses },
    { path: '/vehicles',   name: 'vehicles',   component: Vehicles },
    { path: '/employees',  name: 'employees',  component: Employees },
    { path: '/reports',    name: 'reports',    component: Reports },
    { path: '/settings',   name: 'settings',   component: Settings },
  ],
})
