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
                  $t("workerStatuses_add_new")
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
                          <v-col cols="8" offset="2">
                            <validation-provider
                              name="Worker status description"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="editedItem.description"
                                :label="$t('workerStatuses_model_description')"
                                :error-messages="errors"
                              ></v-text-field>
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
              :items="workerStatuses"
              :server-items-length="total"
              :options.sync="pagination"
            >
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
  name: "WorkerStatuses",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: i18n.t("workerStatuses_model_id"),
        align: "start",
        sortable: false,
        value: "_id"
      },
      {
        text: i18n.t("workerStatuses_model_description"),
        align: "start",
        sortable: false,
        value: "description"
      },
      {
        text: i18n.t("datatable_actions"),
        align: "end",
        sortable: false,
        value: "actions"
      }
    ],
    workerStatuses: [],
    editedId: -1,
    editedItem: {},
    pagination: {},
    total: 0,
    search: "",
    deleteDialog: false,
    selectedItemId: null
  }),

  computed: {
    ...mapGetters({
      loading: "app/loading"
    }),
    formTitle() {
      return this.editedId === -1
        ? i18n.t("workerStatuses_add_new")
        : i18n.t("workerStatuses_edit");
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
      getPaginatedWorkerStatuses: "workerStatus/getPaginated",
      storeWorkerStatus: "workerStatus/store",
      updateWorkerStatus: "workerStatus/update",
      deleteWorkerStatus: "workerStatus/delete"
    }),
    ...mapMutations({
      setFetchLoading: "app/setFetchLoading",
      setLoading: "app/setLoading"
    }),
    initialize() {
      this.setFetchLoading(true);
      this.getPaginatedWorkerStatuses({
        searchString: this.search,
        data: this.pagination
      })
        .then(result => {
          this.workerStatuses = result.data;
          this.total = result.meta.pagination.total;
        })
        .catch(err => console.log(err))
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
      this.deleteWorkerStatus({ workerStatusId: this.selectedItemId })
        .then(response => {
          if (response) {
            this.$toast.error(response.message);
            this.initialize(this.pagination.page, this.pagination.itemsPerPage);
            this.deleteDialog = false;
          }
        })
        .catch(err => console.log(err))
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
            this.updateWorkerStatus({
              workerStatusId: this.editedId,
              data: this.editedItem
            })
              .then(response => {
                if (response) {
                  this.$toast.show(response.message);
                  this.initialize(
                    this.pagination.page,
                    this.pagination.itemsPerPage
                  );
                  this.close();
                }
              })
              .catch(err => console.log(err))
              .finally(() => {
                this.setLoading(false);
              });
          } else {
            this.setLoading(true);
            this.storeWorkerStatus({ data: this.editedItem })
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
              .catch(err => console.log(err))
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
