import Vue from "vue";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import {
  email,
  numeric,
  required,
  min,
  confirmed
} from "vee-validate/dist/rules";

extend("email", { ...email, message: "Please enter valid email!" });
extend("numeric", { ...numeric, message: "Value must be numeric!" });
extend("required", { ...required, message: e => e + " is required!" });
extend("min", {
  ...min,
  message: (e, v) => e + " must be minimum " + v.length + " characters long!"
});
extend("confirmed", {
  ...confirmed,
  message: e => e + " confirmation does not match!"
});

Vue.component("validation-provider", ValidationProvider);
Vue.component("validation-observer", ValidationObserver);
