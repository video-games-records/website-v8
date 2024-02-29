<template>
    <span v-if="forum.id">
        <router-link :to="{ name: 'ForumIndex', params: { idForum: forum.id, slugForum: forum.slug }}">{{
            getLibForum
          }}</router-link>
    </span>
</template>

<script>
export default {
  name: 'Forum',
  props: {
    'forum': {
      type: Object,
      require: true,
    },
  },
  computed: {
    getLibForum() {
      if (this.$i18n.locale === 'fr') {
        return this.forum.libForumFr;
      }
      return this.forum.libForum;
    },
  },
};
</script>

