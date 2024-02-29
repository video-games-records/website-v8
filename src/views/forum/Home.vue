<template>
  <v-sheet>
    <h1>{{ $t('forum.home.title') }}</h1>

    <v-sheet v-if="isAuthenticated" class="d-flex justify-center">
      <v-btn :to="{ name: 'ForumNotify'}">{{ $t('forum.notify.title') }}</v-btn>
    </v-sheet>

    <v-progress-linear v-if="categories.length === 0" indeterminate color="yellow-darken-2"></v-progress-linear>
    <v-sheet v-for="category in categories" :data-position="category.position" :key="category.id" class="forum-list">
      <h2>{{ category.libCategory }}</h2>
      <forum-list v-bind:forums=category.forums />
    </v-sheet>

  </v-sheet>
</template>

<script>
import ForumList from '@/components/forum/forum/List.vue';
import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'ForumHome',
  components: {
    ForumList
  },
  data() {
    return {
      categories: []
    };
  },
  computed: {
    getNow: function () {
      function pad(s) {
        return (s < 10) ? '0' + s : s;
      }

      let d = new Date();
      return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
    }
  },
  created() {
    document.title = 'Forum' + ' - ' + import.meta.env.VITE_APP_TITLE;
    this.load();
  },
  methods: {
    load() {
      this.axios.get('/api/categorie/home')
          .then(response => {
            this.categories = response.data['hydra:member'];
          })
    }
  },
};
</script>
