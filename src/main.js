import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Toast from "vue-toastification";
import mixins from './mixins';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "vue-toastification/dist/index.css";
import './registerServiceWorker';

axios.defaults.baseURL = 'http://localhost:8000/api/';

Vue.config.productionTip = false;
Vue.use(Toast);
Vue.mixin(mixins);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
