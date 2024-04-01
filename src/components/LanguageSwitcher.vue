<template>
  <div>
    <v-list>
      <v-list-item>Language</v-list-item>
      <v-list-item :to="{ name: getRoute, params: { lang: 'en' }}" :disabled="(getLanguage() === 'en')">English</v-list-item>
      <v-list-item :to="{ name: getRoute, params: { lang: 'fr' }}" :disabled="(getLanguage() === 'fr')">French</v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'language-switcher',
  computed: {
    getRoute() {
      return this.$router.currentRoute.value.name;
    }
  },
  methods: {
    getLanguage() {
      return localStorage.lang;
    },
  },
};
</script>
