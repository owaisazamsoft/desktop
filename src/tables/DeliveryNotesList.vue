<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          <div>
            <div class="text-h6">{{title}}</div>
            <div class="text-caption text-grey">{{ subTitle }}</div>
          </div>
          <ToolBar 
            :actions="actions.filter(r => r.isTop == 1)" 
            @handleAction="handleRowAction($event)" />
        </v-card-title>

        <v-card class="" outlined>
          <v-card-text>
            <v-row class="flex-row" align="center" >
                <v-col 
                  v-for="field in fields"
                    :key="field.name"
                    cols="auto"
                  >
                  <UserDropdown v-if="field.name == 'user_id'" 
                    v-bind="field.props"
                    v-model="field.value"
                    v-on="field?.events" 
                  />

                  <v-btn v-else-if="field.component == 'v-btn'" v-bind="field.props" v-on="field.events"  >
                    {{ field.props.label }}
                  </v-btn>

                  <component v-else
                    :is="field.component"
                    v-model="field.value"
                    v-bind="field.props"
                    v-on="field.events"
                  />
              </v-col>
              <v-col>
                <div class="align-self-center">
                  Showing {{ tableStore.from }} - {{ tableStore.to }} of {{ tableStore.total}}
                  Records
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card-text>
          <v-row class="mb-2">
            <v-col cols="12" class="d-flex align-center flex-wrap">
              <v-spacer />
            </v-col>
          </v-row>

          <v-data-table-server 
            class="border striped-table" 
            :headers="headers" 
            :items="tableStore.data"   
            :items-length="tableStore.total"
            :loading="tableStore.loading"
            item-value="id" 
            @update:options="loadItems">

            <template #item.actions="{ item }">
                <ToolBar 
                  :actions="actions.filter(r => !r?.isTop)" 
                  @handleAction="handleRowAction($event,item)" />
            </template>

            <template #item.user="{ item }">
              {{ item.user?.firstName || '-' }} {{ item.user?.surname || '' }}
            </template>

            <template #item.status="{ item }">
              <v-chip :color="item.status == 1 ? 'green' : 'red'" size="small" dark>
                {{ item.status == 1 ? 'Active' : 'Deactive' }}
              </v-chip>
            </template>
            <template #item.is_paid="{ item }">
              <v-chip :color="item.is_paid == 1 ? 'green' : 'red'" size="small" dark>
                {{ item.is_paid == 1 ? 'Paid' : 'Unpaid' }}
              </v-chip>
            </template>

            <template #item.delivery_note="{ item }">
                <div v-if="item.items?.length">
                  <div v-for="(it, index) in item.items" :key="index">
                    {{ it.delivery_note?.ref || '-' }}
                  </div>
                </div>
                <span v-else>-</span>
            </template>

            <template v-slot:bottom>
              <custom-pagination 
                :loading="tableStore.loading" 
                v-model:page="tableStore.page" 
                :lastPage="tableStore.lastPage"
                @page-changed="loadItems" />
            </template>
          </v-data-table-server>
        </v-card-text>
      </v-card>

    </v-col>
  </v-row>
</template>

<script>
import generaApi from "@/models/general.model"
import UserDropdown from "@/components/UserDropdown.vue"
import Config from "@/models/config.model";
import { useTableStore } from "./components/TableStore";
import ToolBar from "../components/ToolBar.vue";

export default {
  name:"DeliveryNotesList",
  components: {
    UserDropdown,
    ToolBar
  },
  data() {
    return {
      tableStore:useTableStore(),
      config:Config,
      title:'Delivery Notes',
      subTitle:'View All Delivery Notes Details',
      fields:[
        {
          name: 'start_date',
          value:'',
          component: 'v-text-field',
          props: {
            type:'date',
            label: 'Start Date',
            clearable: true
          },
          events:{}
        },
        {
          name: 'end_date',
          value:'',
          component: 'v-text-field',
          props: {
            type:'date',
            label: 'End Date',
            clearable: true
          },
          events:{}
        },
        {
          name: 'user_id',
          value:null,
          component: 'v-text-field',
          props: {
            label: 'Users',
            clearable: true,
            minWidth:'200px',
            persistentPlaceholder:true,
          },
          events:{}
        },
        {
          name: 'status',
          value:null,
          component: 'v-select',
          props: {
            label: 'Status',
            clearable: true,
            items:Config.Status,
            minWidth:'250px',
            persistentPlaceholder:true,
          },
          events:{}
        },
        {
          name: 'search',
          value:'',
          component: 'v-text-field',
          props: {
            prependInnerIcon:"mdi-magnify",
            label: 'Search',
            clearable: true,
            minWidth:"300px",
            persistentPlaceholder:true,
          },
          events:{}
        },
        {
          name: 'length',
          value:10,
          component: 'v-select',
          props: {
            label: 'Length',
            items:Config.Sorts,
            persistentPlaceholder:true,
          },
          events:{}
        },
        {
          name: 'button',
          value:'',
          component:'v-btn',
          props: {
            label: 'Search',
            color:'primary',
            persistentPlaceholder:true,
          },
          events: {
            click: () => this.loadItems()
          }
        },
      ],
      actions:[
        {
          title:'Create',
          icon:'mdi-plus',
          color:'success',
          isTop:1,
          link:'/user/deliveryNote/create'
        },
        {
          title:'Reload',
          icon:'mdi-reload',
          color:'danger',
          isTop:1,
        },
        {
          title:'Edit',
          icon:'mdi-printer',
          color:'warning',
        },
        {
          title:'Delete',
          icon:'mdi-delete',
          color:'danger',
        }
      ],
      headers: [
        { title: "ID", value: "id" },
        { title: "DC", value: "prefix" },
        { title: "Date", value: "date" },
        { title: "User", value: "user" },
        { title: "Ref", value: "ref" },
        { title: "Status", value: "status" },
        { title: "Total", value: "total" },
        { title: "Actions", value: "actions", sortable: false },
      ],
  
    };
  },
  mounted() {

    this.loadItems();

  },
  methods: {

    async loadItems() {

        this.loading = true;
        try {

            const params = Object.fromEntries(this.fields.map(u => [u.name, u.value]));
            params.page = this.tableStore.page;
            const res = await generaApi.get('/api/deliveryNotes',params);

            
            this.tableStore.data = res.data;
            this.tableStore.total = Number(res.total);                
            this.tableStore.page = Number(res.current_page);
            this.tableStore.lastPage = Number(res.last_page);
            this.tableStore.to = Number(res.to);
            this.tableStore.from = Number(res.from);
            this.tableStore.loading = false;  
            this.tableStore.length = res.per_page

        } catch (error) {
            this.$alertStore.add(error.message, "error");
            this.tableStore.data = [];
            this.tableStore.total = 0;
            this.tableStore.page = 1;
            this.tableStore.lastPage = 1;
            this.tableStore.loading = false;       
        }
    },

    async handleRowAction(action,item){
      switch (action.title) {
        case 'Create':
          this.$router.push('/user/deliverynote/Create')
          break;
        case 'Edit':
          this.$router.push('/user/deliverynote/edit/'+item.id)
          break;
        case 'Reload': 
          this.loadItems()
          break;
        case 'Delete':
            this.tableStore.DeleteRecord('/api/deliveryNotes/'+item.id);
          break;
        default:
          break;

      }

    },
  
  },
};
</script>


<style>

  .toolbar-option{
    cursor: pointer;
  }

</style>