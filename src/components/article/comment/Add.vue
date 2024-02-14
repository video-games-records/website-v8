<template>
  <v-sheet>
    <h3>{{ $t('article.comment.add') }}</h3>

    <v-form @submit="submit" @submit.prevent>
      <ckeditor :editor="editor" v-model="comment.text" :config="getCkeditorToolBar" minlength="4" required></ckeditor>
      <v-btn type="submit">{{ $t('tag.submit') }}</v-btn>
    </v-form>

    <div v-if="error != null" class="row col">
      <div class="alert alert-danger">
        {{ error }}
      </div>
    </div>
  </v-sheet>
</template>

<script>
import Ckeditor from "@/mixins/Ckeditor.vue";

export default {
  mixins: [Ckeditor],
  name: 'ArticleCommentAdd',
  components: {},
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      comment: {
        text: '',
      },
      error: null,
    };
  },
  created() {

  },
  methods: {
    submit: function () {
      this.comment.article = this.article['@id'];
      this.error = null;
      if (this.comment.text !== '') {
        /*CommentApi.post(this.comment)
            .then(response => {
              if (response.status === 201) {
                this.comment.text = '';
                this.$parent.loadComments();
              }
            })
            .catch(error => {
              this.error = this.$i18n.t('error');
              if (error.response.status === 400) {
                this.error = error.response.data['hydra:description'];
              }
            });*/
      } else {
        this.error = this.$i18n.t('error');
      }
    },
  },
};
</script>
