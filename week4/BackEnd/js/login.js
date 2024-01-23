import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.11/vue.esm-browser.min.js';
import { baseUrl } from './config.js';
import ResultModal from '../components/ResultModal.js';
let myResultModal = null;
const app = createApp({
  data() {
    return {
      email: '',
      password: '',
      serverMessage: {
        message: '',
        success: true,
      },
    };
  },
  components: {
    ResultModal
  },
  methods: {
    postAdminSignin() {
      if(this.email === '' && this.password === '') {
        alert('Enter email and password is required');
        return
      };
      const obj = {
        "username": this.email,
        "password": this.password,
      };
      axios.post(`${baseUrl}/v2/admin/signin`, obj)
        .then((res)=>{
          this.serverMessage.message = res.data.message;
          this.serverMessage.success = res.data.success;
          myResultModal.show();
          if(res.data.success){
            const { expired, token } = res.data;
            // 寫入 cookie 的 記錄 token
            // 使用expired 設定 token 有效時間
            document.cookie = `adminAccount=${token}; expires=${new Date(expired)}`;
            // 清空輸入框
            this.email = '';
            this.password = '';
            window.location = 'product.html';
          }
        })
        .catch((err)=>{
          console.log(err);
          this.serverMessage.message = err.response.data.message;
          this.serverMessage.success = err.response.data.success;
          myResultModal.show();
          return;
        })
    }
  },
  mounted() {
    // 獲取 bsResultModal DOM
    const bsResultModal = document.querySelector('#bsResultModal');
    // 建立 bootstrap modal 實體
    myResultModal = new bootstrap.Modal(bsResultModal);
  },
});

app.mount('#app');