import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import NotFound from '../views/NotFound.vue'
// import HomePages from '@/pages/homePages.vue'



const routes = [
    // {
    //     path: '/',
    //     component: HomePages
    // },
    {
        path: '/:id(\\d+)',
        name: 'Product',
        component: MainPage
    },
    {
        path: '/not-found',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/not-found'
    }
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
