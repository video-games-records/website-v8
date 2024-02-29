<template>
  <v-card  :id="message.id" class="ma-2">
    <v-card-title class="bg-primary">
      <router-link :to="{query: {'page': message.page}, hash: '#' + message.id }"
                   @click.native="scrollFix('#' + message.id)">
        <date v-bind:date="message.createdAt"
              v-bind:options="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }"></date>
      </router-link>

    </v-card-title>
    <v-card-item>
      <v-row>
        <v-col cols="2" lg="2">
          <div v-if="displayAuthor" class="message-author">
            <user v-bind:user="message.user" v-bind:show-avatar="true"></user>
            <span class="hidden-sm-and-down">{{ number(message.user.nbForumMessage) }} {{
                $t('forum.tag.messages')
              }}</span>
          </div>
        </v-col>
        <v-col cols="10" lg="10">
          <div v-html="message.message" class="message-content__text"></div>
        </v-col>
      </v-row>
    </v-card-item>
    <v-card-actions>
      <v-btn v-if="this.isOwner && !this.readonly" @click="showEditForm()">{{ $t('tag.edit') }}</v-btn>
    </v-card-actions>
  </v-card>

  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title class="d-flex justify-center"></v-card-title>
      <v-card-item :class="this.$vuetify.display.mobile ? 'pa-1 mb-5' : 'mb-5'">
        <v-form @submit="edit" @submit.prevent>
          <ckeditor :editor="editor" v-model="message.message" :config="getCkeditorToolBar" minlength="4" required></ckeditor>
          <v-btn type="submit">{{ $t('tag.submit') }}</v-btn>
        </v-form>
      </v-card-item>
    </v-card>
  </v-dialog>
</template>

<script>
import Date from '@/components/tools/Date.vue';
import User from '@/components/user/User.vue';
import Topic from "@/components/forum/topic/Topic";
import Shortcut from '@/components/forum/topic/Shortcut.vue';
import Security from "@/mixins/Security.vue";
import Ckeditor from "@/mixins/Ckeditor.vue";
import {useFlashMessageStore} from "@/store/base/flashMessage";
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Security, Ckeditor, Filters],
  name: 'Message',
  components: {
    'date': Date,
    'user': User,
    'topic': Topic,
    'shortcut': Shortcut,
  },
  props: {
    'displayAuthor': {
      type: Boolean,
      require: false,
      default: true,
    },
    'readonly': {
      type: Boolean,
      require: false,
      default: true,
    },
    'message': {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    isOwner() {
      return (this.isAuthenticated && (this.getAuthenticatedUser.id === this.message.user.id))
    },
  },
  methods: {
    edit: function () {
      this.axios.put('/api/forum_messages/' + this.message.id, this.message)
          .then(response => {
            useFlashMessageStore().confirm('OK');
            this.dialog = false;
          });
    },
    showEditForm() {
      this.dialog = true;
    },
    scrollFix: function (hashbang) {
      window.location.hash = hashbang;
    },
  },
};
</script>


