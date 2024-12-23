<template>
  <div class="ma-5">
    <v-btn append-icon="mdi-send" @click="dialog=true">
      {{ getTitle }}
    </v-btn>

    <v-dialog v-model="dialog" width="auto" transition="dialog-bottom-transition">
      <v-card :title="$t('privateMessage.post.title')" class="ma-3 pa-2">
        <v-card-item>
          <v-form v-model="isValid" validate-on="blur" @submit.prevent @submit="submit()">
            <div v-if="this.getUserName">
              {{ this.getUserName }}
            </div>
            <v-autocomplete
              v-else
              v-model:search="searchUser"
              v-model="post.recipient"
              :rules="[rules.required]"
              :loading="loadingUser"
              :label="$t('privateMessage.message.recipient')"
              menu-icon=""
              :items="itemsUser"
              item-value="@id"
              item-title="username"
              variant="outlined"/>

            <v-text-field :label="$t('privateMessage.message.object')" v-model="post.object" :rules="[rules.required]"/>

            <ckeditor
              v-model="post.message" :editor="editor" :config="getCkeditorToolBar"
              :rules="[rules.required]" @ready="onEditorReady"
            />

            <v-btn type="submit" block class="mt-2">{{ $t('privateMessage.post.submit') }}</v-btn>
          </v-form>
        </v-card-item>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Ckeditor from "@/mixins/Ckeditor.vue";
import {useFlashMessageStore} from "@/store/base/flashMessage";
import Rules from "@/mixins/Rules.vue";

export default {
  name: 'MessagePost',
  mixins: [Ckeditor, Rules],
  props: {
    'player': {
      type: Object,
      require: false,
      default: null
    },
    'message': {
      type: Object,
      require: false,
      default: null
    },
  },
  data() {
    return {
      isValid: false,
      loadingUser: false,
      itemsUser: [],
      searchUser: null,
      selectUser: null,
      post: {
        'object': '',
        'message': '',
        'recipient': null,
      },
      dialog: false,
      init: false,
    };
  },
  computed: {
    getUserName() {
      if (this.message) {
        return this.message.sender.username
      } else if (this.player) {
        return this.player.pseudo
      } else {
        return null
      }
    },
    getTitle() {
      if (this.player && this.player.id) {
        return this.$t('privateMessage.post.writeTo') + ' ' + this.player.pseudo;
      } else if (this.message && this.message.id) {
        return this.$t('privateMessage.post.reply');
      } else {
        return this.$t('privateMessage.post.new');
      }
    },
  },
  watch: {
    searchUser(val) {
      val && val.length >= 3 && this.querySelections(val)
    },
  },
  methods: {
    querySelections(v) {
      this.loadingUser = true
      this.itemsUser = [];

      this.axios.get('/api/users/autocomplete', {params: {query: v}}).then(response => {
        this.itemsUser = response.data['hydra:member'];
        this.loadingUser = false;
      })
    },
    onEditorReady() {
      if (this.message && this.message.id) {
        this.post.object = 'RE : ' + this.message.object;
        this.post.message = '<b>[' + this.message.sender.username + ']</b><br />' + this.message.message;
        this.post.recipient = this.message.sender['@id'];
      }
      if (this.player) {
        this.post.recipient = this.player['@id'].replace('players', 'users');
      }
    },
    submit: function () {
      if (!this.isValid) return;
      this.error = null;
      if ((this.post.recipient != null) && (this.post.message != null)) {
        this.axios.post('/api/messages', this.post)
            .then(() => {
              useFlashMessageStore().confirm('OK');
              this.dialog = false;
            });
      }
    },
  },
};
</script>
