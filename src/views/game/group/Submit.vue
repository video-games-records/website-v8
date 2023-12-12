<template>
    <div>
        <vue-headful :title="title" :description="description" />
        <player-chart-list :game="getGame"></player-chart-list>
        <paginate :resource_url="resource_url" @update="updateResource" class="pagination--bottom"></paginate>
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
                return this.getGroup.name + ' - ' + this.getGame.name + ' - ' + process.env.VUE_APP_TITLE;
            },
            description() {
                return this.$i18n.t('group.submit.description') + this.getGame.name + ' ' + this.$store.getters['navigation/gamePlatformList'] + ' / ' + this.getGroup.name;
            },
            getIdPlayer() {
                return this.$store.getters['security/getPlayer'].id;
            },
            getGame() {
                return this.$store.getters['navigation/game'];
            },
            getGroup() {
                return this.$store.getters['navigation/group'];
            },
        },
        data() {
            return {
                group: {
                    game : {},
                },
                resource_url : '',
                itemsPerPage: 50,
            };
        },
        created() {
            this.resource_url = '/api/groups/' + this.$route.params.idGroup + '/form-data?itemsPerPage='+  this.itemsPerPage;
            this.setBreadcrumbItem3(
                { text: this.$i18n.t('group.updateScores') }
            );
            this.setBreadcrumbLevel(3);
        },
        methods: {
            updateResource(data){
                this.$store.dispatch('playerChartSubmit/setCharts', data);
            },
        },
    };
</script>
