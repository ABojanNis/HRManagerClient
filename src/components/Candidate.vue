<template>
  <div>
    <v-card class="pa-3">
      <v-card-title class="primary mb-4">
        <v-row>
          <v-col class="text-center">
            <span class="headline white--text">Candidate info</span>
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
          <template>
            <hr />
            <v-row class="align-center pa-3">
              <span>Bojan Adamovic, 23.08.2019</span>
              <v-spacer></v-spacer>
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
            </v-row>
            <v-row class="pa-3">
              <p>Some comment</p>
            </v-row>
          </template>
          <v-row class="pa-3">
            <v-textarea outlined label="Add new comment"></v-textarea>
          </v-row>
          <v-row class="justify-end mr-0">
            <v-btn color="primary" dark>{{
              $t("candidate_add_new_comment")
            }}</v-btn>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    candidate: null
  }),
  created() {
    this.getCandidate({ candidateId: this.$route.params.id }).then(result => {
      this.candidate = result.data;
    });
  },
  methods: {
    ...mapActions({
      getCandidate: "candidate/getSingle"
    })
  }
};
</script>
