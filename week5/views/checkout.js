const { createApp } = Vue;
const { createPinia, mapActions, mapState } = Pinia;
import cartsStore from '../stores/cartsStore.js';
import ordersStore from '../stores/ordersStore.js';
// 元件
import QuantityControlBtns from '../components/QuantityControlBtns.js';
// VeeValidateRules
VeeValidate.defineRule('email', VeeValidateRules['email']);
VeeValidate.defineRule('required', VeeValidateRules['required']);
VeeValidate.defineRule('max', VeeValidateRules['max']);
// 讀取外部的資源 轉換成多國語系設定
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
// Activate the locale 
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

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
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請輸入正確的行動電話號碼'
    },
    goToPutCart(productCartId,productId,qty){
      this.putCart(productCartId,productId,qty)
    },
    goToPostCoupon(){
      this.postCoupon(this.couponCode);
    },
    ...mapActions(cartsStore, ['getCart', 'putCart', 'deleteCart', 'deleteCarts', 'postCoupon',]),
    ...mapActions(ordersStore, ['postOrder',]),
  },
  computed: {
    ...mapState(cartsStore, ['isLoading', 'cartsData', 'allCartsData']),
  },
  mounted() {
    this.getCart();
  },
});

const pinia = createPinia();
app.use(pinia);
// vueLoadingComponent
app.component('loading', VueLoading.Component);
// veeValidationComponent
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount('#app');