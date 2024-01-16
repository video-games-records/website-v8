<template>
  <v-sheet>
    <div class="message-info">
      <p>
        <strong v-html="$t('proof.rules.link', [rulesLink] )"></strong><br/>
        {{ $t('proof.rules.reminder') }}
      </p>
    </div>

    <player-proof-stats v-bind:id-player="getAuthenticatedPlayer.id"/>

    <player-proof-games v-bind:id-player="getAuthenticatedPlayer.id"/>
  </v-sheet>
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
