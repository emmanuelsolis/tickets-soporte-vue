import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tasklist',
      name: 'tasklist',
      component: () => import('../views/TaskList.vue')
    },
    {
      path: '/kanbanboard',
      name: 'kanbanboard',
      component: () => import('../views/KanbanBoard.vue')
    }, 
    {
      path: '/contact',
      name: 'soporte',
      component: ()=> import('../views/Contact.vue')
    }
  ]
})

export default router
