<template>
     <v-menu offset-y>
            <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            </template>
            <v-list>
            <v-list-item v-for="(item) in this.actions">
                <v-list-item-title v-if="item.link"  
                    class="cursor-pointer"> 
                    <router-link :to="item.link" class="text-decoration-none" >
                        <v-icon 
                            v-if="item.icon" 
                            size="18" 
                            class="me-2 text-decoration-none" 
                            :color="item.color">{{ item.icon }}</v-icon>
                            <span class="on-background" v-if="item.title">{{ item.title }}</span>
                     </router-link>

                </v-list-item-title>

                <v-list-item-title v-else  class="cursor-pointer" 
                    @click="$emit('handleAction',item)">
                    <div>
                        <v-icon 
                        v-if="item.icon" 
                        size="18" 
                        class="me-2" 
                        :color="item.color">{{ item.icon }}</v-icon>
                        <span v-if="item.title" class="on-background" >{{ item.title }}</span>
                    </div>
                </v-list-item-title>
            </v-list-item>
            </v-list>
        </v-menu>
</template>

<script>
    
export default {
  name:"ToolBar",
  props:{
    actions:{
        type:Array,
        default:[],
    },
  },
  components: {

  },
  data() {
    return {

    }
  },
  mounted() {
   
  },
  methods: {
  },
  emits: ['update:handleAction']
};
</script>


<style>


</style>