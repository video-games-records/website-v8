<template>
  <div>
    <h3>{{ $t('game.rules.specific') }}</h3>

    <div v-if="getGame.rules && getGame.rules.length > 0">
      <div v-for="rule in getGame.rules" :data-position="rule.position" :key="rule.id" v-html="rule.text"/>
    </div>
    <div v-else>{{ $t('game.rules.no') }}</div>

    <h3>{{ $t('game.rules.general') }}</h3>
    <router-link :to="{ name: 'Rules'}">{{ $t('game.rules.seeGeneral') }}</router-link>
  </div>
</template>

<script>

import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";
import {useAppStore} from "@/store/app";

export default {
  name: 'GameRules',
  components: {},
  data() {
    return {};
  },
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
  },
  created() {
    useBreadcrumbsStore().setLevel(2);
    useBreadcrumbsStore().setItem2({ text: this.$t('game.rules.title') });
    this.load();
  },
};
</script>
