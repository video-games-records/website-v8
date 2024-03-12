<template>
  <div>
    <h2 class="screen-reader-text">{{ $t('privateMessage.inbox.title') }}</h2>

    <fieldset class="filter">
      <legend>{{ $t('privateMessage.filter') }}</legend>

      <v-select
          :label="$t('privateMessage.message.type')"
          v-model="filter.type"
          :items="this.types"
          item-title="name"
          item-value="value" />

      <v-text-field :label="$t('privateMessage.message.object')" v-model="filter.object" />

      <v-select
        :label="$t('privateMessage.message.from')"
        v-model="filter.sender"
        :items="this.senders"
        item-title="username"
        item-value="id" />

    </fieldset>

    <v-table class="private-message">
      <caption class="screen-reader-text">{{ $t('privateMessage.inbox.caption') }}</caption>
      <thead>
      <tr>
        <td v-if="!this.$vuetify.display.mobile"></td>
        <th scope="col">{{ $t('privateMessage.message.object') }}</th>
        <th scope="col">{{ $t('privateMessage.message.from') }}</th>
        <th scope="col">{{ $t('privateMessage.message.createdAt') }}</th>
      </tr>
      </thead>
      <tfoot v-if="!this.$vuetify.display.mobile">
      <tr>
        <td colspan="4">
          <v-btn v-if="isSelectAll === false" @click="selectAll()">{{ $t('privateMessage.selectAll') }}</v-btn>
          <v-btn v-else @click="unselectAll()">{{ $t('privateMessage.unselectAll') }}</v-btn>
          <v-btn @click="deleteMessage()">{{ $t('privateMessage.delete') }}</v-btn>
        </td>
      </tr>
      </tfoot>
      <tbody>
      <tr v-for="message in messages" :data-position="message.position" :key="message.id">
        <td v-if="!this.$vuetify.display.mobile"><input v-model="message.isDeletedRecipient" type="checkbox" value="1">
        </td>
        <td :data-header="$t('privateMessage.message.object')">
          <v-icon v-if="message.isOpened === false" icon="mdi-new-box" />
          <span v-if="message.isOpened === false" class="screen-reader-text">{{ $t('privateMessage.newMessage') }}</span>
          <button v-on:click="setMessage(message)">{{ message.object }}</button>
        </td>
        <td :data-header="$t('privateMessage.message.from')">
          {{ message.sender.username }}
        </td>
        <td :data-header="$t('privateMessage.message.createdAt')">
          <date v-bind:date="message.createdAt"
                v-bind:options="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }"></date>
        </td>
      </tr>
      </tbody>
    </v-table>

    <v-pagination
        :density="this.$vuetify.display.mobile ? 'compact' : 'default'"
        v-model="page"
        :length="length"
        total-visible=6
        @update:modelValue="updateResource()" />

  </div>
</template>


<script>
import Date from '@/components/tools/Date.vue';
import {useMessageStore} from "@/store/message";
import axios from "axios";
import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'MessageInbox',
  components: {'date': Date,
  },
  data() {
    return {
      page: 1,
      length: 1,
      itemsPerPage: 10,
      messages: [],
      senders: [],
      types: [
        {value:'DEFAULT', name: this.$t('privateMessage.type.DEFAULT')},
        {value:'VGR_PROOF_ACCEPTED', name: this.$t('privateMessage.type.VGR_PROOF_ACCEPTED')},
        {value:'VGR_PROOF_REFUSED', name: this.$t('privateMessage.type.VGR_PROOF_REFUSED')},
        {value:'VGR_PROOF_REQUEST_ACCEPTED', name: this.$t('privateMessage.type.VGR_PROOF_REQUEST_ACCEPTED')},
        {value:'VGR_PROOF_REQUEST_REFUSED', name: this.$t('privateMessage.type.VGR_PROOF_REQUEST_REFUSED')},
        {value:'FORUM_NOTIF', name: this.$t('privateMessage.type.FORUM_NOTIF')},
      ],
      filter: {
        object: '',
        type: '',
        sender: '',
      }
    };
  },
  computed: {
    getResourceUrl() {
      let url = '/api/messages?isDeletedRecipient=0&recipient=' + this.getAuthenticatedUser.id;
      if (this.filter.type !== '') {
        url += '&type=' + this.filter.type;
      }
      if (this.filter.object !== '') {
        url += '&object=' + this.filter.object;
      }
      if (this.filter.sender !== '') {
        url += '&sender=' + this.filter.sender;
      }
      url = url + '&page=' + this.page;
      return url;
    },
    isSelectAll() {
      let bool = true;
      this.messages.forEach(function (message) {
        if (message.isDeletedRecipient === false) {
          bool = false;
        }
      });
      return bool;
    },
  },
  created() {
    this.axios.get('/api/messages/get-senders')
        .then(response => {
          this.senders = response.data['hydra:member']
        });
    this.updateResource();
  },
  watch : {
    getResourceUrl () {
      this.updateResource()
    }
  },
  methods: {
    updateResource() {
      this.axios.get(this.getResourceUrl)
          .then(response => {
            this.messages = response.data['hydra:member'];
            this.length = Math.trunc(response.data['hydra:totalItems'] / this.itemsPerPage - 1) + 1;
          })
    },
    setMessage: function (message) {
      useMessageStore().setMessage(message);
      useMessageStore().setTab('read');
      if (message.isOpened === false) {
        useMessageStore().decrement();
        message.isOpened = true;
        this.axios.put('/api/messages/' + message.id, message);
      }
    },
    selectAll: function () {
      this.messages.forEach(function (message) {
        message.isDeletedRecipient = true
      });
    },
    unselectAll: function () {
      this.messages.forEach(function (message) {
        message.isDeletedRecipient = false;
      });
    },
    deleteMessage: function () {
      let promises = [];
      let api = this.axios;
      this.messages.forEach(function (message) {
        if (message.isDeletedRecipient === true) {
          promises.push(api.put('/api/messages/' + message.id, message));
        }
      });
      axios.all(promises)
          .then(() => {
            this.updateResource();
            //this.$store.dispatch('message/loadNbMessage', this.$store.getters['security/getUser'].id);
          });
    }
  },
};
</script>
