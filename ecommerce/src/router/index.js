import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', redirect: '/1' },
  { path: '/:id(\\d+)', name: 'Product', component: MainPage },
  { path: '/not-found', name: 'NotFound', component: NotFound },
  { path: '/:pathMatch(.*)*', redirect: '/not-found' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
