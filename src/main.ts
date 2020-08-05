import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Navigation from "./components/Navigation.vue";
import Layout from "./components/Layout.vue";
import Icon from "./components/Icon.vue";

Vue.config.productionTip = false;

Vue.component("Navigation", Navigation);
Vue.component("Layout", Layout);
Vue.component("Icon", Icon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
