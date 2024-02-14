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
    <article-comment-add v-if="isAuthenticated" v-bind:article="article"></article-comment-add>
  </article>
</template>

<script>
import Date from '@/components/tools/Date.vue';
import ArticleCommentList from '@/components/article/comment/List.vue';
import ArticleCommentAdd from '@/components/article/comment/Add.vue';
import Security from "@/mixins/Security.vue";


export default {
  mixins: [Security],
  name: 'ArticleIndex',
  components: {
    'date': Date,
    ArticleCommentList,
    ArticleCommentAdd
  },
  data() {
    return {
      article: {},
      comments: [],
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
            document.title = this.article.title + ' - ' + import.meta.env.VITE_APP_TITLE;
          })

    },
    loadComments() {
      this.axios.get('/api/articles/' + this.$route.params.id + '/comments?pagination=false')
          .then(response => {
            this.comments = response.data['hydra:member'];
          })
    }
  },
};
</script>
