<template>
  <div>
    <h1>{{ $t('privateMessage.title') }}</h1>

    <v-row>
      <v-col cols="12">
        <message-post></message-post>
      </v-col>
      <v-col cols="12">
        <v-tabs v-model="tab" class="bg-primary">
          <v-tab value="inbox">Inbox</v-tab>
          <v-tab value="outbox">Outbox</v-tab>
          <v-tab value="read">Read</v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="inbox">
              <message-inbox></message-inbox>
            </v-window-item>
            <v-window-item value="outbox">
              <message-outbox></message-outbox>
            </v-window-item>
            <v-window-item value="read">
              <message-read></message-read>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MessageInbox from '@/components/message/Inbox.vue';
import MessageOutbox from '@/components/message/Outbox.vue';
import MessagePost from '@/components/message/Post.vue';
import MessageRead from '@/components/message/Read.vue';
import Security from "@/mixins/Security.vue";
import {useMessageStore} from "@/store/message";

export default {
  mixins: [Security],
  name: 'MessageIndex',
  components: {MessageInbox, MessageOutbox, MessagePost, MessageRead},
  data() {
    return {
    };
  },
  computed: {
    tab: {
      get: function () {
        return useMessageStore().getTab;
      },
      set: function (tab) {
        useMessageStore().setTab(tab);
      }
    },
  },
  created() {
    document.title = this.$t('privateMessage.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
  },
};
</script>
