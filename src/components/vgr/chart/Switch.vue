<template>
    <div v-if="getLevel > 2" class="game-switch">
        <label for="chart-switch">{{ $t('aside.switch.chart') }}</label>

        <div class="game-switch__nav">
            <button v-if="this.selectedIndex > 0" v-on:click="goToPrev()">
                <span class="screen-reader-text">{{ $t('aside.switch.previousChart') }}</span>
                <svg width="16" height="16" viewBox="0 0 50 50" class="svg-sprite svg-sprite__prev" aria-hidden="true" focusable="false">
                    <use xlink:href="#arrow" />
                </svg>
            </button>

            <select id="chart-switch" v-on:change="onChange()" v-model="selected">
                <option v-for="chart in charts" :key="chart.id" v-bind:value="chart['@id']">
                    {{ chart.name }}
                </option>
            </select>

            <button v-if="this.selectedIndex < this.charts.length - 1" v-on:click="goToNext()">
                <span class="screen-reader-text">{{ $t('aside.switch.nextChart') }}</span>
                <svg width="16" height="16" viewBox="0 0 50 50" class="svg-sprite svg-sprite__next" aria-hidden="true" focusable="false">
                    <use xlink:href="#arrow" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
    import GroupApi from "@/services/api/vgr/Group";
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
    import i18n from "@/i18n";

    export default {
        mixins: [BreadcrumbsManager],
        name: 'ChartSwitch',
        components: {
        },
        data() {
            return {
                selected: '',
                selectedIndex: 0,
                charts : []
            };
        },
        computed: {
            getGroup() {
                return this.$store.getters['navigation/group'];
            },
            getChart() {
                return this.$store.getters['navigation/chart'];
            },
            getLevel() {
                return this.$store.getters['breadcrumbs/level'];
            },
            getLanguage () {
                return i18n.locale;
            },
            getLibChart() {
                if (this.$i18n.locale === 'fr') {
                    return 'libChartFr';
                }
                return 'libChartEn';
            },
        },
        methods: {
            onChange() {
                this.setSelectedIndex();
                this.goTo(this.charts[this.selectedIndex]);
            },
            goToPrev() {
                this.goTo(this.charts[this.selectedIndex - 1]);
            },
            goToNext() {
                this.goTo(this.charts[this.selectedIndex + 1]);
            },
            goTo(chart) {
                this.setBreadcrumbItem3(
                    { text: chart.name, to: {name: 'ChartIndex',params: { idChart: chart.id, slugChart: chart.slug }}}
                );
                this.$store.dispatch('navigation/setChart', chart);
                this.$router.push({ name: "ChartIndex", params: {idChart : chart.id, slugChart: chart.slug}});
            },
            loadData() {
                let params = {
                    query: {
                        pagination: false,
                    }
                };
                params.query['order[' + this.getLibChart + ']'] = 'ASC';
                GroupApi.getCharts(this.getGroup.id, params)
                    .then(charts => {
                        this.charts = charts;
                        this.setSelectedIndex();
                    });
            },
            setSelectedIndex() {
                let selected = this.selected;
                let selectedIndex = 0;

                this.charts.forEach(function (chart, index) {
                    if (chart['@id'] === selected) {
                        selectedIndex = index;
                    }
                });
                this.selectedIndex = selectedIndex;
            },
        },
        watch : {
            getLanguage() {
                this.loadData();
            },
            getGroup() {
                this.loadData();
            },
            getChart() {
                this.selected = this.getChart['@id'];
                this.setSelectedIndex();
            }
        },
        created() {
            this.loadData();
            this.selected = this.getChart['@id'];
        },
    };
</script>