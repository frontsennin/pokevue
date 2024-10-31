import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/', 
        redirect: '/home'
    },
    {
        path: '/home',
        name: "Pokedex Home",
        component: HomeView
    },
    { path: '/:pathMatch(.*)*', redirect: '/home' }
  
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;