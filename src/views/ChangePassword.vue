<template>
  <div>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <ChangePassword />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ChangePassword from "../components/ChangePassword";
export default {
  components: {
    ChangePassword
  }
};
</script>
