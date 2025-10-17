import { createRouter, createWebHistory } from 'vue-router'
import BuilderView from '../views/BuilderView.vue'
import FormView from '../views/FormView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/builder',
      name: 'builder',
      component: BuilderView,
    },
    {
      path: '/form',
      name: 'form',
      component: FormView,
    },
  ],
})

export default router

