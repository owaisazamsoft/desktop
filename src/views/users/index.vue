<template>
<v-row>
    <v-col cols="12">
        <v-row class="mt-3">
            <v-col cols="12" class="">
                <v-card title="Users" subtitle="View All Users List" class="">
                    <v-card-text>
                        <div class="pb-3 pt-3 d-flex flex-wrap ">
                            <div class="pl-2 py-2">
                                <v-text-field label="Search" 
                                    v-model="filter.search"
                                    width="200"
                                    persistent-placeholder
                                    clearable />
                            </div>
                            <div class="pl-2 py-2">
                                <v-btn color="primary" variant="flat" prepend-icon="mdi-magnify"
                                    @click="loadItems" />
                            </div>
                            <div class="pl-2 align-self-center">
                                Showing {{ filteredItems.length }} of {{ total}} Records
                            </div>
                        </div>
                        <v-data-table-server 
                            class="border striped-table" 
                            :headers="headers" 
                            :items="filteredItems"
                            :items-length="total" 
                            :loading="loading" 
                            item-value="id"
                            hide-default-footer
                            @update:options="loadItems">
                        </v-data-table-server>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-col>
</v-row>
</template>
<script>
import generalModel from "@/models/general.model";

export default {
    components: {

    },
    data() {
        return {
            filter: {
                search: '',
            },
            items: [],
            total: 0,
            loading: false,
            headers: [
                { title: "ID", value: "Id",sortable: false },
                { title: "FullName", value: "First Name" },
                { title: "Gender", value: "Gender" },
                { title: "Age", value: "Age" },
                { title: "Date", value: "Date",sortable: false },
            ],
        };
    },
    computed: {
       filteredItems() {

            return this.items.filter(item => {

                const searchText = this.filter.search.toLowerCase();
                
                if(searchText){
                    return item["First Name"]?.toString().toLowerCase().includes(searchText);
                }

                // const matchesSearch = Object.values(item).some(val => 
                //     val.toString().toLowerCase().includes(searchText)
                // );
                // const matchesGroup = this.filter.group ? item.Group === this.filter.group : true;

                return true;

            });
        }
    },
    mounted() {

        this.loadItems();
    },
    methods: {

        async loadItems() {

            this.loading = true;
            try {

                const res = await generalModel.sheet("/data/users.xlsx")             
                this.items = res.data;
                this.total = res.data.length;

            } catch (error) {

                this.totalItems = 0;
                this.items = [];

            } finally {
                this.loading = false;
            }

        },

    },
};
</script>
