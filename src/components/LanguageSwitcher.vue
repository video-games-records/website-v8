<template>
  <div>
    <v-list>
      <v-list-item>{{ $t('settings.language') }}</v-list-item>
      <v-list-item :to="{ name: getRoute, params: { lang: 'en' }}" :disabled="(getLanguage() === 'en')">{{ $t('language.english') }}</v-list-item>
      <v-list-item :to="{ name: getRoute, params: { lang: 'fr' }}" :disabled="(getLanguage() === 'fr')">{{ $t('language.french') }}</v-list-item>
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
