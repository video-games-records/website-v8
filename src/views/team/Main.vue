<template>
  <div>
    <h1>{{ team.libTeam }}</h1>

    <team-profile-card class="ma-2" v-if="team.id" v-bind:team="team"/>

    <team-join :team="team" />

    <ul class="tabs">
      <li v-if="isRoute('Index')" class="tab__item tab__item--current"><span>{{ $t('team.tabs.stats') }}</span></li>
      <li v-else class="tab__item"><router-link :to="{ name: 'TeamIndex' }">{{ $t('team.tabs.stats') }}</router-link></li>

      <li v-if="isRoute('TeamPresentation')" class="tab__item tab__item--current"><span>{{ $t('team.tabs.presentation') }}</span></li>
      <li v-else class="tab__item"><router-link :to="{ name: 'TeamPresentation' }">{{ $t('team.tabs.presentation') }}</router-link></li>

      <li v-if="isRoute('TeamPlayers')" class="tab__item tab__item--current"><span>{{ $t('team.tabs.players') }}</span></li>
      <li v-else class="tab__item"><router-link :to="{ name: 'TeamPlayers' }">{{ $t('team.tabs.players') }}</router-link></li>

      <li v-if="isRoute('TeamBadges')" class="tab__item tab__item--current"><span>{{ $t('team.tabs.badges') }}</span></li>
      <li v-else class="tab__item"><router-link :to="{ name: 'TeamBadges' }">{{ $t('team.tabs.badges') }}</router-link></li>

      <li v-if="isRoute('TeamGames')" class="tab__item tab__item--current"><span>{{ $t('team.tabs.games') }}</span></li>
      <li v-else class="tab__item"><router-link :to="{ name: 'TeamGames' }">{{ $t('team.tabs.games') }}</router-link></li>

      <li v-if="isRoute('TeamLeaderboards')" class="tab__item tab__item--current"><span>{{ $t('team.tabs.leaderboards') }}</span></li>
      <li v-else class="tab__item"><router-link :to="{ name: 'TeamLeaderboards' }">{{ $t('team.tabs.leaderboards') }}</router-link></li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>

import TeamProfileCard from "@/components/vgr/team/profile/Card";
import TeamJoin from "@/components/vgr/team/Join.vue";
import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'TeamMain',
  components: {
    TeamJoin,
    TeamProfileCard
  },
  data() {
    return {
      team: {
        id: null,
        libTeam: '',
      },
    };
  },
  created() {
    this.load();
  },
  watch: {
    '$route.params.idTeam'() {
      if (this.$route.params.idTeam !== undefined) {
        this.load();
        this.$forceUpdate();
      }
    }
  },
  methods: {
    isRoute(name) {
      return this.$route.name.endsWith(name);
    },
    load() {
      this.axios.get(
          '/api/teams/' + this.$route.params.idTeam + '?groups[]=team.rank.pointChart&groups[]=team.rank.pointGame'
          + '&groups[]=team.rank.medal&groups[]=team.rank.cup&groups[]=team.rank.badge&groups[]=team.players')
          .then(response => {
            this.team = response.data;
            document.title = this.team.libTeam + ' - ' + import.meta.env.VITE_APP_TITLE;
          })
    }
  },
};
</script>
