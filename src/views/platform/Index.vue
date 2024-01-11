<template>
  <div>

    <gameList ref="gameList" v-bind:callback=getCallBack v-bind:display-platform="false" :display-nb="true"
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
    getCallBack() {
      return '/api/games?pagination=false&status' + this.$GAME_STATUS_ACTIVE + '&platforms=' + this.$route.params.id;
    },
  },
};
</script>
