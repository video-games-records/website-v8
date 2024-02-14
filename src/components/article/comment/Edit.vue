<template>
  <v-sheet>
    <h3>{{ $t('article.comment.edit') }}</h3>
    <v-form id="app" @submit="submit" @submit.prevent>
      <ckeditor :editor="editor" v-model="comment.text" :config="editorConfig" minlength="4" required></ckeditor>
      <v-btn type="submit">{{ $t('tag.submit') }}</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import Ckeditor from "@/mixins/Ckeditor.vue";

export default {
  mixins: [Ckeditor],
  name: 'ArticleCommentEdit',
  components: {},
  props: {
    comment: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    submit: function () {
      /*CommentApi.put(this.comment)
          .then(response => {
            if (response.status === 200) {
              this.$parent.$parent.dialog = false;
            }
          });*/
    },
  },
};
</script>
