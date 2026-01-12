
import { createRouter, createWebHistory } from 'vue-router';
import { useAlertStore } from '@/stores/alertStore';

// Routes...
import Layout from "@/views/layout/index.vue";
import NotFound from "@/views/404.vue"
import Dashboard from '@/views/dashboard/index.vue';

import User from '@/views/users/index.vue'


const routes = [
    {
        path: "/",
        component: Layout,
        children: [
            { path: 'dashboard', component: Dashboard},
            { path: 'users', component: User},
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});



export default router;