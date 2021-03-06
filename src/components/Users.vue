<template>
  <v-card class="pa-3">
    <v-card-text>
      <v-container class="pa-0" fluid>
        <v-row>
          <v-col lg="4">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col lg="4" class="mt-2 text-right">
            <v-dialog v-model="dialog" max-width="900px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">{{
                  $t("users_add_new")
                }}</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-form ref="form" @submit.prevent="submit">
                  <v-card-text>
                    <v-container>
                      <validation-observer ref="obs1">
                        <v-row>
                          <v-col cols="6" offset="3">
                            <validation-provider
                              name="Username"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="editedItem.username"
                                :label="$t('users_model_username')"
                                :error-messages="errors"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6" offset="3">
                            <validation-provider
                              name="Name"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="editedItem.name"
                                :label="$t('users_model_name')"
                                :error-messages="errors"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6" offset="3">
                            <validation-provider
                              name="Surname"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="editedItem.surname"
                                :label="$t('users_model_surname')"
                                :error-messages="errors"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                        </v-row>
                        <template v-if="editedId === -1">
                          <v-row>
                            <v-col cols="6" offset="3">
                              <validation-provider
                                name="Password"
                                rules="required|min:6"
                                v-slot="{ errors }"
                                vid="password"
                              >
                                <v-text-field
                                  v-model="editedItem.password"
                                  :error-messages="errors"
                                  :label="$t('users_model_password')"
                                  type="password"
                                  counter
                                ></v-text-field>
                              </validation-provider>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="6" offset="3">
                              <validation-provider
                                name="Password confirmation"
                                rules="required|confirmed:password"
                                v-slot="{ errors }"
                              >
                                <v-text-field
                                  v-model="editedItem.password_confirmation"
                                  :error-messages="errors"
                                  :label="
                                    $t('users_model_password_confirmation')
                                  "
                                  type="password"
                                  counter
                                ></v-text-field>
                              </validation-provider>
                            </v-col>
                          </v-row>
                        </template>
                        <v-row>
                          <v-col cols="6" offset="3">
                            <validation-provider
                              name="Is admin"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <v-select
                                :items="isAdmin"
                                v-model="editedItem.is_admin"
                                :error-messages="errors"
                                :label="$t('users_model_is_admin')"
                                item-text="name"
                              ></v-select>
                            </validation-provider>
                          </v-col>
                        </v-row>
                      </validation-observer>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn
                      color="blue darken-1"
                      text
                      type="submit"
                      :loading="loading"
                      >Save</v-btn
                    >
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="users"
              :server-items-length="total"
              :options.sync="pagination"
            >
              <template v-slot:item.is_admin="{ item }">
                {{ item.is_admin ? "Yes" : "No" }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      v-on="on"
                      small
                      class="mr-2"
                      color="indigo"
                      @click="editItem(item)"
                    >
                      mdi-pencil
                    </v-icon>
                  </template>
                  <span>{{ $t("button_edit") }}</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      v-on="on"
                      small
                      color="error"
                      @click="checkDelete(item._id)"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                  <span>{{ $t("button_delete") }}</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>
        <v-card-text class="text-center">
          This action is permanent, you won't be able to revert this later...
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            class="ma-0 mr-1"
            color="error darken-1"
            @click="deleteDialog = false"
          >
            No
          </v-btn>
          <v-btn
            class="ma-0 ml-1"
            color="info darken-1"
            :loading="loading"
            @click="deleteItem"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import i18n from "@/plugins/i18n";
import _ from "lodash";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Users",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: i18n.t("users_model_id"),
        align: "start",
        sortable: false,
        value: "_id"
      },
      {
        text: i18n.t("users_model_username"),
        align: "start",
        sortable: false,
        value: "username"
      },
      {
        text: i18n.t("users_model_name"),
        align: "start",
        sortable: false,
        value: "name"
      },
      {
        text: i18n.t("users_model_surname"),
        align: "start",
        sortable: false,
        value: "surname"
      },
      {
        text: i18n.t("users_model_is_admin"),
        align: "start",
        sortable: false,
        value: "is_admin"
      },
      {
        text: i18n.t("datatable_actions"),
        align: "end",
        sortable: false,
        value: "actions"
      }
    ],
    users: [],
    editedId: -1,
    editedItem: {},
    pagination: {},
    total: 0,
    search: "",
    deleteDialog: false,
    selectedItemId: null,
    isAdmin: [
      { name: "Yes", value: true },
      { name: "No", value: false }
    ]
  }),

  computed: {
    ...mapGetters({
      loading: "app/loading",
      user: "app/me"
    }),
    formTitle() {
      return this.editedId === -1
        ? i18n.t("users_add_new")
        : i18n.t("users_edit");
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    pagination() {
      this.initialize();
    },
    search: _.debounce(function() {
      this.initialize();
    }, 500)
  },

  methods: {
    ...mapActions({
      getPaginatedUsers: "user/getPaginated",
      storeUser: "user/store",
      updateUser: "user/update",
      deleteUser: "user/delete"
    }),
    ...mapMutations({
      setFetchLoading: "app/setFetchLoading",
      setLoading: "app/setLoading",
      setUser: "app/setMe",
      setUserName: "app/setName",
      setUserSurname: "app/setSurname"
    }),
    initialize() {
      this.setFetchLoading(true);
      this.getPaginatedUsers({
        searchString: this.search,
        pagination: this.pagination
      })
        .then(result => {
          this.users = result.data;
          this.total = result.meta.pagination.total;
        })
        .finally(() => {
          this.setFetchLoading(false);
        });
    },

    editItem(item) {
      this.editedId = item._id;
      this.editedItem = { ...item };
      this.dialog = true;
    },

    checkDelete(itemId) {
      this.selectedItemId = itemId;
      this.deleteDialog = true;
    },

    deleteItem() {
      this.setLoading(true);
      this.deleteUser({
        userId: this.selectedItemId,
        isAdmin: this.user.is_admin
      })
        .then(response => {
          if (response) {
            this.$toast.error(response.message);
            this.initialize(this.pagination.page, this.pagination.itemsPerPage);
            this.deleteDialog = false;
          }
        })
        .finally(() => {
          this.setLoading(false);
        });
    },

    close() {
      this.dialog = false;
      this.editedItem = {};
      this.editedId = -1;
      this.$refs.obs1.reset();
    },

    submit() {
      this.$refs.obs1.validate().then(result => {
        if (result) {
          if (this.editedId !== -1) {
            this.setLoading(true);
            let data = { ...this.editedItem, user: this.user };
            this.updateUser({ userId: this.editedId, data: data })
              .then(response => {
                if (response) {
                  this.$toast.show(response.message);
                  this.initialize(
                    this.pagination.page,
                    this.pagination.itemsPerPage
                  );
                  if (this.user.id === response.user._id) {
                    this.setUserName(response.user.name);
                    this.setUserSurname(response.user.surname);
                  }
                  this.close();
                }
              })
              .finally(() => {
                this.setLoading(false);
              });
          } else {
            this.setLoading(true);
            let data = { ...this.editedItem, user: this.user };
            this.storeUser({ data: data })
              .then(response => {
                if (response) {
                  this.$toast.success(response.message);
                  this.initialize(
                    this.pagination.page,
                    this.pagination.itemsPerPage
                  );
                  this.close();
                }
              })
              .finally(() => {
                this.setLoading(false);
              });
          }
        }
      });
    }
  }
};
</script>
