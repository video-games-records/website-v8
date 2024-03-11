<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-translate" v-bind="props"></v-btn>
    </template>
    <v-list>
      <v-list-item :to="{ name: getRoute, params: { lang: 'en' }}" :disabled="(getLanguage() === 'en')">English</v-list-item>
      <v-list-item :to="{ name: getRoute, params: { lang: 'fr' }}" :disabled="(getLanguage() === 'fr')">French</v-list-item>
    </v-list>
  </v-menu>
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
