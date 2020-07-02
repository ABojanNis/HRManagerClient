<template>
  <v-container id="login" class="fill-height" fluid>
    <v-row>
      <v-col
        cols="12"
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
        class="justify-center text-center"
      >
        <v-card>
          <form @submit.prevent="signin">
            <v-card-text>
              <validation-observer ref="obs">
                <h2 class="py-4">Sign in</h2>
                <v-row>
                  <v-col cols="8" offset="2">
                    <validation-provider
                      name="Email"
                      rules="required|email"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="user.email"
                        :error-messages="errors"
                        label="Your email"
                        type="email"
                        validate-on-blur
                        prepend-icon="mdi-email"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="8" offset="2">
                    <validation-provider
                      name="Password"
                      rules="required|min:6"
                      v-slot="{ errors }"
                      vid="password"
                    >
                      <v-text-field
                        v-model="user.password"
                        :error-messages="errors"
                        label="Your password"
                        type="password"
                        validate-on-blur
                        prepend-icon="mdi-lock"
                        counter
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>
              </validation-observer>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col>
                  <v-btn color="indigo" type="submit">Sign in</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </form>
          <v-row>
            <v-col cols="8" offset="2">
              <router-link :to="{ name: 'Sign up' }"
                >Don't you have an account? Please Sign up first!</router-link
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data: () => ({
    user: {}
  }),
  methods: {
    ...mapMutations({
      setMe: "app/setMe"
    }),
    signin() {
      this.$refs.obs.validate().then(result => {
        if (result) {
          let self = this;
          this.$auth
            .login(this.user)
            .then(response => {
              self.$toast.success(response.data.message);
              self.setMe(response.data.user);
              self.$router.push(self.$route.query.redirect || "/dashboard");
            })
            .catch(response => {
              return Promise.reject(response.response);
            });
        }
      });
    }
  }
};
</script>
