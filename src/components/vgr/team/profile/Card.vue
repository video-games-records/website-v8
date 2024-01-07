<template>
  <v-row>
    <v-col cols="12" md="1" lg="1" class="center">
      <avatar size="100px" v-bind:team="team" />
    </v-col>
    <v-col cols="12" md="6" lg="6">
      <ul>
        <li>{{ $t('team.leader') }}: <player v-bind:player="team.leader" /> </li>
        <li>{{ $t('global.createdAt') }}: <my-date v-bind:date="team.createdAt"></my-date></li>
        <li>{{ $t('team.tag') }}: {{ team.tag }}</li>
        <li>{{ number(team.nbMasterBadge) }} {{ $t('badge.type.master') }}</li>
        <li>{{ $t('stats.averageRank') }} : {{ team.averageGameRank }}</li>

      </ul>
    </v-col>
  </v-row>
</template>

<script>

import Avatar from '@/components/vgr/team/Avatar.vue';
import MyDate from '@/components/tools/Date.vue';
import Player from "@/components/vgr/player/Player";
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Filters],
  name: 'TeamProfileCard',
  props: ['team'],
  components: {Avatar, MyDate, Player},
  data() {
    return {};
  },
};
</script>
