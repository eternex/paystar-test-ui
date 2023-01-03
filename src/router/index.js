import { createRouter, createWebHistory } from "vue-router";

import Home from '../components/Home.vue'
import Checkout from '../components/Checkout.vue'
import Callback from '../components/Callback.vue'

const routes = [
    {
        path: '/',
        component: Home,
        name: 'Main',
    },
    {
        path: '/checkout',
        component: Checkout,
        name: 'Checkout',
    },
    {
        path: '/callback',
        component: Callback,
        name: 'Callback',
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;
