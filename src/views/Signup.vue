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
          <form @submit.prevent="signup">
            <v-card-text>
              <validation-observer ref="obs">
                <h2 class="py-4">Sign up</h2>
                <v-row>
                  <v-col cols="8" offset="2">
                    <validation-provider
                      name="Name"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="user.name"
                        :error-messages="errors"
                        label="Your name"
                        type="text"
                        validate-on-blur
                        prepend-icon="mdi-account"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="8" offset="2">
                    <validation-provider
                      name="Email"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="user.email"
                        :error-messages="errors"
                        label="Your email"
                        type="text"
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
                <v-row>
                  <v-col cols="8" offset="2">
                    <validation-provider
                      name="Password confirmation"
                      rules="required|confirmed:password"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="user.password_confirmation"
                        :error-messages="errors"
                        label="Confirm your passoword"
                        type="password"
                        validate-on-blur
                        prepend-icon="mdi-alert-circle"
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
                  <v-btn color="indigo" type="submit">Sign up</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </form>
          <v-row>
            <v-col cols="8" offset="2">
              <router-link :to="{ name: 'Sign in' }"
                >Already have account? You can Sign in!</router-link
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    user: {}
  }),
  methods: {
    signup() {
      let self = this;
      this.$refs.obs.validate().then(result => {
        if (result) {
          this.$auth.register(this.user).then(response => {
            self.$toast.success(response.data.message);
            self.$router.push("/");
          });
        }
      });
    }
  }
};
</script>
