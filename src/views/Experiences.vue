<template>
  <div>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <Experiences />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Experiences from "../components/Experiences";
export default {
  components: {
    Experiences
  }
};
</script>
