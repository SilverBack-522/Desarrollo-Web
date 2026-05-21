import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/view/LoginView.vue'
import DashboardView from '@/view/DashboardView.vue'
import ProductListView from '../view/ProductListView.vue';
import ProductCreateView from '../view/ProductCreateView.vue';
import ProductEditView from '../view/ProductEditView.vue';

const routes = [
  { path: '/', component: LoginView },
  { path: '/dashboard', component: DashboardView },
  { path: '/products', name: 'ProductList', component: ProductListView },
  { path: '/products/new', name: 'ProductCreate', component: ProductCreateView },
  { path: '/products/edit/:id', name: 'ProductEdit', component: ProductEditView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})