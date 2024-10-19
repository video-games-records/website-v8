<template>
  <v-card class="my-2" variant="outlined">
    <v-card-title class="bg-primary">{{ $t('game.rules.title') }}</v-card-title>
    <v-card-item>
      <div v-if="game.rules && game.rules.length > 0">
        <div v-for="rule in game.rules" :key="rule.id" :data-position="rule.position" v-html="rule.text" />
      </div>
      <div v-else>{{ $t('game.rules.none') }}</div>
      <router-link :to="{ name: 'Rules'}">{{ $t('game.rules.seeGeneral') }}</router-link>
    </v-card-item>
  </v-card>
</template>

<script>
export default {
  name: 'GameRulesLink',
  props: ['game'],
};
</script>

