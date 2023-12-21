<template>
  <div>
    <span v-html="page.text"></span>
    <h2>{{ $t('page.donations.donors') }}</h2>
  </div>
</template>

<script>

export default {
  name: 'Donations',
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
    document.title = this.$t('page.donations.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    this.loadData();
  },
  methods: {
    loadData() {
      this.axios.get('api/pages' + '?slug=donations').then(response => {
        this.page = response.data['hydra:member'][0];
      })
    }
  },
};
</script>
