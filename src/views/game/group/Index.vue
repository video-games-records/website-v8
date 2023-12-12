<template>
    <div>
        <vue-headful :title="title" :description="description" />

        <h1 class="h2">{{ getGroup.name }}</h1>

        <div class="chart-list__actions" v-if="hasRolePlayer && getGroup.id">
            <router-link :to="{ name: 'GroupSubmit', params: { id: getGroup.id, slug: getGroup.slug }}" class="link-as-button">
                {{ $t('group.updateScores') }}
            </router-link>
        </div>

        <VTabs ref="tabs">
            <template :slot="$t('global.charts')">
                <table class="record-list">
                    <caption class="screen-reader-text">{{ $t('global.charts') }}</caption>
                    <thead>
                        <tr>
                            <th scope="col">{{ $t('global.charts') }}</th>
                            <th scope="col">{{ $t('global.scores') }}</th>
                        </tr>
                    </thead>
                    <VAsync :await="charts">
                        <template #pending>
                            <tbody>
                                <tr>
                                    <td colspan="2">
                                        <loading></loading>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                        <template #resolved="charts">
                            <tbody>
                                <tr v-for="chart in charts" :data-position="chart.position" :key="chart.id">
                                    <td><chart v-bind:chart="chart"></chart></td>
                                    <td :data-header="$t('global.scores')">{{ chart.nbPost | number }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </VAsync>
                </table>
            </template>

            <template slot="Top Score">
                <top-score v-bind:charts=topScore></top-score>
            </template>
        </VTabs>

        <div class="chart-list__actions" v-if="hasRolePlayer && getGroup.id">
            <router-link :to="{ name: 'GroupSubmit', params: { id: getGroup.id, slug: getGroup.slug }}" class="link-as-button">{{ $t('group.updateScores') }}</router-link>
        </div>

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
import GroupApi from '@/services/api/vgr/Group';
import LeaderboardPlayerPointChart from '@/components/vgr/player/leaderboard/PointChart';
import LeaderboardPlayerMedal from '@/components/vgr/player/leaderboard/Medal';
import LeaderboardTeamPointChart from '@/components/vgr/team/leaderboard/PointChart';
import LeaderboardTeamMedal from '@/components/vgr/team/leaderboard/Medal';
import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
import TopScore from "../../../components/vgr/chart/TopScore";
import Chart from '@/components/vgr/chart/Chart.vue';
import Security from "@/mixins/Security.vue";

export default {
    mixins: [BreadcrumbsManager, Security],
    name: 'GroupIndex',
    components: {
        TopScore,
        'leaderboard-player-point-chart': LeaderboardPlayerPointChart,
        'leaderboard-player-medal': LeaderboardPlayerMedal,
        'leaderboard-team-point-chart': LeaderboardTeamPointChart,
        'leaderboard-team-medal': LeaderboardTeamMedal,
        'chart' : Chart,
    },
    data() {
        return {
            charts: null,
            leaderboardPlayerPointChart : null,
            leaderboardPlayerMedal : null,
            leaderboardTeamPointChart : null,
            leaderboardTeamMedal :  null,
            topScore : null,
        };
    },
    computed: {
        title() {
            return this.getGroup.name + ' - ' + this.getGame.name + ' - ' + process.env.VUE_APP_TITLE;
        },
        description() {
            return this.$i18n.t('group.index.description') + this.getGame.name + ' ' + this.$store.getters['navigation/gamePlatformList'] + ' / ' + this.getGroup.name;
        },
        getGame() {
            return this.$store.getters['navigation/game'];
        },
        getGroup() {
            return this.$store.getters['navigation/group'];
        },
        getCharts() {
            return this.$store.getters['navigation/charts'];
        },
        getLibChart() {
            if (this.$i18n.locale === 'fr') {
                return 'libChartFr';
            }
            return 'libChartEn';
        },
    },
    methods: {
        setData () {
             let params = {
                query: {
                    pagination: false,
                }
            };
            params.query['order[' + this.getLibChart + ']'] = 'ASC';
            this.charts = GroupApi.getCharts(this.$route.params.idGroup, params)
                .then((response) => response);
            this.leaderboardPlayerPointChart = GroupApi.getPlayerRankingPoints(this.$route.params.idGroup, {query: {maxRank: 100}})
                .then((response) => response);
            this.leaderboardPlayerMedal = GroupApi.getPlayerRankingMedals(this.$route.params.idGroup, {query: {maxRank: 100}})
                .then((response) => response);
            this.leaderboardTeamPointChart = GroupApi.getTeamRankingPoints(this.$route.params.idGroup, {query: {maxRank: 100}})
                .then((response) => response);
            this.leaderboardTeamMedal = GroupApi.getTeamRankingMedals(this.$route.params.idGroup, {query: {maxRank: 100}})
                .then((response) => response);
            this.topScore = GroupApi.getTopScore(this.$route.params.idGroup)
                .then((response) => response);
        }
    },
    created() {
       this.setData();
    },
    watch: {
        '$route' () {
            this.setData();
        }
    },
};
</script>
