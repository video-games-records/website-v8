<template>
  <v-sheet>
    <comment v-for="comment in comments" :key="comment.id" v-bind:comment="comment"></comment>
  </v-sheet>
</template>

<script>
import Comment from '@/components/article/comment/Comment.vue';

export default {
  name: 'ArticleCommentList',
  components: {
    'comment': Comment,
  },
  props: {
    'comments': {
      type: Array,
      require: true,
    },
  },
  data() {
    return {

    };
  },
};
</script>
