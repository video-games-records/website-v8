<template>
  <v-card variant="outlined">
    <v-card-title>INFOS</v-card-title>
    <v-card-item>
      <span v-html="message.text"></span>
    </v-card-item>
  </v-card>

</template>

<script>

export default {
  name: 'HomeMessage',
  data() {
    return {
      message: {},
    };
  },

  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.axios.get('api/pages' + '?slug=home-message').then(response => {
        this.message = response.data['hydra:member'][0];
      })
    }
  },
};
</script>
