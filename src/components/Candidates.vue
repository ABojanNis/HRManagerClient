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
                  $t("candidates_add_new")
                }}</v-btn>
              </template>
              <v-card>
                <v-card-title class="primary">
                  <v-row>
                    <v-col cols="8" offset="2">
                      <span class="headline white--text">{{ formTitle }}</span>
                    </v-col>
                  </v-row>
                </v-card-title>

                <v-form ref="form" @submit.prevent="submit">
                  <v-card-text>
                    <v-container>
                      <validation-observer ref="obs1">
                        <v-row class="text-center">
                          <v-col cols="8" offset="2">
                            <span class="headline">{{
                              $t("candidates_modal_details")
                            }}</span>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="4" offset="2">
                            <validation-provider
                              name="Candidate name"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="editedItem.name"
                                :label="$t('candidates_model_name')"
                                :error-messages="errors"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                          <v-col cols="4">
                            <validation-provider
                              name="Candidate surname"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="editedItem.surname"
                                :label="$t('candidates_model_surname')"
                                :error-messages="errors"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="4" offset="2">
                            <validation-provider
                              name="Candidate email"
                              rules="email"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="editedItem.email"
                                :label="$t('candidates_model_email')"
                                :error-messages="errors"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                          <v-col cols="4">
                            <validation-provider
                              name="Candidate phone"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="editedItem.phone"
                                :label="$t('candidates_model_phone')"
                                :error-messages="errors"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="4" offset="2">
                            <validation-provider
                              name="Candidate LinkedIn"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="editedItem.linkedin"
                                :label="$t('candidates_model_linkedin')"
                                :error-messages="errors"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                          <v-col cols="4">
                            <validation-provider
                              name="Candidate city"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="editedItem.city"
                                :label="$t('candidates_model_city')"
                                :error-messages="errors"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                        </v-row>
                        <v-row class="text-center">
                          <v-col cols="8" offset="2">
                            <span class="headline">{{
                              $t("candidates_modal_education")
                            }}</span>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="4" offset="2">
                            <validation-provider
                              name="Candidate education"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="editedItem.education"
                                :label="$t('candidates_model_education')"
                                :error-messages="errors"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                          <v-col cols="4">
                            <validation-provider
                              name="Candidate department"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="editedItem.department"
                                :label="$t('candidates_model_department')"
                                :error-messages="errors"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                        </v-row>
                        <v-row class="text-center">
                          <v-col cols="8" offset="2">
                            <span class="headline">{{
                              $t("candidates_modal_skills")
                            }}</span>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="4" offset="2">
                            <validation-provider
                              name="Candidate primary skill"
                              v-slot="{ errors }"
                            >
                              <v-autocomplete
                                v-model="editedItem.primary_skill"
                                :items="skills"
                                item-text="description"
                                item-value="description"
                                :label="$t('candidates_model_primary_skill')"
                                :error-messages="errors"
                              ></v-autocomplete>
                            </validation-provider>
                          </v-col>
                          <v-col cols="4">
                            <validation-provider
                              name="Candidate secondary skill"
                              v-slot="{ errors }"
                            >
                              <v-autocomplete
                                v-model="editedItem.secondary_skill"
                                :items="skills"
                                item-text="description"
                                item-value="description"
                                :label="$t('candidates_model_secondary_skill')"
                                :error-messages="errors"
                              ></v-autocomplete>
                            </validation-provider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="4" offset="2">
                            <validation-provider
                              name="Candidate other skill"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="editedItem.other_skills"
                                :label="$t('candidates_model_other_skills')"
                                :error-messages="errors"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                          <v-col cols="4">
                            <validation-provider
                              name="Candidate experience"
                              v-slot="{ errors }"
                            >
                              <v-autocomplete
                                v-model="editedItem.experience"
                                :items="experiences"
                                item-text="name"
                                item-value="name"
                                :label="$t('candidates_model_experience')"
                                :error-messages="errors"
                              ></v-autocomplete>
                            </validation-provider>
                          </v-col>
                        </v-row>
                        <v-row class="text-center">
                          <v-col cols="8" offset="2">
                            <span class="headline">{{
                              $t("candidates_modal_worker_status")
                            }}</span>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="4" offset="2">
                            <validation-provider
                              name="Candidate status"
                              v-slot="{ errors }"
                            >
                              <v-autocomplete
                                v-model="editedItem.status"
                                :items="workerStatuses"
                                item-text="description"
                                item-value="descpription"
                                :label="$t('candidates_model_status')"
                                :error-messages="errors"
                              ></v-autocomplete>
                            </validation-provider>
                          </v-col>
                          <v-col cols="4">
                            <validation-provider
                              name="Candidate company"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="editedItem.company"
                                :label="$t('candidates_model_company')"
                                :error-messages="errors"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="4" offset="4">
                            <validation-provider
                              name="Candidate desired salary"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="editedItem.desired_salary"
                                :label="$t('candidates_model_desired_salary')"
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
              :items="candidates"
              :server-items-length="total"
              :options.sync="pagination"
            >
              <template v-slot:item.name="{ item }">
                <router-link :to="'/candidate/' + item._id">{{
                  item.name + " " + item.surname
                }}</router-link>
              </template>
              <template v-slot:item.city="{ item }">
                {{ item.city ? item.city : $t("not_assigned") }}
              </template>
              <template v-slot:item.education="{ item }">
                {{ item.education ? item.education : $t("not_assigned") }}
              </template>
              <template v-slot:item.department="{ item }">
                {{ item.department ? item.department : $t("not_assigned") }}
              </template>
              <template v-slot:item.primary_skill="{ item }">
                {{
                  item.primary_skill ? item.primary_skill : $t("not_assigned")
                }}
              </template>
              <template v-slot:item.secondary_skill="{ item }">
                {{
                  item.secondary_skill
                    ? item.secondary_skill
                    : $t("not_assigned")
                }}
              </template>
              <template v-slot:item.other_skills="{ item }">
                {{ item.other_skills ? item.other_skills : $t("not_assigned") }}
              </template>
              <template v-slot:item.experience="{ item }">
                {{ item.experience ? item.experience : $t("not_assigned") }}
              </template>
              <template v-slot:item.createdAt="{ item }">
                {{ item.createdAt | moment("DD.MM.YYYY") }}
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
  name: "Dashboard",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: i18n.t("candidates_model_id"),
        align: "start",
        sortable: false,
        value: "_id"
      },
      {
        text: i18n.t("candidates_model_name"),
        align: "start",
        sortable: false,
        value: "name"
      },
      {
        text: i18n.t("candidates_model_city"),
        align: "start",
        sortable: false,
        value: "city"
      },
      {
        text: i18n.t("candidates_model_education"),
        align: "start",
        sortable: false,
        value: "education"
      },
      {
        text: i18n.t("candidates_model_department"),
        align: "start",
        sortable: false,
        value: "department"
      },
      {
        text: i18n.t("candidates_model_primary_skill"),
        align: "start",
        sortable: false,
        value: "primary_skill"
      },
      {
        text: i18n.t("candidates_model_secondary_skill"),
        align: "start",
        sortable: false,
        value: "secondary_skill"
      },
      {
        text: i18n.t("candidates_model_other_skills"),
        align: "start",
        sortable: false,
        value: "other_skills"
      },
      {
        text: i18n.t("candidates_model_experience"),
        align: "start",
        sortable: false,
        value: "experience"
      },
      {
        text: i18n.t("candidates_model_date"),
        align: "start",
        sortable: false,
        value: "createdAt"
      },
      {
        text: i18n.t("datatable_actions"),
        align: "end",
        sortable: false,
        value: "actions"
      }
    ],
    candidates: [],
    skills: [],
    experiences: [],
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
        ? i18n.t("candidates_add_new")
        : i18n.t("candidates_edit");
    }
  },

  watch: {
    dialog(val) {
      if (val) {
        this.setFetchLoading(true);
        this.getAllSkills()
          .then(result => {
            this.skills = result.data;
          })
          .finally(() => {
            this.setFetchLoading(false);
          });
        this.getAllExperiences()
          .then(result => {
            this.experiences = result.data;
          })
          .finally(() => {
            this.setFetchLoading(false);
          });
        this.getAllWorkerStatuses()
          .then(result => {
            this.workerStatuses = result.data;
          })
          .finally(() => {
            this.setFetchLoading(false);
          });
      } else this.close();
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
      getPaginatedCandidates: "candidate/getPaginated",
      storeCandidate: "candidate/store",
      updateCandidate: "candidate/update",
      deleteCandidate: "candidate/delete",
      getAllSkills: "skill/getAll",
      getAllExperiences: "experience/getAll",
      getAllWorkerStatuses: "workerStatus/getAll"
    }),
    ...mapMutations({
      setFetchLoading: "app/setFetchLoading",
      setLoading: "app/setLoading"
    }),
    initialize() {
      this.setFetchLoading(true);
      this.getPaginatedCandidates({
        searchString: this.search,
        pagination: this.pagination
      })
        .then(result => {
          this.candidates = result.data;
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
      this.deleteCandidate({ candidateId: this.selectedItemId })
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
      this.skills = [];
      this.experiences = [];
      this.workerStatuses = [];
    },
    submit() {
      this.$refs.obs1.validate().then(result => {
        if (result) {
          if (this.editedId !== -1) {
            this.setLoading(true);
            this.updateCandidate({
              candidateId: this.editedId,
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
              .finally(() => {
                this.setLoading(false);
              });
          } else {
            this.setLoading(true);
            this.storeCandidate({ data: this.editedItem })
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
