<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-translate" v-bind="props"></v-btn>
    </template>

    <v-list>
      <v-list-item @click="setLanguage('en')" :disabled="(getLanguage === 'en')">English</v-list-item>
      <v-list-item @click="setLanguage('fr')" :disabled="(getLanguage === 'fr')">French</v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'language-switcher',
  computed: {
    getLanguage() {
      return localStorage.lang;
    },
  },
  methods: {
    setLanguage(lang) {
      let name = this.$router.currentRoute.value.name;
      let params = this.$router.currentRoute.value.params;
      localStorage.lang = lang;
      params['lang'] = lang;
      this.$router.push({name: name, params: params});
    },
  },
};
</script>
