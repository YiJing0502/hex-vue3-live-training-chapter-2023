console.clear()
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const app = createApp({
  data(){
    return {
      user: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    login(){
      const baseUrl = 'https://vue3-course-api.hexschool.io';
      const api = `${baseUrl}/v2/admin/signin`;
      axios.post(api, this.user)
        .then((res)=>{
          const { token, expired } = res.data;
          console.log(new Date(expired));
          // 寫入 cookie的token
          // 使用 expired 設置有效時間
          document.cookie = `adminAccount=${token}; expires=${new Date(expired)}; path=/`;
          window.location = 'products.html';
        })
        .catch((err)=>{
          console.log(err);
          alert(err.response.data.message);
        });
    },
  },
});

app.mount('#app');