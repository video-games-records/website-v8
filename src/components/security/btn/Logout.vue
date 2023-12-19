<template>
  <div>
    <v-btn @click="logout()" icon>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </div>
</template>


<script>
import {useSecurityStore} from "@/store/security";

export default {
  created () {

  },
  methods: {
    logout () {
      useSecurityStore().logout()
    },
  },
}
</script>
