<template>
    <span v-if="team.id">
        <avatar v-if="showAvatar" v-bind:team="team"></avatar>
        [{{ team.tag }}]
        <router-link :to="{ name: 'TeamIndex', params: { idTeam: team.id, slugTeam: team.slug }}">{{
            team.libTeam
          }}</router-link>
    </span>
</template>

<script>
import Avatar from '@/components/vgr/team/Avatar.vue';

export default {
  name: 'Team',
  components: {
    'avatar': Avatar
  },
  props: {
    'team': {
      type: Object,
      require: true,
    },
    'showAvatar': {
      default: false,
      type: Boolean,
    },
  },
};
</script>
