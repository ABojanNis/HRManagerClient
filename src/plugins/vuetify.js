import Vue from "vue";
import Vuetify from "vuetify/lib";
import i18n from "./i18n";
import "@/sass/overrides.sass";

Vue.use(Vuetify);

const theme = {
  primary: "#4caf50",
  secondary: "#9c27b0",
  accent: "#9c27b0",
  info: "#00cae3"
};

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  },
  theme: {
    themes: {
      dark: theme,
      light: theme
    }
  }
});
