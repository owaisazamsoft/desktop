import { defineStore } from "pinia";
import api from "../../plugins/axios";
import generaApi from "@/models/general.model"

import { errorHandler } from "@/services/responseHandleService";

export const useTableStore = defineStore("table", {
    state: () => ({
        loading:false,
        searchUrl:"",
        data:[],
        total:0,
        lastPage:1,
        page:1,
        from:0,
        to:0,
        length:10,
    }),
    getters: {

    },
    actions: {
      
       async DeleteRecord(url) {
            
            if (!confirm("Are you sure you want to delete selected items?")) return ;
                this.loading = true;
                try {
                    await generaApi.delete(url);
                    // this.$alertStore.add("Selected items deleted successfully", "success");
                    this.loading = true;
                    return true;
                } catch (error) {
                    // this.$alertStore.add(error.message || "Delete failed", "error");
                    return false;
                } 
                finally {
                    return false;
                }
        },


    

    }

});


