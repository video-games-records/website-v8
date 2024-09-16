<template>
  <div>
    <span v-html="page.text"></span>
  </div>
</template>

<script>

import WatchLanguage from "@/mixins/WatchLanguage.vue";

export default {
  name: 'PageTheVgrTeam',
  mixins: [WatchLanguage],
  data() {
    return {
      page: {},
    };
  },
  created() {
    document.title = this.$t('page.theVgrTeam.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    this.load();
  },
  methods: {
    load() {
      this.axios.get('api/pages' + '?slug=the-vgr-team').then(response => {
        this.page = response.data['hydra:member'][0];
      })
    }
  },
};
</script>
