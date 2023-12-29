<template>
    <div>
        <div v-if="isLoading" aria-live="polite" aria-atomic="true">
            <loading></loading>
        </div>

        <div v-for="(chart, index) in getCharts" :data-position="chart.position" :key="index" class="submit-score__container">
            <player-chart-submit :key="chart.id" ref="playerChart" :chart="chart" :game="game" :displayGroupName="displayGroupName"></player-chart-submit>
        </div>

        <div class="submit-score__action">
            <div class="submit-score__stats">{{ $tc('score.updated', getNbChartUpdated, [getNbChartUpdated ]) }} / {{ $tc('score.toUpdate', getNbChartToUpdate, [getNbChartToUpdate]) }}</div>

            <button v-on:click="submit">{{ $t('tag.submit') }}</button>
        </div>


        <div v-if="game.rules && game.rules.length > 0" style="margin-top:10px;padding:10px;border:1px solid">
          <h3>{{ $t('game.rules.specific') }}</h3>
          <div v-for="rule in game.rules" :data-position="rule.position" :key="rule.id" v-html="rule.text" />
        </div>

    </div>
</template>

<script>
    import playerChartSubmit from '@/components/vgr/playerChart/form/Submit.vue'

    export default {
        name: 'PlayerChartList',
        components: {
            'playerChartSubmit': playerChartSubmit,
        },
        props: {
            'game': {
                type: Object,
                require: true,
            },
            'displayGroupName': {
                default: false,
                type: Boolean,
            },
        },
        data() {
            return {

            };
        },
        computed: {
            isInitialized() {
                return this.$store.getters['playerChartSubmit/isInitialized'];
            },
            isLoading() {
                return this.$store.getters['playerChartSubmit/isLoading'];
            },
            getCharts() {
                return this.$store.getters['playerChartSubmit/charts'];
            },
            getNbChartToUpdate() {
                return this.$store.getters['playerChartSubmit/nbChartToUpdate'];
            },
            getNbChartUpdated() {
                return this.$store.getters['playerChartSubmit/nbChartUpdated'];
            },
        },
        methods: {
            submit: async function () {
                await this.$store.dispatch('playerChartSubmit/reset');
                let _this = this;
                for (const index in _this.$refs.playerChart) {
                  await _this.$refs.playerChart[index].submit();
                }
                if (this.source === 'chart') {
                    this.$store.dispatch('flashMessage/confirm', 'OK');
                }
            },
        },
    };
</script>
