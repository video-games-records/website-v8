<template>
  <div>
    <span v-html="page.text"></span>
  </div>
</template>

<script>

export default {
  name: 'Credits',
  data() {
    return {
      page: {},
    };
  },
  watch: {
    /*getLanguage() {
      this.loadData();
    },*/
  },
  created() {
    document.title = this.$t('page.credits.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    this.loadData();
  },
  methods: {
    loadData() {
      this.axios.get('api/pages' + '?slug=credits').then(response => {
        this.page = response.data['hydra:member'][0];
      })
    }
  },
};
</script>
