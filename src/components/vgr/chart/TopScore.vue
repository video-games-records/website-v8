<template>
    <div>
        <table class="top-score">
            <caption class="screen-reader-text">{{ $t('global.topScore') }}</caption>
            <thead>
                <tr>
                    <th scope="col" class="top-score__record">{{ $t('global.charts') }}</th>
                    <th v-if="isAuthenticated" scope="col" class="top-score__score">{{ $t('global.myScore') }}</th>
                    <th v-if="isAuthenticated" scope="col" class="top-score__rank">{{ $t('global.myRank') }}</th>
                    <th scope="col" class="top-score__top-score">{{ $t('global.topScore') }}</th>
                    <th scope="col" class="top-score__top-nickname">{{ $t('player.pseudo') }}</th>
                </tr>
            </thead>
            <VAsync :await="charts">
                <template #pending>
                    <tbody>
                        <tr>
                            <td colspan="3">
                                <loading></loading>
                            </td>
                            <td v-if="isAuthenticated" colspan="2"></td>
                        </tr>
                    </tbody>
                </template>
                <template #resolved="charts">
                    <tbody>
                        <tr v-for="chart in charts" :data-position="chart.position" :key="chart.id">
                            <td class="top-score__record"><chart v-bind:chart="chart"></chart></td>
                            <td v-if="isAuthenticated" :data-header="$t('global.myScore')" class="top-score__score">
                                <span v-if="chart.playerChartP != null">
                                    <span v-for="lib in chart.playerChartP.libs" :data-position="lib.position" :key="lib.id">
                                        {{ lib.formatValue }}
                                    </span>
                                </span>
                                <span v-else>
                                    {{ $t('noScore') }}
                                </span>
                            </td>
                            <td v-if="isAuthenticated" :data-header="$t('global.myRank')" class="top-score__rank">
                                <span v-if="chart.playerChartP != null">
                                    {{ chart.playerChartP.rank }}/{{ chart.nbPost | number }}
                                </span>
                            </td>
                            <td v-if="chart.playerChart1 != null" :data-header="$t('global.topScore')" class="top-score__top-score">
                                <span v-for="lib in chart.playerChart1.libs" :data-position="lib.position" :key="lib.id">
                                    {{ lib.formatValue }}
                                </span>
                            </td>
                            <td v-else class="top-score__top-score">
                                {{ $t('noTopScore') }}
                            </td>
                            <td v-if="chart.playerChart1 != null" :data-header="$t('player.pseudo')" class="top-score__top-nickname">
                                <player v-if="chart.playerChart1.nbEqual === 1" v-bind:player="chart.playerChart1.player"></player>
                                <span v-else>{{ chart.playerChart1.nbEqual }} {{ $t('global.players') }}</span>
                            </td>
                            <td v-else></td>
                        </tr>
                    </tbody>
                </template>
            </VAsync>
        </table>
    </div>
</template>

<script>
import Player from '@/components/vgr/player/Player.vue';
import Chart from '@/components/vgr/chart/Chart.vue';
import Security from "@/mixins/Security.vue";

export default {
    mixins: [Security],
    name: 'TopScore',
    props: ['charts'],
    components: {
        'player': Player,
        'chart' : Chart,
    },
};
</script>
