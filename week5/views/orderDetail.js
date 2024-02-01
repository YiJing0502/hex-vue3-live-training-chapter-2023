const { createApp } = Vue;
const { createPinia, mapActions, mapState } = Pinia;
import ordersStore from '../stores/ordersStore.js';
// 元件
import QuantityControlBtns from '../components/QuantityControlBtns.js';

const app = createApp({
  data() {
    return {
      // 用來控制使用優惠券與否的切換
      useCoupon: false,
      // 優惠券代碼
      couponCode: '',
      // 是否觀看送出訂單前的事項
      checkOrderInfo: false,
      // 送出訂單資料
      orderData: {
        "data": {
          "user": {
            "name": null,
            "email": null,
            "tel": null,
            "address": null,
          },
          "message": null,
        }
      },
    }
  },
  components: {
    QuantityControlBtns,
  },
  methods: {
    ...mapActions(ordersStore, ['getOrder', 'postPayOrder'])
  },
  computed: {
    ...mapState(ordersStore, ['isLoading', 'showData', 'userData', 'productData', 'couponData'])
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