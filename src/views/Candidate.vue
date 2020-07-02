<template>
  <div>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <Candidate />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Candidate from "../components/Candidate";
export default {
  components: {
    Candidate
  }
};
</script>
