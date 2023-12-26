<template>
  <div>
    <h2>{{ number(getNbGame()) }} {{ $t('global.games_', getNbGame()) }}</h2>
    <gameList ref="gameList" v-bind:callback=getCallBack v-bind:display-platform="false"
              v-bind:active-order-by="true"></gameList>
  </div>
</template>

<script>
import GameList from '@/components/vgr/game/List.vue';
import { useAppStore } from '@/store/app';
import Filters from "@/mixins/Filters.vue";


export default {
  mixins: [Filters],
  name: 'PlatformIndex',
  components: {GameList},
  data() {
    return {
    };
  },
  computed: {
    /*getNbGame() {
      console.log(this.$refs.gameList);
      if (this.$refs.gameList !== undefined) {
        return this.$refs.gameList.games.length;
      } else {
        return 0;
      }
    },*/
    getCallBack() {
      return '/api/games?pagination=false&status' + this.$GAME_STATUS_ACTIVE + '&platforms=' + this.$route.params.id;
    },
  },
  methods: {
    getNbGame() {
      if (this.$refs.gameList !== undefined) {
        return this.$refs.gameList.games.length;
      }
      return 0;
    }
  }
};
</script>
