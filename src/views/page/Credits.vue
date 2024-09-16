<template>
  <div>
    <span v-html="page.text"></span>
  </div>
</template>

<script>

import WatchLanguage from "@/mixins/WatchLanguage.vue";

export default {
  mixins: [WatchLanguage],
  name: 'PageCredits',
  data() {
    return {
      page: {},
    };
  },
  created() {
    document.title = this.$t('page.credits.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    this.load();
  },
  methods: {
    load() {
      this.axios.get('api/pages' + '?slug=credits').then(response => {
        this.page = response.data['hydra:member'][0];
      })
    }
  },
};
</script>
