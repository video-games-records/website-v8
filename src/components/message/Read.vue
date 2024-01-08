<template>
  <v-sheet>
    <h2 class="screen-reader-text">{{ $t('privateMessage.message.message') }}</h2>
    <div v-if="getMessage.id">
      <v-table>
        <tr>
          <td>{{ $t('privateMessage.message.createdAt') }}</td>
          <td>
            <date v-bind:date="getMessage.createdAt"
                  v-bind:options="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }"></date>
          </td>
        </tr>
        <tr>
          <td>{{ $t('privateMessage.message.object') }}</td>
          <td>{{ getMessage.object }}</td>
        </tr>
        <tr>
          <td>{{ $t('privateMessage.message.from') }}</td>
          <td>{{ getMessage.sender.username }}</td>
        </tr>
        <tr>
          <td>{{ $t('privateMessage.message.to') }}</td>
          <td>{{ getMessage.recipient.username }}</td>
        </tr>
        <tr>
          <td colspan="2"><span v-html="getMessage.message"></span></td>
        </tr>
        <tr v-if="isReply">
          <td colspan="2">
            <message-post ref="post" v-bind:message="getMessage"></message-post>
          </td>
        </tr>
      </v-table>
    </div>
  </v-sheet>
</template>


<script>
import MessagePost from '@/components/message/Post.vue';
import Date from '@/components/tools/Date.vue';
import Security from "@/mixins/Security.vue";
import {useMessageStore} from "@/store/message";

export default {
  mixins: [Security],
  name: 'MessageRead',
  components: {
    'date': Date,
    'messagePost': MessagePost,
  },
  computed: {
    getMessage() {
      return useMessageStore().getMessage;
    },
    isReply() {
      return (this.getMessage.sender.id !== 0) && (this.getMessage.sender.id !== this.getAuthenticatedUser.id);
    }
  },
  data() {
    return {};
  },
};
</script>
