<template>
    <div>
        <fieldset class="filter">
            <legend>{{ $t('global.filterBy') }}</legend>
            <div>
                <label for="country">{{ $t('global.platform') }}</label>
                <select id="country" v-model="filter.platform">
                    <option value="">{{ $t('platform.all') }}</option>
                    <option v-for="(platform) in platforms" :key="platform.id" v-bind:value="platform.id">{{ platform.libPlatform }}</option>
                </select>
            </div>
        </fieldset>
        <table class="profile-games">
            <caption class="screen-reader-text">{{ $t('global.games') }}</caption>
            <thead>
            <tr>
                <th scope="col">
                    <button class="table-order" @click="orderBy(getLibGame)">{{ $t('global.game') }}</button>
                </th>
                <th scope="col" style="width:100px;">
                    <button class="table-order" @click="orderBy('chartRank0')">{{ $t('global.medals') }}</button>
                </th>
                <th scope="col" style="width:100px;"></th>
                <th scope="col" style="width:100px;"></th>
                <th scope="col" style="width:100px;"></th>
                <th scope="col" style="width:100px;">
                    <button class="table-order" @click="orderBy('pointGame')">{{ $t('global.gamePoints') }}</button>
                </th>
                <th scope="col" style="width:100px;">
                    <button class="table-order" @click="orderBy('nbChart')">{{ $t('global.charts') }}</button>
                </th>
                <th scope="col" style="width:80px;">
                    <button class="table-order" @click="orderBy('rankPointChart')">{{ $t('global.rank') }}</button>
                </th>
            </tr>
            </thead>
            <VAsync :await="games">
                <template #pending>
                    <tbody>
                    <tr>
                        <td class="game-list__game">
                            <loading></loading>
                        </td>
                    </tr>
                    </tbody>
                </template>
                <template #resolved="games">
                    <tbody>
                    <tr v-for="item in games" :data-rank="item.rankPointChart" :key="item.id">
                        <td><game v-bind:game="item.game"></game></td>
                        <td :data-header="$t('global.medals')">
                            <span v-if="item.chartRank0 > 0" :title="$t('global.platinum')">
                                {{ item.chartRank0  }}
                                <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite platinum" aria-hidden="true" focusable="false">
                                    <use xlink:href="#medal" />
                                </svg>
                                <span class="screen-reader-text">{{ $t('global.platinum') }}</span>
                            </span>
                        </td>
                        <td :data-header="$t('global.medals')">
                            <span v-if="item.chartRank1 > 0" :title="$t('global.gold')">
                                {{ item.chartRank1 }}
                                <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite gold" aria-hidden="true" focusable="false">
                                    <use xlink:href="#medal" />
                                </svg>
                                <span class="screen-reader-text">{{ $t('global.gold') }}</span>
                            </span>
                        </td>
                        <td :data-header="$t('global.medals')">
                            <span v-if="item.chartRank2 > 0" :title="$t('global.silver')">
                                {{ item.chartRank2 }}
                                <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite silver" aria-hidden="true" focusable="false">
                                    <use xlink:href="#medal" />
                                </svg>
                                <span class="screen-reader-text">{{ $t('global.silver') }}</span>
                            </span>

                        </td>
                        <td :data-header="$t('global.medals')">
                            <span v-if="item.chartRank3 > 0" :title="$t('global.bronze')">
                                {{ item.chartRank3 }}
                                <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite bronze" aria-hidden="true" focusable="false">
                                    <use xlink:href="#medal" />
                                </svg>
                                <span class="screen-reader-text">{{ $t('global.bronze') }}</span>
                            </span>
                        </td>

                        <td :data-header="$t('global.gamePoints')">{{ item.pointGame | number }}</td>
                        <td :data-header="$t('global.charts')">{{ item.nbChart | number }} / {{ item.game.nbChart | number }}</td>
                        <td :data-header="$t('global.rank')">
                            <tools-rank v-bind:rank="item.rankPointChart" v-bind:nb-equal="item.nbEqual" v-bind:nb-item="item.game.nbPlayer" />
                        </td>
                    </tr>
                    </tbody>
                </template>
            </VAsync>
        </table>
    </div>
</template>

<script>
    import Game from '@/components/vgr/game/Game.vue';
    import PlayerGameApi from "@/services/api/vgr/PlayerGame";
    import PlatformApi from "@/services/api/vgr/Platform";
    import ToolsRank from '@/components/vgr/tools/Rank';

    export default {
        name: 'PlayerGames',
        components: {
            'game' : Game,
            'tools-rank': ToolsRank
        },
        data() {
            return {
                games: null,
                nbGame: 0,
                platforms: [],
                filter: {
                    platform: '',
                },
                order: {
                    column: 'rankPointChart',
                    direction: 'ASC',
                }
            };
        },
        watch: {
            'filter.platform' () {
                this.load();
            }
        },
        computed: {
            getLibGame() {
                if (this.$i18n.locale === 'fr') {
                    return 'game.libGameFr';
                }
                return 'game.libGameEn';
            },
        },
        created() {
            PlatformApi.getList({
                query: {
                    pagination: false,
                    'games.playerGame.player': this.$route.params.idPlayer,
                },
                cache : {useCache: true}
            })
            .then(items => {
                this.platforms = items['hydra:member']
            });
            this.order.column = this.getLibGame;
            this.load();
        },
        methods: {
            load() {
                let params = {
                    query: {
                        groups: ['game.read.mini', 'game.stats', 'playerGame.game', 'playerGame.pointChart', 'playerGame.medal'],
                        pagination: false,
                        player: this.$route.params.idPlayer,
                    }
                };

                params.query['order[' + this.order.column +']'] = this.order.direction;
                if (this.order.column === 'chartRank0') {
                    params.query['order[chartRank1]'] = this.order.direction;
                    params.query['order[chartRank2]'] = this.order.direction;
                    params.query['order[chartRank3]'] = this.order.direction;
                }

                if (this.filter.platform !== '') {
                    params.query['game.platforms'] = this.filter.platform;
                }

                if (this.order.column === 'rankPointChart') {
                    if (this.order.direction === 'ASC') {
                        params.query['order[nbEqual]'] = 'ASC';
                        params.query['order[game.nbPlayer]'] = 'DESC';
                    } else {
                        params.query['order[nbEqual]'] = 'DESC';
                        params.query['order[game.nbPlayer]'] = 'ASC';
                    }
                }

                this.games = PlayerGameApi.getList(params)
                    .then((response) => {
                        this.nbGame = response['hydra:totalItems'];
                        return response;
                    });
            },
            orderBy(column) {
                if (column !== this.order.column) {
                    this.order.column = column;
                    if (column === this.getLibGame) {
                        this.order.direction = 'ASC';
                    } else {
                        this.order.direction = 'ASC';
                    }
                } else if (this.order.direction === 'ASC') {
                    this.order.direction = 'DESC';
                } else {
                    this.order.direction = 'ASC';
                }
                this.load();
            }
        },
    };
</script>
