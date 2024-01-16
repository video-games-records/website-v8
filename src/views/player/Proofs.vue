<template>
  <v-sheet>
    <v-row>
      <v-col cols="12">
        <player-proof-stats v-bind:id-player="this.$route.params.idPlayer"/>
      </v-col>
      <v-col cols="12" class="pa-0">
        <player-proof-games v-bind:id-player="this.$route.params.idPlayer"/>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import PlayerProofGames from "@/components/vgr/player/proof/Games";
import PlayerProofStats from "@/components/vgr/player/proof/Stats";

export default {
  name: 'PlayerProofs',
  components: {
    PlayerProofStats,
    PlayerProofGames,
  },
  data() {
    return {
      playerGames: null,
      nbGame: 0,
    };
  },
  computed: {
    getPlayer() {
      return this.$parent.$parent.player;
    },
  },
};
</script>
