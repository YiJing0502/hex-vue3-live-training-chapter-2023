import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.11/vue.esm-browser.min.js';
import { baseUrl } from './config.js';
const app = createApp({
  data() {
    return {
      email: '',
      password: '',
    };
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
          if(res.data.success){
            alert(res.data.message);
            const { expired, token } = res.data;
            // 寫入 cookie 的 記錄 token
            // 使用expired 設定 token 有效時間
            document.cookie = `adminAccount=${token}; expires=${new Date(expired)}`;
            // 清空輸入框
            this.email = '';
            this.password = '';
            window.location = 'productList.html';
          }
        })
        .catch((err)=>{
          alert(err.data.message);
          return;
        })
    }
  },
});

app.mount('#app');