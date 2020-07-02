<template>
  <div>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <Candidates />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Candidates from "../components/Candidates";
export default {
  components: {
    Candidates
  }
};
</script>
