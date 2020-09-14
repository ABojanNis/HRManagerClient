<template>
  <div>
    <v-card class="pa-3">
      <v-card-title class="primary mb-4">
        <v-row>
          <v-col class="text-center">
            <span class="headline white--text">{{ $t("candidate_info") }}</span>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row class="text-center">
          <v-col cols="8" offset="2">
            <span class="headline">{{ $t("candidates_modal_details") }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" offset="2">
            <span>
              {{ $t("candidates_model_name") + ":" }}
              {{
                candidate && candidate.name
                  ? candidate.name
                  : $t("not_assigned")
              }}
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" offset="2">
            <span>
              {{ $t("candidates_model_surname") + ":" }}
              {{
                candidate && candidate.surname
                  ? candidate.surname
                  : $t("not_assigned")
              }}
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" offset="2">
            <span>
              {{ $t("candidates_model_email") + ":" }}
              {{
                candidate && candidate.email
                  ? candidate.email
                  : $t("not_assigned")
              }}
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" offset="2">
            <span>
              {{ $t("candidates_model_phone") + ":" }}
              {{
                candidate && candidate.phone
                  ? candidate.phone
                  : $t("not_assigned")
              }}
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" offset="2">
            <span>
              {{ $t("candidates_model_linkedin") + ":" }}
              {{
                candidate && candidate.linkedin
                  ? candidate.linkedin
                  : $t("not_assigned")
              }}
            </span>
          </v-col>
        </v-row>
        <v-row class="mb-2">
          <v-col cols="8" offset="2">
            <span>
              {{ $t("candidates_model_city") + ":" }}
              {{
                candidate && candidate.city
                  ? candidate.city
                  : $t("not_assigned")
              }}
            </span>
          </v-col>
        </v-row>
        <v-row class="text-center">
          <v-col cols="8" offset="2">
            <span class="headline">{{ $t("candidates_modal_education") }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" offset="2">
            <span>
              {{ $t("candidates_model_education") + ":" }}
              {{
                candidate && candidate.education
                  ? candidate.education
                  : $t("not_assigned")
              }}
            </span>
          </v-col>
        </v-row>
        <v-row class="mb-2">
          <v-col cols="8" offset="2">
            <span>
              {{ $t("candidates_model_department") + ":" }}
              {{
                candidate && candidate.department
                  ? candidate.department
                  : $t("not_assigned")
              }}
            </span>
          </v-col>
        </v-row>
        <v-row class="text-center">
          <v-col cols="8" offset="2">
            <span class="headline">{{ $t("candidates_modal_skills") }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" offset="2">
            <span>
              {{ $t("candidates_model_primary_skill") + ":" }}
              {{
                candidate && candidate.primary_skill
                  ? candidate.primary_skill
                  : $t("not_assigned")
              }}
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" offset="2">
            <span>
              {{ $t("candidates_model_secondary_skill") + ":" }}
              {{
                candidate && candidate.secondary_skill
                  ? candidate.secondary_skill
                  : $t("not_assigned")
              }}
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" offset="2">
            <span>
              {{ $t("candidates_model_other_skills") + ":" }}
              {{
                candidate && candidate.other_skills
                  ? candidate.other_skills
                  : $t("not_assigned")
              }}
            </span>
          </v-col>
        </v-row>
        <v-row class="mb-2">
          <v-col cols="8" offset="2">
            <span>
              {{ $t("candidates_model_experience") + ":" }}
              {{
                candidate && candidate.experience
                  ? candidate.experience
                  : $t("not_assigned")
              }}
            </span>
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
          <v-col cols="8" offset="2">
            <span>
              {{ $t("candidates_model_status") + ":" }}
              {{
                candidate && candidate.status
                  ? candidate.status
                  : $t("not_assigned")
              }}
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" offset="2">
            <span>
              {{ $t("candidates_model_company") + ":" }}
              {{
                candidate && candidate.company
                  ? candidate.company
                  : $t("not_assigned")
              }}
            </span>
          </v-col>
        </v-row>
        <v-row class="mb-2">
          <v-col cols="8" offset="2">
            <span>
              {{ $t("candidates_model_desired_salary") + ":" }}
              {{
                candidate && candidate.desired_salary
                  ? candidate.desired_salary
                  : $t("not_assigned")
              }}
            </span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header class="text-center">
          <span class="headline">{{ $t("comments") }}</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template
            v-if="
              candidate && candidate.comments && candidate.comments.length > 0
            "
          >
            <template v-for="(comment, index) in candidate.comments">
              <div :key="index">
                <hr />
                <v-row class="align-center pa-3">
                  <span>
                    {{ comment.user.name + " " + comment.user.surname }},
                    {{ $t("candidate_created_at") + ": " }}
                    {{ comment.createdAt | moment("DD.MM.YYYY") }}
                    {{ " / " + $t("candidate_updated_at") + ": " }}
                    {{ comment.updatedAt | moment("DD.MM.YYYY") }}
                  </span>
                  <v-spacer></v-spacer>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        v-on="on"
                        small
                        class="mr-2"
                        color="indigo"
                        @click="editItem(comment._id, comment.body)"
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
                        @click="checkDelete(comment._id)"
                      >
                        mdi-delete
                      </v-icon>
                    </template>
                    <span>{{ $t("button_delete") }}</span>
                  </v-tooltip>
                </v-row>
                <v-row class="pa-3">
                  <p>{{ comment.body }}</p>
                </v-row>
              </div>
            </template>
          </template>
          <template v-else>
            <p class="subtitle-1 font-weight-bold text-center">
              {{ $t("no_comments") }}
            </p>
          </template>
          <validation-observer ref="obs1">
            <v-row class="pa-3">
              <v-col cols="12">
                <validation-provider
                  name="Comment"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-textarea
                    v-model="editedItem.body"
                    :label="
                      edit
                        ? $t('candidate_edit_comment')
                        : $t('candidate_add_new_comment')
                    "
                    :error-messages="errors"
                    outlined
                    clearable
                    auto-grow
                    @click:clear="clear"
                  ></v-textarea>
                </validation-provider>
              </v-col>
            </v-row>
          </validation-observer>
          <v-row class="justify-end mr-0">
            <v-btn color="primary" dark @click="submit" :loading="loading">
              {{
                edit
                  ? $t("candidate_edit_comment")
                  : $t("candidate_add_new_comment")
              }}
            </v-btn>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data: () => ({
    candidate: null,
    editedItem: {},
    edit: false,
    deleteDialog: false,
    selectedItemId: null
  }),
  created() {
    this.getCandidate({ candidateId: this.$route.params.id }).then(result => {
      this.candidate = result.data;
    });
  },
  computed: {
    ...mapGetters({
      user: "app/me",
      loading: "app/loading"
    })
  },
  methods: {
    ...mapActions({
      getCandidate: "candidate/getSingle",
      storeComment: "candidate/storeComment",
      updateComment: "candidate/updateComment",
      deleteComment: "candidate/deleteComment"
    }),
    ...mapMutations({
      setLoading: "app/setLoading"
    }),
    submit() {
      this.$refs.obs1.validate().then(result => {
        if (result) {
          if (this.edit) {
            this.setLoading(true);
            this.updateComment({
              commentId: this.editedItem.commentId,
              data: this.editedItem
            })
              .then(response => {
                if (response) {
                  this.$toast.show(response.message);
                  this.getCandidate({
                    candidateId: this.$route.params.id
                  }).then(result => {
                    this.candidate = result.data;
                  });
                  this.clear();
                }
              })
              .finally(() => {
                this.setLoading(false);
              });
          } else {
            this.setLoading(true);
            this.storeComment({
              candidateId: this.$route.params.id,
              data: {
                ...this.editedItem,
                user: { name: this.user.name, surname: this.user.surname }
              }
            })
              .then(response => {
                if (response) {
                  this.$toast.success(response.message);
                  this.getCandidate({
                    candidateId: this.$route.params.id
                  }).then(result => {
                    this.candidate = result.data;
                  });
                  this.clear();
                }
              })
              .finally(() => {
                this.setLoading(false);
              });
          }
        }
      });
    },
    editItem(id, body) {
      this.edit = true;
      this.editedItem = { commentId: id, body: body };
    },
    checkDelete(itemId) {
      this.selectedItemId = itemId;
      this.deleteDialog = true;
    },
    deleteItem() {
      this.setLoading(true);
      this.deleteComment({
        candidateId: this.$route.params.id,
        commentId: this.selectedItemId
      })
        .then(response => {
          if (response) {
            this.$toast.error(response.message);
            this.getCandidate({
              candidateId: this.$route.params.id
            }).then(result => {
              this.candidate = result.data;
            });
            this.deleteDialog = false;
          }
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
    clear() {
      this.edit = false;
      this.editedItem = {};
      this.$refs.obs1.reset();
    }
  }
};
</script>
