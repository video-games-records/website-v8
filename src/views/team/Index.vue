<template>
  <div v-if="this.getTeam.id" class="pa-2">
    <team-stats v-bind:team="getTeam"/>
  </div>
</template>

<script>
import TeamStats from '@/components/vgr/team/profile/Stats.vue';

export default {
  name: 'TeamIndex',
  components: { TeamStats },
  data() {
    return {};
  },
  computed: {
    getTeam() {
      return this.$parent.$parent.team;
    },
  },
};
</script>
