const { createApp } = Vue;
const { createPinia, mapState, mapActions } = Pinia;
import productsStore from '../stores/productsStore.js';
const app = createApp({
  data() {
    return {

    }
  },
  methods: {
    ...mapActions(productsStore, ['getProductsAll', 'getProduct', 'changeToProductPage']),
  },
  computed: {
    ...mapState(productsStore, ['isLoading','productsData']),
  },
  mounted() {
    this.getProductsAll();
  },
});

const pinia = createPinia();
app.use(pinia);
// vueLoadingComponent
app.component('loading', VueLoading.Component);
app.mount('#app');