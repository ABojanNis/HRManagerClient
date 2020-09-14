<template>
  <div>
    <v-card class="pa-3">
      <v-card-title class="primary mb-4">
        <v-row>
          <v-col class="text-center">
            <span class="headline white--text">
              {{ $t("change_password_title") }}
            </span>
          </v-col>
        </v-row>
      </v-card-title>
      <v-form ref="form" @submit.prevent="submit">
        <v-card-text>
          <v-container>
            <validation-observer ref="obs1">
              <v-row>
                <v-col cols="6" offset="3">
                  <validation-provider
                    name="Old password"
                    rules="required|min:6"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="editedItem.oldPassword"
                      :label="$t('change_password_old_password')"
                      type="password"
                      :error-messages="errors"
                      prepend-icon="mdi-lock"
                      counter
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" offset="3">
                  <validation-provider
                    name="New password"
                    rules="required|min:6"
                    v-slot="{ errors }"
                    vid="password"
                  >
                    <v-text-field
                      v-model="editedItem.newPassword"
                      :label="$t('change_password_new_password')"
                      type="password"
                      :error-messages="errors"
                      prepend-icon="mdi-lock"
                      counter
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" offset="3">
                  <validation-provider
                    name="New password confirmation"
                    rules="required|confirmed:password"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="editedItem.newPasswordConfirmation"
                      :label="$t('change_password_new_password_confirmation')"
                      type="password"
                      :error-messages="errors"
                      prepend-icon="mdi-lock"
                      counter
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
            </validation-observer>
          </v-container>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn color="primary" type="submit" :loading="loading">
            {{ $t("app_bar_change_password") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data: () => ({
    editedItem: {}
  }),
  computed: {
    ...mapGetters({
      user: "app/me",
      loading: "app/loading"
    })
  },
  methods: {
    ...mapActions({
      changePassword: "user/changePassword"
    }),
    ...mapMutations({
      setLoading: "app/setLoading"
    }),
    submit() {
      this.$refs.obs1.validate().then(result => {
        if (result) {
          this.setLoading(true);
          this.changePassword({ userId: this.user.id, data: this.editedItem })
            .then(response => {
              if (response) {
                this.$toast.success(response.message);
                this.editedItem = {};
                this.$refs.obs1.reset();
              }
            })
            .finally(() => {
              this.setLoading(false);
            });
        }
      });
    }
  }
};
</script>
