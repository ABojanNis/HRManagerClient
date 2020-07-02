<template>
  <v-row>
    <v-col cols="12" class="pa-0">
      <v-card color="ma-0" flat>
        <v-toolbar color="primary" :dark="true" class="px-4">
          <router-link
            to="/dashboard"
            class="white--text"
            style="text-decoration: none;"
            ><v-toolbar-title>{{
              $t("app_bar_title")
            }}</v-toolbar-title></router-link
          >
          <v-spacer></v-spacer>
          <v-btn text large class="mx-2">
            <v-icon>mdi-account-group</v-icon> {{ $t("app_bar_users") }}
          </v-btn>
          <v-btn text large class="mx-2" to="/skills">
            <v-icon>mdi-account-cog</v-icon> {{ $t("app_bar_skills") }}
          </v-btn>
          <v-btn text large class="mx-2" to="/experiences">
            <v-icon>mdi-card-account-details</v-icon>
            {{ $t("app_bar_experiences") }}
          </v-btn>
          <v-btn text large class="mx-2" to="/worker-statuses">
            <v-icon>mdi-account-star</v-icon>
            {{ $t("app_bar_worker_statuses") }}
          </v-btn>
          <div class="text-center mx-2">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn text large v-on="on">
                  {{ fullUsername }}<v-icon class="ml-2">mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title>
                    <v-btn text block @click="logout">
                      <v-icon color="error" class="mr-2">mdi-logout</v-icon>
                      {{ $t("app_bar_logout") }}
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-toolbar>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "app/me"
    }),
    fullUsername() {
      if (this.user) {
        return this.user.name + " " + this.user.surname;
      } else return "";
    }
  },
  methods: {
    ...mapMutations({
      setMe: "app/setMe"
    }),
    logout() {
      let self = this;
      this.$auth.logout().then(() => {
        self.$toast.success("You are successfully logged out!");
        self.$router.push("/");
        self.setMe(null);
      });
    }
  }
};
</script>
