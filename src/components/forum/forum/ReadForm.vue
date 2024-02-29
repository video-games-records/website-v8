<template>
  <v-btn v-on:click="submit">{{ $t('forum.tag.markAllAsRead') }}</v-btn>
</template>

<script>

import {useFlashMessageStore} from "@/store/base/flashMessage";

export default {
  name: 'ReadForm',
  props: {
    idForum: {
      require: true,
    },
  },
  methods: {
    submit: function () {
      this.axios.get('/api/forum_forums/' + this.idForum + '/read')
          .then(() => useFlashMessageStore().confirm('OK'))
    },
  }
};
</script>