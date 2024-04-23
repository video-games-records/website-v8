<template>
  <div>
    <span v-html="page.text"></span>
  </div>
</template>

<script>

import WatchLanguage from "@/mixins/WatchLanguage.vue";

export default {
  mixins: [WatchLanguage],
  name: 'Faq',
  data() {
    return {
      page: {},
    };
  },
  created() {
    document.title = this.$t('page.faq.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    this.load();
  },
  methods: {
    load() {
      this.axios.get('api/pages' + '?slug=faq').then(response => {
        this.page = response.data['hydra:member'][0];
      })
    }
  },
};
</script>
