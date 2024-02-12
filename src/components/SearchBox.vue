<template>
    <v-form @submit="submit" @submit.prevent class="w200px">
      <label for="term" class="screen-reader-text">{{ $t('search.label') }}</label>
      <v-text-field v-model="term" hide-details prepend-icon="mdi-magnify"></v-text-field>
    </v-form>
</template>

<script>

export default {
  name: 'search-box',
  data() {
    return {
      term: '',
    };
  },
  methods: {
    submit() {
      if ((this.$route.name !== 'Search') || (this.$route.query.term !== this.term)) {
        this.$router.push({name: "Search", query: {term: this.term}});
      }
    },
  },
};
</script>
