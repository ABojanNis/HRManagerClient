import Vue from "vue";

import "./components";

import "./plugins";
import vuetify from "./plugins/vuetify";

import { EventBus } from "./services/EventBus";

import App from "./App.vue";
import router from "./router";
import store from "@/store";
import i18n from "./plugins/i18n";

Vue.config.productionTip = false;

var app = new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");

Vue.prototype.$http.interceptors.request.use(
  config => {
    app.$Progress.start();
    return config;
  },
  error => {
    app.$Progress.fail();
    return Promise.reject(error);
  }
);

Vue.prototype.$http.interceptors.response.use(
  response => {
    app.$Progress.finish();
    return response;
  },
  error => {
    app.$Progress.fail();
    return Promise.reject(error);
  }
);

window.addEventListener("unhandledrejection", event => {
  event.preventDefault();

  var promise = event.promise;

  promise.catch(error => {
    EventBus.$emit("serverError", { component: app, error: error.response });
  });
});
