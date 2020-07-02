<template>
  <v-app>
    <v-content>
      <loading
        :active="fetchLoading"
        :can-cancel="false"
        :is-full-page="true"
        color="#4CAF50"
      />
      <router-view />
    </v-content>
    <dashboard-core-footer />
  </v-app>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapGetters } from "vuex";

export default {
  name: "DashboardCoreView",

  components: {
    DashboardCoreFooter: () => import("./Footer"),
    Loading
  },

  computed: {
    ...mapGetters({
      fetchLoading: "app/fetchLoading"
    })
  }
};
</script>
