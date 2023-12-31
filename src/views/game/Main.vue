<template>
  <div>
    <v-row>
      <v-col cols="12" order="2" lg="9" order-lg="1">
        <game-card v-bind:game=getGame></game-card>
        <router-view></router-view>
      </v-col>
      <v-col cols="12" order="1" lg="3" order-lg="2">
        <game-aside />
      </v-col>
    </v-row>

  </div>
</template>

<script>
import GameCard from '@/components/vgr/game/Card.vue';
import GameAside from '@/components/vgr/game/Aside.vue';
import {useAppStore} from "@/store/app";

export default {
  name: 'GameMain',
  components: {GameCard, GameAside},
  data() {
    return {};
  },
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
  },
  created() {
    this.load();
  },
  updated() {
    if (this.$route.name === 'GameIndex') {
      if (this.getGame.id !== this.$route.params.idGame) {
        this.load();
      }
    }
  },
  methods: {
    load() {
      this.axios.get('/api/games/' + this.$route.params.idGame)
          .then(response => {

            useAppStore().setGame(response.data);
            document.title = this.getGame.name + ' - ' + import.meta.env.VITE_APP_TITLE;
          })
    },
  },
};
</script>
