
import { createRouter, createWebHistory } from 'vue-router';
import { useAlertStore } from '@/stores/alertStore';

// Routes...
import Layout from "@/views/layout/index.vue";
import NotFound from "@/views/404.vue"
import Dashboard from '@/views/dashboard/index.vue';

import User from '@/views/users/index.vue'
import Department from '@/views/departments/index.vue'
import Product from '@/views/products/index.vue'
import Lot from '@/views/lots/index.vue'
import Stitching from '@/views/stitchings/index.vue'
import Payment from '@/views/payments/index.vue'
import ledger from '@/views/reports/ledger.vue'
import ledgerDetail from '@/views/reports/ledgerDetail.vue'


const routes = [
    {
        path: "/",
        component: Layout,
        children: [
            { path: 'dashboard', component: Dashboard},
            { path: 'users', component: User},
            { path: 'departments', component: Department},
            { path: 'products', component: Product},
            { path: 'lots', component: Lot},
            { path: 'stitchings', component: Stitching},
            { path: 'payments', component: Payment},
            { path: 'reports/ledger', component: ledger},
            { path: 'reports/ledger-detail/:id', component: ledgerDetail},
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