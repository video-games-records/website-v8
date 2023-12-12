<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
    import PlayerChartApi from "@/services/api/vgr/PlayerChart";

    export default {
        mixins: [BreadcrumbsManager],
        name: 'PlayerChartMain',
        components: {

        },
        data() {
            return {
                playerChart: {
                },
            };
        },
        computed: {
            getChart() {
                return this.$store.getters['navigation/chart'];
            },
            getPlayerChart() {
                return this.$store.getters['navigation/playerChart'];
            },
        },
        methods: {
            setPlayerChart () {
                if (this.getPlayerChart.id !== this.$route.params.idPc) {
                    PlayerChartApi.getPlayerChart(this.$route.params.idPc)
                        .then(playerChart => {
                            this.setBreadcrumbItem4(
                                { text: playerChart.player.pseudo}
                            );
                            this.$store.dispatch('navigation/setPlayerChart', playerChart);
                        });
                }
            },
        },
        created() {
            this.setBreadcrumbLevel(4);
            this.setPlayerChart();
        },
        updated() {
            if (this.$route.name  === 'ChartIndex') {
                this.setBreadcrumbLevel(4);
            }
            this.setPlayerChart();
        },
    };
</script>
