import Vue from "vue";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3000/";

// Heroku
axios.defaults.baseURL = "https://agile-dawn-58615.herokuapp.com/";

Vue.prototype.$http = axios;
