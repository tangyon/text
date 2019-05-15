import Vue from "vue";
import App from "./App.vue";
import 'lib-flexible/flexible';
import router from "./router/index.js";
import store from "./store/index.js";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import VueTouch from 'vue-touch';

	Vue.use(VueTouch, {name: 'v-touch'})
        VueTouch.config.swipe = {
 threshold: 150 //手指左右滑动距离
  }


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
