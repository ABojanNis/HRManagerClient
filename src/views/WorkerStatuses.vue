<template>
  <div>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <WorkerStatuses />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import WorkerStatuses from "../components/WorkerStatuses";
export default {
  components: {
    WorkerStatuses
  }
};
</script>
