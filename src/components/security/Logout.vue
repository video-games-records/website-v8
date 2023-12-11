<template>
  <div>
    <v-btn @click="logout()" append-icon="mdi-logout">
      Logout
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
