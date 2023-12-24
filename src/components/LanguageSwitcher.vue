<template>
  <ul class="lang-switcher">
    <li>
      <button @click="setLanguage('en')" class="button-as-link" :disabled="(getLanguage === 'en')">English</button>
    </li>
    <li>
      <button @click="setLanguage('fr')" class="button-as-link" :disabled="(getLanguage === 'fr')">français</button>
    </li>
  </ul>
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
      params['lang'] = lang;
      this.$router.push({name: name, params: params});
      console.log(this.$router);
    },
  },
};
</script>
