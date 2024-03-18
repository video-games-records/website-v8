<template>
  <div class="ma-5">
    <v-btn @click="dialog = true" append-icon="mdi-send">
      {{ getTitle }}
    </v-btn>

    <v-dialog width="auto" transition="dialog-bottom-transition" v-model="dialog">
        <v-card :title="$t('privateMessage.post.title')" class="ma-3 pa-2">
          <v-card-item>
            <v-form v-model="isValid" validate-on="blur" @submit.prevent @submit="submit()">
              <div v-if="this.message">
                {{ this.message.sender.username }}
              </div>
              <v-autocomplete
                  v-else
                  :rules="[rules.required]"
                  v-model="post.recipient"
                  v-model:search="searchUser"
                  :loading="loadingUser"
                  :label="$t('privateMessage.message.recipient')"
                  menu-icon=""
                  :items="itemsUser"
                  item-value="@id"
                  item-title="username"
                  variant="outlined">
              </v-autocomplete>

              <v-text-field :label="$t('privateMessage.message.object')" v-model="post.object" :rules="[rules.required]" />

              <ckeditor @ready="onEditorReady" :editor="editor" v-model="post.message"
                        :config="editorConfig" :rules="[rules.required]"></ckeditor>

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
  mixins: [Ckeditor, Rules],
  name: 'MessagePost',
  props: {
    'user': {
      type: Object,
      require: false,
    },
    'message': {
      type: Object,
      require: false,
    },
  },
  computed: {
    getTitle() {
      if (this.user && this.user.id) {
        return this.$t('privateMessage.post.writeTo') + this.user.username;
      } else if (this.message && this.message.id) {
        return this.$t('privateMessage.post.reply');
      } else {
        return this.$t('privateMessage.post.new');
      }
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
  watch: {
    searchUser (val) {
      val && val.length >= 3 && this.querySelections(val)
    },
  },
  methods: {
    querySelections (v) {
      this.loadingUser = true
      this.itemsUser = [];

      this.axios.get('/api/users/autocomplete',{params: {query: v}}).then(response => {
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
