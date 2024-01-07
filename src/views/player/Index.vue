<template>
  <v-sheet v-if="this.getPlayer.id">
    <v-row class="ma-1">
      <v-col cols="12" lg="6">
        {{ $t('stats.nbGame') }} : {{ number(getPlayer.nbGame) }} <br/>
        {{ $t('stats.nbChart') }} : {{ number(getPlayer.nbChart) }} / {{ number(getPlayer.nbChartMax) }}
        [{{ number(getChartRatio) }} %]) <br/>
        {{ $t('stats.nbChartProven') }} : {{ number(getPlayer.nbChartProven) }} / {{ number(getPlayer.nbChart) }}
        [{{ number(getProofRatio) }} %]) <br/>
        {{ $t('stats.nbChartWithPlatform') }} : {{ number(getPlayer.nbChartWithPlatform) }} /
        {{ number(getPlayer.nbChart) }} [{{ number(getChartPlatformRatio) }} %]) <br/>
        {{ $t('stats.averageRank') }} : {{ getPlayer.averageGameRank }} <br/>
      </v-col>
      <v-col cols="12" lg="6">
        <img :src="getGamercardMiniUrl" alt="Mini Gamercard"/>
        <br/>
        <img :src="getGamercardClassicUrl" alt="Classic Gamercard"/>
      </v-col>
    </v-row>

    <player-stats v-if="getPlayer.id" v-bind:player="getPlayer"/>

    <v-row>
      <v-col cols="12">
        <h5>{{ $t('score.lastSubmit.default') }}</h5>
        <player-chart-list v-if="this.getPlayer.id" :id-player="getPlayer.id" :items-per-page="5" :active-pagination="false" :active-order-by="false" :display-status="true"/>
      </v-col>
      <v-col cols="12">
        <h5>{{ $t('score.lastSubmit.proof.picture') }}</h5>
        <player-chart-list v-if="this.getPlayer.id" :id-player="getPlayer.id" :with-proof-picture="true" :items-per-page="5" :active-pagination="false" :active-order-by="false" :display-status="true"/>
      </v-col>
      <v-col cols="12">
        <h5>{{ $t('score.lastSubmit.proof.video') }}</h5>
        <player-chart-list v-if="this.getPlayer.id" :id-player="getPlayer.id" :with-proof-video="true" :items-per-page="5" :active-pagination="false" :active-order-by="false" :display-status="true"/>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="6">
        <player-stats-positions v-if="this.getPlayer.id && (this.getPlayer.createdAt < this.getNow)"
                                v-bind:id-player="$route.params.idPlayer"/>
      </v-col>
      <v-col cols="12" lg="6">
        <player-stats-medals-by-time v-if="this.getPlayer.id && (this.getPlayer.createdAt < this.getNow)"
                                     v-bind:id-player="$route.params.idPlayer"/>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import PlayerStats from '@/components/vgr/player/profile/Stats';
import PlayerStatsPositions from '@/components/vgr/player/stats/Positions';
import PlayerStatsMedalsByTime from '@/components/vgr/player/stats/MedalsByTime';
import PlayerChartList from '@/components/vgr/playerChart/List';
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Filters],
  name: 'PlayerIndex',
  components: {PlayerStats, PlayerChartList, PlayerStatsPositions, PlayerStatsMedalsByTime},
  data() {
    return {};
  },
  computed: {
    getPlayer() {
      return this.$parent.$parent.player;
    },
    getGamercardClassicUrl() {
      return import.meta.env.VITE_ROOT_API + '/gamercard/' + this.getPlayer.id + '/classic';
    },
    getGamercardMiniUrl() {
      return import.meta.env.VITE_ROOT_API + '/gamercard/' + this.getPlayer.id + '/mini';
    },
    getNow: function () {
      function pad(s) {
        return (s < 10) ? '0' + s : s;
      }

      let d = new Date();
      return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
    },
    getProofRatio: function () {
      if (this.getPlayer.nbChart === 0) return null;
      return Math.round(this.getPlayer.nbChartProven / this.getPlayer.nbChart * 10000) / 100;
    },
    getChartRatio: function () {
      if (this.getPlayer.nbChart === 0) return null;
      return Math.round(this.getPlayer.nbChart / this.getPlayer.nbChartMax * 10000) / 100;
    },
    getChartPlatformRatio: function () {
      if (this.getPlayer.nbChart === 0) return null;
      return Math.round(this.getPlayer.nbChartWithPlatform / this.getPlayer.nbChart * 10000) / 100;
    }
  },
};
</script>
