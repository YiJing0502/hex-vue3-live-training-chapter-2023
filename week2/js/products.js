import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const app = createApp({
  data(){
    return {
      products: [],
      showData: {},
    }
  },
  methods: {
    userCheck() {
      const api = `${baseUrl}/v2/api/user/check`;
      axios.post(api)
        .then((res)=>{
          if(res.data.success){
            alert('成功登入！');
            this.getAdminProductsAll();
          }
          
        })
        .catch((err)=>{
          alert(err.data.message);
          window.location = 'login.html';
        });
    },
    getAdminProductsAll() {
      const api = `${baseUrl}/v2/api/${apiPath}/admin/products/all`;
      axios.get(api)
        .then((res)=>{
          this.products = res.data.products;
        })
        .catch((err)=>{
          alert(err.data.message);
        });
    }
  },
  mounted(){
    // 取得 Token（Token 僅需要設定一次）
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)adminAccount\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
    // 夾帶token在header中，只要加入一次就可以重複使用
    axios.defaults.headers.common['Authorization'] = token;
    // 觸發確認是否登入
    this.userCheck();
  }
})
app.mount('#app');
// 產品資料格式
