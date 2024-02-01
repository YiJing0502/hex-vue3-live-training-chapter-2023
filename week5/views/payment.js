const { createApp } = Vue;
const { createPinia, mapActions, mapState } = Pinia;
import ordersStore from '../stores/ordersStore.js';

const app = createApp({
  data() {
    return {
      
    }
  },
  methods: {
    ...mapActions(ordersStore, ['getOrder', 'postPayOrder', 'changeToIdPage'])
  },
  computed: {
    ...mapState(ordersStore, ['isLoading', 'showData',])
  },
  mounted() {
    this.getOrder();
  },
});

const pinia = createPinia();
app.use(pinia);
// vueLoadingComponent
app.component('loading', VueLoading.Component);
app.mount('#app');