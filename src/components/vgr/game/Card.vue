<template>
  <v-row v-if="game">
    <v-col cols="12" lg="2" md="2" class="d-flex justify-center">
      <router-link v-if="game.picture" :to="{ name: 'GameIndex', params: { idGame: game.id, slugGame: game.slug } }"
                   class="game-card__cover">
        <img v-bind:src="getPicture" alt="" width="198" height="100" aria-hidden="true"/>
      </router-link>
    </v-col>

    <v-col cols="12" lg="9" md="9">
      <div class="h1">{{ game.name }}</div>
      <platform-list v-bind:platforms="game.platforms"></platform-list>
      <ul class="pa-0">
        <li class="d-inline ma-2">
          <router-link :to="{ name: 'GameRules' }">
            <span v-if="game.rules && game.rules.length > 0">{{ $t('menu.rules') }}</span>
            <span v-else>{{ $t('menu.rules') }}</span>
          </router-link>
        </li>
        <li v-if="game.serie && game.serie.status.isActive" class="d-inline ma-2">
          <router-link :to="{ name: 'SerieIndex',params: { id: game.serie.id, slugSerie: game.serie.slug }}">
            {{ $t('Serie') }}: {{ game.serie.name }}
          </router-link>
        </li>
        <li v-if="isSmartphone" class="d-inline ma-2">
          <a v-if="game.downloadUrl" :href="game.downloadUrl">{{ $t('game.download.URL') }}</a>
          <span v-else>{{ $t('game.download.message') }}</span>
        </li>
      </ul>
    </v-col>
  </v-row>
</template>

<script>
import PlatformList from '@/components/vgr/platform/List.vue';
import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'GameCard',
  props: ['game'],
  components: {PlatformList},
  computed: {
    getPicture() {
      return import.meta.env.VITE_ROOT_API+ '/game/' + this.game.id + '/picture';
    },
    isSmartphone() {
      let value = false;
      this.game.platforms.forEach(function (platform) {
        if ((platform.slug === 'ios') || (platform.slug === 'android')) {
          value = true;
        }
      });
      return value;
    }
  },
};
</script>

<style scoped>
.h1 {
  font-size: 1.8em;
}
</style>
