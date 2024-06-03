<template>
  <div>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn :icon="getNbMessage > 0 ? 'mdi-account-alert' : 'mdi-account-circle'" v-bind="props"></v-btn>
      </template>
      <v-list>
        <v-list-item append-icon="mdi-account" :to="{ name: 'PlayerIndex', params: { idPlayer: this.getAuthenticatedPlayer.id, slugPlayer: this.getAuthenticatedPlayer.slug }}">Profile</v-list-item>
        <v-list-item append-icon="mdi-cog" :to="{ name: 'AccountIndex'}">Account</v-list-item>
        <v-list-item :append-icon="getNbMessage > 0 ? 'mdi-message-alert' : 'mdi-message-text'" :to="{ name: 'MessageIndex'}">Messages</v-list-item>
        <v-list-item append-icon="mdi-camera" :to="{ name: 'ProofIndex'}">{{ $t('topbar.proofs') }}</v-list-item>
        <v-list-item append-icon="mdi-history" :to="{ name: 'History'}">{{ $t('history.title') }}</v-list-item>
        <v-list-item @click="logout" append-icon="mdi-logout">Logout</v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>


<script>
import Security from "@/mixins/Security.vue";
import {useSecurityStore} from "@/store/security";
import {useMessageStore} from "@/store/message";

export default {
  mixins: [Security],
  computed: {
    getNbMessage() {
      return useMessageStore().getNbMessage;
    },
  },
  methods: {
    logout () {
      useSecurityStore().logout()
    },
  },
}
</script>
