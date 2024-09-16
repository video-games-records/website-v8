<template>
  <div>
    <span v-html="page.text"></span>
  </div>
</template>

<script>

import WatchLanguage from "@/mixins/WatchLanguage.vue";

export default {
  name: 'PageRecruitment',
  mixins: [WatchLanguage],
  data() {
    return {
      page: {},
    };
  },
  created() {
    document.title = this.$t('page.recruitment.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    this.load();
  },
  methods: {
    load() {
      this.axios.get('api/pages' + '?slug=recruitment').then(response => {
        this.page = response.data['hydra:member'][0];
      })
    }
  },
};
</script>
