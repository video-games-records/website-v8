<template>
  <div>
    <v-card class="ma-2">
      <v-card-title><span v-html="$t('proof.rules.link', [rulesLink] )"></span><br/></v-card-title>
      <v-card-item>
        {{ $t('proof.rules.reminder') }}
      </v-card-item>
    </v-card>

    <player-proof-stats v-bind:id-player="getAuthenticatedPlayer.id"/>

    <player-proof-games v-bind:id-player="getAuthenticatedPlayer.id"/>
  </div>
</template>

<script>
import PlayerProofGames from "@/components/vgr/player/proof/Games";
import PlayerProofStats from "@/components/vgr/player/proof/Stats";
import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'AccountProofs',
  components: {
    PlayerProofGames,
    PlayerProofStats
  },
  data() {
    return {};
  },
  computed: {
    rulesLink() {
      let props = this.$router.resolve({
        name: 'Rules',
      });
      return props.href;
    },
  },
};
</script>
