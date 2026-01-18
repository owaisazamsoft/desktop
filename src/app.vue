<template>
      <div>
          <router-view></router-view>
          <v-overlay :model-value="this.themeStore.loading" :persistent="true" class="align-center justify-center">
            <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
          </v-overlay>
          <Alert />
      </div>
</template>

<script>

import { useThemeStore } from './stores/themeStore';
import Alert from '@/components/alert.vue'
import Overlay from '@/components/overlay.vue'
import { useTheme } from 'vuetify';
import start from './plugins/dummy';



export default {
  props: {},
  components: {
    Alert,
    Overlay
  },
  data() {
    return {
      themeStore: useThemeStore(),
      vuetify: useTheme(),
  
    };
  },
  methods: {

  async load(){

      start().then((res) => {
          console.log(res);
          this.loading = false;
          
        }).catch((error) => {
          console.log(error);
          this.loading = false;
        })
  }

  },
  async mounted() {


    this.load();

  },
  
};

</script>