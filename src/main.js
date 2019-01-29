import '@/assets/styles/tailwind.css';
import Vue from 'vue';
import App from './App.vue';
import './components/components';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './utilities/filters';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
