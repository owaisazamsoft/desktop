import generalModel from '@/models/general.model';
import Storage from '@/models/storage.models';
import { defineStore } from 'pinia'
import { useTheme } from 'vuetify';

export const useUserStore = defineStore('user', {
    state: () => ({
        data: [],
        loading: false,
    }),

    getters: {
        // userName: (state) => state.user?.name || 'Guest',
    },

    actions: {


        // Users List..
        async getUsersList(options) {

            let limit = options.limit ?? 10;
            let page = options.page ?? 1;
            let total = 0;

            const request = await generalModel.getStorage("users");

            let data = request.filter(item => {

                if (this.search) {
                    const s = String(this.search).toLowerCase();
                    const match =
                        String(item.name ?? '').toLowerCase().includes(s) ||
                        String(item.email ?? '').toLowerCase().includes(s);
                    if (!match) return false;
                }

                // if (this.filters.role && item.role !== this.filters.role) {
                //     return false;
                // }

                // if (this.filters.status && item.status !== this.filters.status) {
                //     return false;
                // }

                return true;
            });

            //Pagination
            total = data.length;
            let pages = Math.max(1, Math.ceil(data.length / limit));
            if (page > pages) {
                page = 1;
            }

            let start = (page - 1) * limit;
            let end = start + limit;
            data = data.slice(start, end);

            return {
                total: total,
                pages: pages,
                page: page,
                limit: limit,
                data: data,
                offset: start,
                start,
                end
            }
        },
        async getList(name,options) {

            let limit = options.limit ?? 10;
            let page = options.page ?? 1;
            let total = 0;

            const request = await generalModel.getStorage(name);

            let data = request.filter(item => {
                // if (this.search) {
                //     const s = String(this.search).toLowerCase();
                //     const match =
                //         String(item.name ?? '').toLowerCase().includes(s) ||
                //         String(item.id ?? '').toLowerCase().includes(s);
                //     if (!match) return false;
                // }
                return true;
            });

            //Pagination
            total = data.length;
            let pages = Math.max(1, Math.ceil(data.length / limit));
            if (page > pages) {
                page = 1;
            }

            let start = (page - 1) * limit;
            let end = start + limit;
            data = data.slice(start, end);

            return {
                total: total,
                pages: pages,
                page: page,
                limit: limit,
                data: data,
                offset: start,
                start,
                end
            }
        },



        // 
        
        async dummyUsers() {

            let data = [];

            for (let index = 0; index < 600; index++) {
                data.push({
                    "id": Date.now(),
                    "username": "jdoe_test " + index,
                    "email": "john.doe" + index + "@example.com",
                    "role": "admin",
                    "createdAt": "2026-01-18T10:00:00Z",
                    "isActive": true
                });
            }

            return data;

        },








    },

})
