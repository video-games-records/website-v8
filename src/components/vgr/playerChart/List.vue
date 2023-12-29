<template>
    <div>
        <table class="player-chart">
            <caption class="screen-reader-text">{{ $t('search.playerChart.caption') }}</caption>
            <thead>
                <tr>
                    <th scope="col" class="player-chart__score">{{ $t('global.score') }}</th>
                    <th scope="col" class="player-chart__rank">
                        <button v-if="activePagination" class="table-order" @click="orderBy('global.rank')">{{ $t('global.rank') }}</button>
                        <span v-else>{{ $t('global.rank') }}</span>
                    </th>
                    <th scope="col" class="player-chart__date">
                        <button v-if="activePagination" class="table-order" @click="orderBy('lastUpdate')">{{ $t('score.lastUpdate') }}</button>
                        <span v-else>{{ $t('score.lastUpdate') }}</span>
                    </th>
                    <th v-if="displayStatus" scope="col" class="player-chart__status">{{ $t('global.status') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="playerChart in playerCharts" :data-position="playerChart.position" :key="playerChart.id">
                    <td class="player-chart__chart">
                        <router-link :to="{
                            name: 'PlayerChartIndex',
                            params: {
                                slugGame: playerChart.chart.group.game.slug,
                                idGame: playerChart.chart.group.game.id,
                                slugGroup: playerChart.chart.group.slug,
                                idGroup: playerChart.chart.group.id,
                                slugChart: playerChart.chart.slug,
                                idChart: playerChart.chart.id,
                                idPc: playerChart.id }}">
                            <span v-for="lib in playerChart.libs" :data-position="lib.position" :key="lib.id">
                                {{ lib.formatValue }}
                            </span>
                        </router-link>
                        {{ $t('search.playerChart.on') }}
                        <chart v-bind:chart="playerChart.chart"></chart>
                    </td>
                    <td class="player-chart__rank" :data-header="$t('global.rank')">
                        <span v-if="playerChart.rank">{{ playerChart.rank }}</span>
                        <span v-else>{{ $t('search.playerChart.new') }}</span>
                    </td>
                    <td class="player-chart__date">
                        <span v-if="idPlayer == null">
                            {{ $t('global.by') }}
                            <player v-bind:player="playerChart.player"></player>
                            {{ $t('search.playerChart.on') }}
                            </span>
                        <tools-date v-bind:date="playerChart.lastUpdate" v-bind:options="{ year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }"></tools-date>
                    </td>
                    <td v-if="displayStatus" class="player-chart__status">
                        <div class="tooltip tooltip--top-right">
                            <button v-if="playerChart.proof" type="button" class="button-as-link" @click="showProof(playerChart)" :aria-labelledby="playerChart.id">
                                <status v-bind:status=playerChart.status></status>
                            </button>
                            <button v-else  type="button" class="button-as-link" :aria-labelledby="playerChart.status.id">
                                <status v-bind:status=playerChart.status></status>
                            </button>
                            <div role="tooltip" :id="playerChart.status.id">{{ playerChart.status.name }}</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <paginate ref="paginate" :resource_url="getResourceUrl" :display="this.activePagination" @update="updateResource" class="pagination--bottom"></paginate>

        <VDialog v-model="dialog" no-scroll bg-transition="fade">
            <proof v-bind:player-chart="playerChart"></proof>
            <button :aria-label="$t('dialog.close')" class="vts-dialog__close" @click="dialog = false">&times;</button>
        </VDialog>
    </div>
</template>

<script>
    import ToolsDate from '@/components/tools/Date.vue';
    import Paginate from '@/components/Paginate.vue';
    import Player from '@/components/vgr/player/Player';
    import Chart from '@/components/vgr/chart/Chart';
    import Status from '@/components/vgr/playerChart/Status.vue';
    import GameApi from "@/services/api/vgr/Game";
    import PlayerChartStatusApi from "@/services/api/vgr/PlayerChartStatus";
    import Proof from "@/components/vgr/playerChart/Proof";

    export default {
        name: 'PlayerChartList',
        components: {
            'tools-date': ToolsDate,
            'player': Player,
            'chart': Chart,
            'paginate' : Paginate,
            'status': Status,
            'proof' : Proof,
        },
        props: {
            'idPlayer': {
                require: false,
            },
            'withProofPicture': {
                default: false,
                type: Boolean,
            },
            'withProofVideo': {
                default: false,
                type: Boolean,
            },
            'game': {
                type: String,
                require: false,
            },
            'activeOrderBy': {
                default: false,
                type: Boolean,
            },
            'activePagination': {
                default: true,
                type: Boolean,
            },
            'itemsPerPage': {
                default: 20,
                type: Number,
            },
            'nbDay': {
                type: Number,
                require: false,
            },
            'displayStatus': {
                default: false,
                type: Boolean,
            },
        },
        data() {
            return {
                playerCharts: [],
                resource_url : 'api/player_charts?groups[]=playerChart.read&groups[]=playerChart.chart' +
                    '&groups[]=playerChart.player&groups[]=chart.read.mini&groups[]=player.read.mini&groups[]=group.read.mini' +
                    '&groups[]=game.read.mini&groups[]=chart.group&groups[]=group.game&groups[]=playerChartLib.format' +
                    '&groups[]=playerChart.proof&groups[]=proof.read&groups[]=picture.read&groups[]=video.read',
                order: {
                    column: 'lastUpdate',
                    direction: 'DESC',
                },
                games: [],
                statuses: [],
                dialog: false,
                playerChart: null,
            };
        },
        computed: {
            getResourceUrl() {
                let url = this.resource_url;
                url = url + '&itemsPerPage=' + this.itemsPerPage;
                if (this.nbDay) {
                    let date = new Date();
                    date.setDate(date.getDate() - this.nbDay);
                    url = url + '&lastUpdate[after]=' + date.toISOString();
                }
                if (this.idPlayer != null) {
                    url = url + '&groups[]=playerChart.status&groups[]=playerChartStatus.read&player=' + this.idPlayer;
                }
                if (this.withProofPicture === true) {
                    url = url + '&exists[proof.picture]=true';
                }
                if (this.withProofVideo === true) {
                    url = url + '&exists[proof.video]=true';
                }
                url = url + '&order[' + this.order.column + ']=' + this.order.direction;
                return url;
            },
            getLibGame() {
                if (this.$i18n.locale === 'fr') {
                    return 'libGameFr';
                }
                return 'libGameEn';
            },
        },
        created() {
            if (this.idPlayer) {
                let params = {
                    query: {
                        groups: ['game.read.mini'],
                        pagination: false,
                        status: this.$GAME_STATUS_ACTIVE,
                        'playerGame.player': this.idPlayer,
                    }
                };
                params.query['order[' + this.getLibGame +']'] = 'ASC';

                GameApi.getList(params).then(games => {
                    this.games = games;
                });
                PlayerChartStatusApi.getList().then(statuses => {
                    this.statuses = statuses;
                });
            }
        },
        methods: {
            updateResource(data){
                this.playerCharts = data
            },
            orderBy(column) {
                if (this.activeOrderBy === false) {
                    return;
                }
                if (column !== this.order.column) {
                    this.order.column = column;

                    if (column === 'translations.name') {
                        this.order.direction = 'ASC';
                    } else {
                        this.order.direction = 'ASC';
                    }
                } else if (this.order.direction === 'ASC') {
                    this.order.direction = 'DESC';
                } else {
                    this.order.direction = 'ASC';
                }
                this.$refs['paginate'].fetchData();
            },
            showProof (playerChart) {
                this.playerChart = playerChart;
                this.dialog = true;
            },
        },
    };
</script>
