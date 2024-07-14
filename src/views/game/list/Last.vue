<template>
  <div>
    <h1>{{ $t('menu.game.last') }}</h1>

    <gameList
        v-bind:callback="this.getCallback"
        v-bind:display-charts="true"
        v-bind:display-posts="true"
        v-bind:display-players="false">
    </gameList>
  </div>
</template>

<script>
import GameList from '@/components/vgr/game/List.vue';

export default {
  name: 'GameLast',
  components: {GameList},
  computed: {
    getCallback() {
      return '/api/games?pagination=true&order[publishedAt]=DESC&groups[]=game:read&groups[]=game:platforms' +
        '&groups[]=platform:read&status=' + this.$GAME_STATUS_ACTIVE;
    },
  },
  data() {
    return {
    };
  },
  created() {
    document.title = this.$t('menu.game.last') + ' - ' + import.meta.env.VITE_APP_TITLE;
  },
}
</script>
