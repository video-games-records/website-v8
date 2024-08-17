<template>
  <v-card variant="outlined">
    <v-card-title class="bg-primary">Infos</v-card-title>
    <v-card-item>
      <span v-html="message.text"></span>
    </v-card-item>
  </v-card>

</template>

<script>

import WatchLanguage from "@/mixins/WatchLanguage.vue";

export default {
  mixins: [WatchLanguage],
  name: 'HomeMessage',
  data() {
    return {
      message: {},
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios.get('api/pages' + '?slug=home-message').then(response => {
        this.message = response.data['hydra:member'][0];
      })
    }
  },
};
</script>
