<template>
  <div>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <Users />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Users from "../components/Users";
export default {
  components: {
    Users
  }
};
</script>
