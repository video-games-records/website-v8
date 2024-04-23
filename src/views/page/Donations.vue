<template>
  <v-row>
    <v-col cols="12" lg="12">
      <span v-html="page.text"></span>
    </v-col>
    <v-col cols="12" lg="12">
      <h2>{{ $t('page.donations.donors') }}</h2>
    </v-col>
    <v-col cols="12" lg="12">
      <v-card class="d-flex flex-wrap">
        <v-card v-for="user in donors" :data-position="user.position" :key="user.id" class="ma-5">
          <user v-bind:user="user" v-bind:showAvatar="true" />
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import User from '@/components/user/User.vue';
import WatchLanguage from "@/mixins/WatchLanguage.vue";

export default {
  mixins: [WatchLanguage],
  name: 'Donations',
  components: {User},
  data() {
    return {
      page: {},
      donors: []
    };
  },
  created() {
    document.title = this.$t('page.donations.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    this.axios.get('/api/donations-donors')
      .then(response => {
        this.donors = response.data['hydra:member']
      })
    this.load();
  },
  methods: {
    load() {
      this.axios.get('api/pages' + '?slug=donations').then(response => {
        this.page = response.data['hydra:member'][0];
      })
    }
  },
};
</script>
