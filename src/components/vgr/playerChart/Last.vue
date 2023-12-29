<template>
    <div class="home-player-charts">
        <h2>{{ $t('score.lastSubmit.default') }}</h2>
        <player-chart-list v-bind:nb-day="2" v-bind:items-per-page="5" v-bind:activePagination="false"></player-chart-list>
        <router-link :to="{ name: 'PlayerChartLast' }" class="home-link">{{ $t('score.lastSubmit.seeMore') }}</router-link>
    </div>
</template>

<script>
    import PlayerChartList from '@/components/vgr/playerChart/List';
    export default {
        name: 'PlayerChartLast',
        components: {
            'player-chart-list': PlayerChartList,
        },
        props: {
        },
        data() {
            return {
            };
        },
    };
</script>
