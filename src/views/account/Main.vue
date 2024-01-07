<template>
  <v-sheet>
    <ul class="tabs">
      <li v-if="isRoute('Index')" class="tab__item tab__item--current"><span>{{ $t('account.tabs.account') }}</span>
      </li>
      <li v-else class="tab__item">
        <router-link :to="{ name: 'AccountIndex' }">{{ $t('account.tabs.account') }}</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </v-sheet>
</template>

<script>


import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'AccountMain',
  components: {},
  data() {
    return {};
  },
  created() {
    document.title = this.$t('account.index.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
  },
  methods: {
    isRoute(name) {
      return this.$route.name.endsWith(name);
    },
  },
};
</script>
