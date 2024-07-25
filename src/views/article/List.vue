<template>
  <div>

    <h1>{{ $t('article.list.title') }}</h1>

    <v-table>
      <caption class="screen-reader-text">{{ $t('article.list.caption') }}</caption>
      <thead>
      <tr>
        <th scope="col">{{ $t('article.publishedAt') }}</th>
        <th scope="col">{{ $t('article.title') }}</th>
        <th class="hidden-sm-and-down" scope="col">{{ $t('article.publishedBy') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="article in articles" :data-position="article.position" :key="article.id">
        <td>
          <date v-bind:date="article.publishedAt"
                v-bind:options="{ month: 'long', day: 'numeric', year: 'numeric' }"></date>
        </td>
        <td>
          <router-link :to="{ name: 'ArticleIndex', params: { id: article.id, slugArticle: article.slug }}">
            {{ article.title }}
          </router-link>
          ({{ number(article.nbComment) }})
        </td>
        <td class="hidden-sm-and-down">
          <user v-bind:user="article.author"></user>
        </td>
      </tr>
      </tbody>
    </v-table>
    <v-pagination
        :density="this.$vuetify.display.mobile ? 'compact' : 'default'"
        v-model="page"
        :length="length"
        total-visible=6
        @update:modelValue="updateResource()" />
  </div>
</template>

<script>
import Date from '@/components/tools/Date.vue';
import User from "@/components/user/User";
import Filters from "@/mixins/Filters.vue";

export default {
  mixins:[Filters],
  name: 'ArticleList',
  components: {
    User,
    'date': Date,
  },
  data() {
    return {
      page: 1,
      length: 1,
      articles: [],
      itemsPerPage: 20,
    };
  },
  created() {
    this.updateResource();
    document.title = this.$t('article.list.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
  },
  computed: {
    getResourceUrl() {
      let url = '/api/articles?itemsPerPage=' + this.itemsPerPage + '&order[publishedAt]=DESC';
      // Add page
      url = url + '&page=' + this.page;
      return url;
    }
  },
  methods: {
    updateResource() {
      this.axios.get(this.getResourceUrl)
          .then(response => {
            this.articles = response.data['hydra:member'];
            this.length = Math.trunc((response.data['hydra:totalItems'] - 1) / this.itemsPerPage ) + 1;
          })
    },
  },
};
</script>
