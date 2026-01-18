<template>
<v-row>
    <v-col cols="12">
        <v-row class="mt-3">
            <v-col cols="12" class="">
                <v-card title="Users" subtitle="View All Users List" class="">
                    <v-card-text>
                        <div class="pb-3 pt-3 d-flex flex-wrap ">
                            <v-select 
                                label="Group" 
                                v-model="filter.group" 
                                :items="group"  
                                class="py-2"
                                max-width="150px"
                                persistent-placeholder
                                clearable=""
                                />
                            <v-select 
                                label="Role" 
                                v-model="filter.role" 
                                :items="role"  
                                class="py-2"
                                max-width="150px"
                                persistent-placeholder
                                clearable=""
                                />
                            <v-text-field label="Search" 
                                v-model="filter.search"
                                max-width="200"
                                class="py-2"
                                persistent-placeholder
                                clearable />
                            <v-select 
                                label="Length" 
                                v-model="filter.limit" 
                                :items="[50, 100, 500,1000]"  
                                class="py-2"
                                max-width="150px"
                                />
                            <div class="pl-2 py-2">
                                <v-btn color="primary" variant="flat" prepend-icon="mdi-magnify"
                                    @click="loadItems" />
                            </div>
                             <div class="pl-2 py-2">
                                <v-btn color="primary" variant="flat" prepend-icon="mdi-download"
                                    @click="download" />
                            </div>
                            <div class="pl-2 align-self-center">
                                Showing {{ start }} - {{ end }} of {{ total}} Records
                            </div>
                        </div>
                        <v-data-table-server 
                            class="border striped-table" 
                            :headers="headers" 
                            :items="items"
                            :items-length="total" 
                            :loading="loading" 
                            item-value="id"
                            hide-default-footer
                            @update:options="loadItems">
                        </v-data-table-server>
                        <div>
                            <custom-pagination 
                                :loading="loading" 
                                v-model:page="filter.page"
                                :lastPage="pages" 
                                @page-changed="loadItems" />
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-col>
</v-row>
</template>
<script>

import start from "@/plugins/dummy";
import { useUserStore } from "@/stores/userStore";

import group from "@/enums/group.js"
import role from "@/enums/role";
import { useThemeStore } from "@/stores/themeStore";


export default {
    components: {

    },
    data() {
        return {
            userStore:useUserStore(),
            themeStore:useThemeStore(),
            group,
            role,
            filter:{
                group:null,
                role:null,
                search: '',
                page:1,
                limit:20,
            },
            items: [],
            total: 0,
            pages:1,
            start:0,
            end:0,
            loading: false,
            headers: [
                { title: "ID", value: "id",sortable: false },
                { title: "FullName", value: "name" },
                { title: "Email", value: "email" },
                { title: "Gender", value: "gender" },
                { title: "DOB", value: "date_of_birth" },
                { title: "Group", value: "type" },
                { title: "Role", value: "roles" },
                { title: "Address", value: "address" },
            ],
        };
    },
    computed: {
      
    },
    mounted() {

        this.loadItems();
        
    },
    methods: {
        async loadItems() {

            this.total = 0;
            this.start = 0;
            this.end = 0;
            this.items = [];
            this.loading = true;
            try {

                let res = await this.userStore.getUsersList(this.filter);
                console.log(res);
                
                this.items =  res.data.map((item) => {
                    item.type = Array.isArray(item.type) ? item.type.join(', ') : '';
                    item.roles = Array.isArray(item.roles) ? item.roles.join(', ') : '';
                   return item;    
                })
                this.total = res.total ?? 0;
                this.filter.page = Number(res.page);
                this.start = Number(res.start);
                this.end = Number(res.end)
                this.loading = false;
                this.pages = Number(res.pages);
            } catch (error) {
                console.log(error);
                this.total = 0;
                this.items = [];
                this.loading = false;
            } 
        },
        download(){
            this.themeStore.exportToExcel("users",this.items);
        }

    },
};
</script>
