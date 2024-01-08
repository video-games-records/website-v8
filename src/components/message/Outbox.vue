<template>
  <v-sheet>
    <h2 class="screen-reader-text">{{ $t('privateMessage.outbox.title') }}</h2>

    <fieldset class="filter">
      <legend>{{ $t('privateMessage.filter') }}</legend>

        <v-text-field :label="$t('privateMessage.message.object')" v-model="filter.object" />

      <v-select
          :label="$t('privateMessage.message.to')"
          v-model="filter.recipient"
          :items="this.recipients"
          item-title="username"
          item-value="id" />

    </fieldset>

    <v-table>
      <caption class="screen-reader-text">{{ $t('privateMessage.outbox.caption') }}</caption>
      <thead>
      <tr>
        <td v-if="!this.$vuetify.display.mobile"></td>
        <th scope="col" >{{ $t('privateMessage.message.object') }}</th>
        <th scope="col">{{ $t('privateMessage.message.to') }}</th>
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
        <td v-if="!this.$vuetify.display.mobile"><input v-model="message.isDeletedSender" type="checkbox" value="1"></td>
        <td :data-header="$t('privateMessage.message.object')">
          <button v-on:click="setMessage(message)">{{ message.object }}</button>
        </td>
        <td :data-header="$t('privateMessage.message.to')">
          {{ message.recipient.username }}
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

  </v-sheet>
</template>

<script>
import Date from '@/components/tools/Date.vue';
import {useMessageStore} from "@/store/message";
import axios from "axios";
import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'MessageOutbox',
  components: {
    'date': Date,
  },
  data() {
    return {
      page: 1,
      length: 1,
      itemsPerPage: 10,
      messages: [],
      recipients: [],
      filter: {
        object: '',
        type: '',
        recipient: '',
      }
    };
  },
  computed: {
    getResourceUrl() {
      let url = '/api/messages?isDeletedSender=0&sender=' + this.getAuthenticatedUser.id;
      if (this.filter.object !== '') {
        url += '&object=' + this.filter.object;
      }
      if (this.filter.recipient !== '') {
        url += '&recipient=' + this.filter.recipient;
      }
      url = url + '&page=' + this.page;
      return url;
    },
    isSelectAll() {
      let bool = true;
      this.messages.forEach(function (message) {
        if (message.isDeletedSender === false) {
          bool = false;
        }
      });
      return bool;
    },
  },
  created() {
    this.axios.get('/api/messages/get-recipients')
        .then(response => {
          this.recipients = response.data['hydra:member']
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
    },
    selectAll: function () {
      this.messages.forEach(function (message) {
        message.isDeletedSender = true
      });
    },
    unselectAll: function () {
      this.messages.forEach(function (message) {
        message.isDeletedSender = false;
      });
    },
    deleteMessage: function () {
      let promises = [];
      let api = this.axios;
      this.messages.forEach(function (message) {
        if (message.isDeletedSender === true) {
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
