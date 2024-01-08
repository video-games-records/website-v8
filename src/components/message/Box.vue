<template>
  <router-link :to="{ name: 'MessageIndex'}">
    <v-badge :content="getNbMessage">
      <v-icon icon="mdi-message-text" size="x-large"></v-icon>
      <span class="d-sr-only">{{ $t('topbar.messages', getNbMessage) }}</span>
    </v-badge>
  </router-link>
</template>

<script>
import Security from "@/mixins/Security.vue";
import {useMessageStore} from "@/store/message";

export default {
  mixins: [Security],
  name: 'MessageBox',
  computed: {
    getNbMessage() {
      return useMessageStore().getNbMessage;
    },
  },
  data() {
    return {};
  },
  created() {
    this.updateNbMessage();
    // Every 5 mins
    setInterval(() => this.updateNbMessage(), 300000);
  },
  methods: {
    updateNbMessage: function () {
      this.axios.get('/api/messages/get-nb-new-message').then(response => {
        useMessageStore().setNbMessage(response.data);
      })
    },
  },
};
</script>
