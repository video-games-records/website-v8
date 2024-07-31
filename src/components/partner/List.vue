<template>
  <v-card variant="outlined">
    <v-card-title class="bg-primary">{{ $t('footer.partners') }}</v-card-title>
    <v-card-item class="ma-0 pa-0">
      <v-list>
        <v-list-item v-for="partner in partners" :href="partner.url" :title="partner.name" />
      </v-list>
    </v-card-item>
  </v-card>
</template>

<script>

export default {
  name: 'PartnerList',
  data() {
    return {
      partners: [],
    }
  },
  created() {
    this.axios.get('/api/partners?status=ACTIVE')
        .then(response => {
          this.partners = response.data['hydra:member']
        })
  }
};
</script>
