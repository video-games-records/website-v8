<template>
  <v-sheet class="pa-4">
    <team-badge-serie v-bind:team="this.$parent.$parent.team" v-bind:id-team="this.$route.params.idTeam"/>
    <team-badge-master v-bind:team="this.$parent.$parent.team" v-bind:id-team="this.$route.params.idTeam"/>
  </v-sheet>
</template>

<script>
import TeamBadgeMaster from "@/components/vgr/team/badge/Master";
import TeamBadgeSerie from "@/components/vgr/team/badge/Serie";

export default {
  name: 'TeamBadges',
  components: {
    TeamBadgeSerie,
    TeamBadgeMaster,
  },
  data() {
    return {};
  },

};
</script>
