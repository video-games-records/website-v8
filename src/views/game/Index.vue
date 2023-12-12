<template>
    <div>
        <vue-headful :title="title" :description="description" />

        <h1 class="screen-reader-text">{{ getGame.name }}</h1>

        <div class="chart-list__actions" v-if="hasRolePlayer && getGame.id">
            <router-link :to="{ name: 'GameSubmit', params: { id: getGame.id, slug: getGame.slug }}" class="link-as-button">
              {{ $t('group.updateScores') }}
            </router-link>
        </div>

        <table class="group-list">
            <caption class="screen-reader-text">{{ $t('global.charts') }}</caption>
            <thead>
                <tr>
                    <th scope="col">{{ $t('global.groups') }}</th>
                    <th scope="col">{{ $t('global.charts') }}</th>
                    <th scope="col">{{ $t('global.scores') }}</th>
                </tr>
            </thead>
            <VAsync :await="groups">
                <template #pending>
                    <tbody>
                        <tr>
                            <td colspan="3">
                                <loading></loading>
                            </td>
                        </tr>
                    </tbody>
                </template>
                <template #resolved="groups">
                    <tbody>
                        <tr v-for="group in groups" :key="group.id">
                            <td><group v-bind:group="group"></group></td>
                            <td :data-header="$t('global.charts')">{{ group.nbChart | number }}</td>
                            <td :data-header="$t('global.scores')">{{ group.nbPost | number }}</td>
                        </tr>
                    </tbody>
                </template>
            </VAsync>
        </table>

        <h2>{{ $t('global.rankings') }}</h2>

        <VTabs ref="tabs" id="leaderboard">
            <template slot="Player [Record Points]">
                <leaderboard-player-point-chart v-bind:leaderboard=leaderboardPlayerPointChart></leaderboard-player-point-chart>
            </template>

            <template slot="Player [Medals]">
                <leaderboard-player-medal v-bind:leaderboard=leaderboardPlayerMedal></leaderboard-player-medal>
            </template>

            <template slot="Team [Record Points]">
                <leaderboard-team-point-chart v-bind:leaderboard=leaderboardTeamPointChart></leaderboard-team-point-chart>
            </template>

            <template slot="Team [Medals]">
                <leaderboard-team-medal v-bind:leaderboard=leaderboardTeamMedal></leaderboard-team-medal>
            </template>
        </VTabs>

    </div>
</template>

<script>
import GameApi from '@/services/api/vgr/Game';
import LeaderboardPlayerPointChart from '@/components/vgr/player/leaderboard/PointChart';
import LeaderboardPlayerMedal from '@/components/vgr/player/leaderboard/Medal';
import LeaderboardTeamPointChart from '@/components/vgr/team/leaderboard/PointChart';
import LeaderboardTeamMedal from '@/components/vgr/team/leaderboard/Medal';
import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
import Group from '@/components/vgr/group/Group.vue'
import Security from "@/mixins/Security.vue";

export default {
    mixins: [BreadcrumbsManager, Security],
    name: 'GameIndex',
    components: {
        'leaderboard-player-point-chart': LeaderboardPlayerPointChart,
        'leaderboard-player-medal': LeaderboardPlayerMedal,
        'leaderboard-team-point-chart': LeaderboardTeamPointChart,
        'leaderboard-team-medal': LeaderboardTeamMedal,
        'group' : Group,
    },
    data() {
        return {
            groups: null,
            leaderboardPlayerPointChart : null,
            leaderboardPlayerMedal : null,
            leaderboardTeamPointChart : null,
            leaderboardTeamMedal :  null,
        };
    },
    computed: {
        title() {
            return this.getGame.name + ' - ' + process.env.VUE_APP_TITLE;
        },
        description() {
            return this.$i18n.t('game.index.description') + this.getGame.name + ' ' + this.$store.getters['navigation/gamePlatformList'];
        },
        getGame() {
            return this.$store.getters['navigation/game'];
        },
        getLibGroup() {
            if (this.$i18n.locale === 'fr') {
                return 'libGroupFr';
            }
            return 'libGroupEn';
        },
    },
    created() {
        this.setData();
    },
    watch: {
        '$route' () {
            this.setData();
        }
    },
    methods: {
        setData () {
            let params = {
                query: {
                    pagination: false,
                }
            };
            params.query['order[' + this.getLibGroup + ']'] = 'ASC';
            this.groups = GameApi.getGroups(this.$route.params.idGame, params)
                .then((response) => response);
            this.leaderboardPlayerPointChart = GameApi.getPlayerRankingPoints(this.$route.params.idGame, {query: {maxRank: 100}})
                .then((response) => response);
            this.leaderboardPlayerMedal = GameApi.getPlayerRankingMedals(this.$route.params.idGame, {query: {maxRank: 100}})
                .then((response) => response);
            this.leaderboardTeamPointChart = GameApi.getTeamRankingPoints(this.$route.params.idGame, {query: {maxRank: 100}})
                .then((response) => response);
            this.leaderboardTeamMedal = GameApi.getTeamRankingMedals(this.$route.params.idGame, {query: {maxRank: 100}})
                .then((response) => response);
        }
    },
};
</script>
