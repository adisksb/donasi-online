import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Toast from "vue-toastification";
import mixins from './mixins';
import VueSocialSharing from 'vue-social-sharing';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "vue-toastification/dist/index.css";
import './registerServiceWorker';

// axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.baseURL = 'https://donasikita.nursyafriady.com/api';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.config.productionTip = false;
Vue.use(Toast);
Vue.mixin(mixins);
Vue.use(VueSocialSharing);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
