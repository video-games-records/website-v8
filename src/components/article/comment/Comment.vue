<template>
  <v-card class="ma-2">
    <v-card-title class="bg-primary">
      <date v-bind:date="comment.createdAt"
                        v-bind:options="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }"></date>

    </v-card-title>
    <v-card-item>
      <v-row>
        <v-col cols="2" lg="2">
          <avatar v-bind:user="comment.user"></avatar>
          <v-sheet class="hidden-md-and-down">{{ comment.user.username }}</v-sheet>
        </v-col>
        <v-col cols="10" lg="10">
          <div v-html="comment.text" class="message-content__text"></div>
        </v-col>
        <v-col cols="12" v-if="wasEdited">
          {{ $t('global.updatedAt') }}
          <date v-bind:date="comment.updatedAt"
                v-bind:options="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }"></date>
        </v-col>
        <v-col cols="12" class="hidden-md-and-up">
          <v-sheet class="d-flex justify-end">By {{ comment.user.username }}</v-sheet>
        </v-col>
      </v-row>
    </v-card-item>
    <v-card-actions>
      <v-btn v-if="this.isOwner" @click="showEditForm()">{{ $t('tag.edit') }}</v-btn>
    </v-card-actions>


    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="d-flex justify-center"></v-card-title>
        <v-card-item :class="this.$vuetify.display.mobile ? 'pa-1 mb-5' : 'mb-5'">
          <v-form id="app" @submit="edit" @submit.prevent>
            <ckeditor :editor="editor" v-model="comment.text" :config="getCkeditorToolBar" minlength="4" required></ckeditor>
            <v-btn type="submit">{{ $t('tag.submit') }}</v-btn>
          </v-form>
        </v-card-item>
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script>
import User from '@/components/user/User.vue';
import Date from '@/components/tools/Date.vue';
import Security from "@/mixins/Security.vue";
import Avatar from "@/components/user/Avatar.vue";
import Ckeditor from "@/mixins/Ckeditor.vue";
import {useFlashMessageStore} from "@/store/base/flashMessage";

export default {
  mixins: [Security, Ckeditor],
  name: 'Comment',
  components: { Avatar, User, 'date': Date},
  props: {
    'comment': {
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
      return (this.isAuthenticated && (this.getAuthenticatedUser.id === this.comment.user.id))
    },
    wasEdited() {
      return this.comment.createdAt !== this.comment.updatedAt;
    }
  },
  methods: {
    showEditForm() {
      this.dialog = true;
    },
    edit: function () {
      this.axios.put('/api/article_comments/' + this.comment.id, this.comment)
        .then(response => {
          useFlashMessageStore().confirm('OK');
          this.dialog = false;
        });
    }
  },
};
</script>
