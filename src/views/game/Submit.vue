<template>
    <div>
        <vue-headful :title="title" :description="description" />
        <div>
            <label for="term">{{ $t('search.chart') }}</label>
            <input id="term" v-model="term" type="text" :minlength="3" required />
        </div>
        <player-chart-list :game="getGame" :displayGroupName="true"></player-chart-list>
        <paginate :resource_url="getResourceUrl" @update="updateResource" class="pagination--bottom"></paginate>
    </div>
</template>

<script>
    import Paginate from '@/components/Paginate.vue'
    import playerChartList from '@/components/vgr/playerChart/form/List.vue'
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';

    export default {
        mixins: [BreadcrumbsManager],
        name: 'ChartSubmit',
        components: {
            'playerChartList': playerChartList,
            'paginate' : Paginate,
        },
        computed: {
            title() {
                return this.getGame.name + ' - ' + process.env.VUE_APP_TITLE;
            },
            description() {
                return this.$i18n.t('group.submit.description') + this.getGame.name + ' ' + this.$store.getters['navigation/gamePlatformList'];
            },
            getIdPlayer() {
                return this.$store.getters['security/getPlayer'].id;
            },
            getGame() {
                return this.$store.getters['navigation/game'];
            },
            getResourceUrl() {
                let url = '/api/games/' + this.$route.params.idGame + '/form-data?itemsPerPage=' + this.itemsPerPage;
                if (this.term !== '') {
                    url += '&term=' + this.term;
                }
                return url;
            },
        },
        data() {
            return {
                game : {},
                term: '',
                itemsPerPage: 10,
            };
        },
        created() {
            this.setBreadcrumbItem2(
                { text: this.$i18n.t('group.updateScores') }
            );
            this.setBreadcrumbLevel(2);
        },
        methods: {
            updateResource(data){
                this.$store.dispatch('playerChartSubmit/setCharts', data);
            },
        },
    };
</script>
