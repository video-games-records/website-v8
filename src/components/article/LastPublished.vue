<template>
  <v-card variant="outlined">
    <v-card-title class="bg-primary">{{ $t('article.last.title') }}</v-card-title>
    <v-progress-linear v-if="articles.length === 0" indeterminate color="yellow-darken-2"></v-progress-linear>
    <v-table density="compact">
      <thead>
      <tr>
        <th scope="col">Date</th>
        <th class="right" scope="col">{{ $t('global.title') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in articles" :key="item.id">
        <td class="pr-3">
          <date v-bind:date="item.publishedAt" v-bind:options="{ month: 'long', day: 'numeric' }"></date>
        </td>
        <td class="pr-3 right">
          <router-link :to="{ name: 'ArticleIndex', params: { id: item.id, slugArticle: item.slug }}">
            {{ item.title }}
          </router-link>
          ({{ item.nbComment }})
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script>
import Date from '@/components/tools/Date.vue';
import WatchLanguage from "@/mixins/WatchLanguage.vue";

export default {
  mixins: [WatchLanguage],
  name: 'ArticleLastPublished',
  components: {
    'date': Date,
  },
  data() {
    return {
      articles: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios.get('/api/articles?status=PUBLISHED&order[publishedAt]=DESC&itemsPerPage=6', {useCache: true})
          .then(response => {
            this.articles = response.data['hydra:member']
          })
    }
  },
};
</script>


