<template>
    <div>
        <vue-headful :title="title" :description="description" />

        <h1 class="h2">{{ getChart.name }}</h1>

        <VTabs ref="tabs" id="leaderboard">
            <template slot="Player">
                <div v-if="hasRolePlayer" class="chart-list__actions">
                    <router-link :to="{ name: 'ChartSubmit', params: { id: getChart.id, slug: getChart.slug }}" class="link-as-button">
                        {{ $t('chart.updateScore') }}
                    </router-link>
                </div>

                <table class="chart-list">
                    <caption class="screen-reader-text">{{ $t('global.leaderbord') }}</caption>
                    <thead>
                        <tr>
                            <th scope="col" class="chart-list__rank">{{ $t('global.rank') }}</th>
                            <th scope="col" class="chart-list__player">{{ $t('global.nickname') }}</th>
                            <th scope="col" class="chart-list__platform"></th>
                            <th scope="col" class="chart-list__points">{{ $t('global.recordPoints') }}</th>
                            <th scope="col" v-for="lib in getChart.libs" :data-position="lib.position" :key="lib.id" class="chart-list__score">{{ lib.name }}</th>
                            <th scope="col" class="chart-list__status">{{ $t('global.status') }}</th>
                        </tr>
                    </thead>
                    <VAsync :await="leaderboardPlayer">
                        <template #pending>
                            <tbody>
                                <tr>
                                    <td colspan="6">
                                        <loading></loading>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                        <template #resolved="leaderboardPlayer">
                            <tbody>
                                <tr v-for="row in leaderboardPlayer" :data-rank="row[0].rank" :key="row.id" :class="[isAuthenticated && row[0].player.id === getPlayer.id ? 'player--me' : 'player' ]">
                                    <td class="chart-list__rank">{{ row[0].rank }}</td>
                                    <td class="chart-list__player">
                                        <country v-bind:country="row[0].player.country"></country>
                                        <player v-bind:player="row[0].player" v-bind:show-avatar="showAvatar"></player>
                                    </td>
                                    <td class="chart-list__platform"><platform v-bind:platform="row[0].platform"></platform></td>
                                    <td class="chart-list__points" :data-header="$t('global.points')">
                                        {{ row[0].pointChart | number }}
                                    </td>
                                    <td v-for="value in row.values" :data-position="value.position" :key="value.id" class="chart-list__score">
                                        <router-link :to="{ name: 'PlayerChartIndex', params: { idPc: row[0].id }}">
                                            {{ value }}
                                        </router-link>
                                    </td>
                                    <td class="chart-list__status">
                                        <div class="tooltip tooltip--top-right">
                                            <button v-if="row[0].proof" type="button" class="button-as-link" @click="showProof(row[0])" :aria-labelledby="row[0].id">
                                                <status v-bind:status=row[0].status></status>
                                            </button>
                                            <router-link v-else router-link :to="{ name: 'PlayerChartIndex', params: { idPc: row[0].id }}">
                                              <button  type="button" class="button-as-link" :aria-labelledby="row[0].id">
                                                  <status v-bind:status=row[0].status></status>
                                              </button>
                                            </router-link>
                                            <div role="tooltip" :id="row[0].id">{{ row[0].status.name }}</div>
                                        </div>
                                        <last-update v-bind:player-chart=row[0]></last-update>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </VAsync>
                </table>

                <VAsync :await="leaderboardPlayer2">
                    <template #pending>
                    </template>
                    <template #resolved="leaderboardPlayer2">
                        <table class="chart-list chart-list__deactivated" v-if="leaderboardPlayer2.length > 0">
                            <caption>{{ $t('score.off') }}</caption>
                            <thead>
                                <tr>
                                    <th scope="col" class="chart-list__rank"></th>
                                    <th scope="col" class="chart-list__player">{{ $t('global.nickname') }}</th>
                                    <th scope="col" class="chart-list__platform"></th>
                                    <th scope="col" class="chart-list__points"></th>
                                    <th scope="col" v-for="lib in getChart.libs" :data-position="lib.position" :key="lib.id" class="chart-list__score">{{ lib.name }}</th>
                                    <th scope="col" class="chart-list__status">{{ $t('global.status') }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                 <tr v-for="row in leaderboardPlayer2" :data-rank="row[0].rank" :key="row.id" :class="[isAuthenticated && row[0].player.id === getPlayer.id ? 'player--me' : 'player' ]">
                                    <td class="chart-list__rank"></td>
                                    <td class="chart-list__player">
                                        <country v-bind:country="row[0].player.country"></country>
                                        <player v-bind:player="row[0].player"></player>
                                    </td>
                                    <td class="chart-list__platform"><platform v-bind:platform="row[0].platform"></platform></td>
                                    <td class="chart-list__points"></td>
                                    <td v-for="value in row.values" :data-position="value.position" :key="value.id" class="chart-list__score">
                                        <router-link :to="{ name: 'PlayerChartIndex', params: { idPc: row[0].id }}">
                                            {{ value }}
                                        </router-link>
                                    </td>
                                    <td class="chart-list__status">
                                        <button type="button" class="button-as-link" :aria-labelledby="row.id">
                                            <status v-bind:status=row[0].status></status>
                                        </button>
                                        <div class="tooltip tooltip--top-right">
                                            <div role="tooltip" :id="row[0].id">{{ row[0].status.name }}</div>
                                        </div>
                                        <last-update v-bind:player-chart=row[0]></last-update>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </template>
                </VAsync>
                
                <div v-if="hasRolePlayer" class="chart-list__actions">
                    <router-link :to="{ name: 'ChartSubmit', params: { id: getChart.id, slug: getChart.slug }}" class="link-as-button">
                        {{ $t('chart.updateScore') }}
                    </router-link>
                </div>
            </template>

            <template slot="Team">
                <leaderboard-team v-bind:leaderboard=leaderboardTeam></leaderboard-team>
            </template>
        </VTabs>

        <VDialog v-model="dialog" no-scroll bg-transition="fade">
            <proof v-bind:player-chart="playerChart"></proof>
            <button :aria-label="$t('dialog.close')" class="vts-dialog__close" @click="dialog = false">&times;</button>
        </VDialog>
    </div>
</template>

<script>
import ChartApi from '@/services/api/vgr/Chart';
import Status from '@/components/vgr/playerChart/Status.vue'
import LastUpdate from '@/components/vgr/playerChart/LastUpdate.vue';
import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
import LeaderboardTeam from '@/components/vgr/team/leaderboard/PointChart';
import Player from '@/components/vgr/player/Player.vue';
import Country from '@/components/country/Country.vue';
import Platform from '@/components/vgr/platform/Platform.vue';
import Proof from "@/components/vgr/playerChart/Proof";
import Security from "@/mixins/Security.vue";

export default {
    mixins: [BreadcrumbsManager, Security],
    name: 'ChartIndex',
    props: {
        'showAvatar': {
            default: true,
            type: Boolean,
        },
    },
    components: {
        'status': Status,
        'last-update': LastUpdate,
        'leaderboard-team': LeaderboardTeam,
        'player': Player,
        'country': Country,
        'platform': Platform,
        'proof' : Proof,
    },
    data() {
        return {
            leaderboardPlayer: null,
            leaderboardPlayer2: null,
            leaderboardTeam : null,
            dialog: false,
            playerChart: null,
        };
    },
    computed: {
        title() {
            return this.getChart.name + ' - ' + this.getGroup.name + ' - ' + this.getGame.name + ' - ' + process.env.VUE_APP_TITLE;
        },
        description() {
            return this.$i18n.t('chart.index.description') + this.getGame.name + ' ' + this.$store.getters['navigation/gamePlatformList'] + ' / ' + this.getGroup.name + ' / ' + this.getChart.name;
        },
        getGame() {
            return this.$store.getters['navigation/game'];
        },
        getGroup() {
            return this.$store.getters['navigation/group'];
        },
        getChart() {
            return this.$store.getters['navigation/chart'];
        },
    },
    created() {
        this.setData();
    },
    methods: {
        setData () {
            this.leaderboardPlayer = ChartApi.getPlayerRanking(this.$route.params.idChart)
                .then((response) => response);
            this.leaderboardPlayer2 = ChartApi.getPlayerRankingDisabled(this.$route.params.idChart)
                .then((response) => response);
            this.leaderboardTeam = ChartApi.getTeamRanking(this.$route.params.idChart)
                .then((response) => response);
        },
        showProof (playerChart) {
            this.playerChart = playerChart;
            this.dialog = true;
        },
    },
    watch: {
        '$route' () {
            this.setData();
        }
    },
};
</script>
