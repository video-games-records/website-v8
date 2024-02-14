<template>
  <article>
    <h1>{{ article.title }}</h1>
    <header class="article__header">
      {{ $t('article.publishedBy') }} <span v-if="article.author">{{ article.author.username }}</span>
      {{ $t('article.publishedOn') }}
      <date v-bind:date="article.publishedAt"
            v-bind:options="{ year: 'numeric', month: 'long', day: 'numeric' }"></date>
    </header>
    <div v-html="article.text"></div>
    <article-comment-list v-bind:comments="comments"></article-comment-list>

    <v-sheet v-if="this.isAuthenticated">
      <h3>{{ $t('article.comment.add') }}</h3>
      <v-form @submit="post" @submit.prevent>
        <ckeditor :editor="editor" v-model="comment.text" :config="getCkeditorToolBar" required :rules="[rules.required]"></ckeditor>
        <v-btn type="submit">{{ $t('tag.submit') }}</v-btn>
      </v-form>
    </v-sheet>
  </article>
</template>

<script>
import Date from '@/components/tools/Date.vue';
import ArticleCommentList from '@/components/article/comment/List.vue';
import Security from "@/mixins/Security.vue";
import Ckeditor from "@/mixins/Ckeditor.vue";
import rules from "@/mixins/Rules.vue";


export default {
  mixins: [Security, Ckeditor, rules],
  name: 'ArticleIndex',
  components: {
    'date': Date,
    ArticleCommentList,
  },
  data() {
    return {
      article: {},
      comments: [],
      comment: {

        text: '',
      },
    };
  },
  created() {
    this.load();
    this.loadComments();
  },
  methods: {
    load() {
      this.axios.get('/api/articles/' + this.$route.params.id)
          .then(response => {
            this.article = response.data;
            this.comment.article = this.article['@id'];
            document.title = this.article.title + ' - ' + import.meta.env.VITE_APP_TITLE;
          })

    },
    loadComments() {
      this.axios.get('/api/articles/' + this.$route.params.id + '/comments?pagination=false')
          .then(response => {
            this.comments = response.data['hydra:member'];
          })
    },
    post: function () {
      if (this.comment.text !== '') {
        this.axios.post('/api/article_comments', this.comment)
          .then(response => {
            this.comment.text = '';
            this.comments.push(response.data);
          });
      }
    }
  },
};
</script>
