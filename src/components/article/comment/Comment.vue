<template>
  <div class="message">

    <div class="message-author">
      <user v-bind:user="comment.user" v-bind:show-avatar="true"></user>
    </div>
    <div class="message-content">

      <date v-bind:date="comment.createdAt"
            v-bind:options="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }"></date>
      <div v-if="this.isOwner" class="button-actions">
        <button type="button" class="button-as-link" @click="showEditForm()">{{ $t('tag.edit') }}</button>
      </div>

      <div v-html="comment.text" class="message-content__text"></div>

      <div v-if="wasEdited">
        {{ $t('global.updatedAt') }}
        <date v-bind:date="comment.updatedAt"
              v-bind:options="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }"></date>
      </div>
    </div>

    <VDialog v-model="dialog" no-scroll bg-transition="fade">
      <article-comment-edit :comment="this.comment"></article-comment-edit>
      <button :aria-label="$t('dialog.close')" class="vts-dialog__close" @click="dialog = false">&times;</button>
    </VDialog>
  </div>
</template>

<script>
import User from '@/components/user/User.vue';
import Date from '@/components/tools/Date.vue';
import ArticleCommentEdit from "@/components/article/comment/Edit.vue";
import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'Comment',
  components: {
    'user': User,
    'date': Date,
    ArticleCommentEdit,
  },
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
  },
};
</script>
