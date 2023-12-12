<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
    import ChartApi from '@/services/api/vgr/Chart'
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
    import i18n from "@/i18n";

    export default {
        mixins: [BreadcrumbsManager],
        name: 'ChartMain',
        components: {

        },
        data() {
            return {
                selected: ''
            };
        },
        computed: {
            getChart() {
                return this.$store.getters['navigation/chart'];
            },
            getLanguage () {
                return i18n.locale;
            },
        },
        methods: {
            setChart () {
                ChartApi.getChart(this.$route.params.idChart)
                    .then(chart => {
                        this.setBreadcrumbItem3(
                            { text: chart.name, to: {name: 'ChartIndex',params: { idChart: chart.id, slugChart: chart.slug }}}
                        );
                        this.$store.dispatch('navigation/setChart', chart);
                    });
            },
        },
        watch : {
            getLanguage() {
                this.setChart();
            },
        },
        created() {
            this.setBreadcrumbLevel(3);
            this.setChart();
        },
        updated() {
            if (this.$route.name  === 'ChartIndex') {
                this.setBreadcrumbLevel(3);
                if (this.getChart.id !== this.$route.params.idChart) {
                    this.setChart();
                }
            }
        },
    };
</script>
