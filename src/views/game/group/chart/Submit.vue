<template>
    <div>
        <vue-headful :title="title" :description="description" />
        <player-chart-list :game="getGame"></player-chart-list>
    </div>
</template>

<script>

import ChartApi from '@/services/api/vgr/Chart'
import playerChartList from '@/components/vgr/playerChart/form/List.vue'
import BreadcrumbsManager from '@/mixins/BreadcrumbManager';

export default {
    mixins: [BreadcrumbsManager],
    name: 'ChartSubmit',
    components: {
        playerChartList
    },
    computed: {
        getIdPlayer() {
            return this.$store.getters['security/getPlayer'].id;
        },
        title() {
            return this.getChart.name + ' - ' + this.getGroup.name + ' - ' + this.getGame.name + ' - ' + process.env.VUE_APP_TITLE;
        },
        description() {
            return this.$i18n.t('chart.submit.description') + this.getGame.name + ' ' + this.$store.getters['navigation/gamePlatformList'] + ' / ' + this.getGroup.name + ' / ' + this.getChart.name;
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
    data() {
        return {
            chart: {
                group : {
                    game: {}
                },
            },
            charts: []
        };
    },
    created() {
        ChartApi.getFormData(this.$route.params.idChart)
            .then(charts => {
                 this.$store.dispatch('playerChartSubmit/setCharts', charts);
            })
        this.setBreadcrumbItem4(
            { text: this.$i18n.t('chart.updateScore') }
        );
        this.setBreadcrumbLevel(4);
    },
};
</script>
