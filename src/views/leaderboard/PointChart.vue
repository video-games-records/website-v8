<template>
    <div>
        <vue-headful :title="title" :description="description" />
        <h2>{{ $t('leaderboard.recordPoints.title', [100]) }}</h2>

        <p>{{ $t('leaderboard.recordPoints.help') }}</p>

        <VTabs ref="tabs" id="leaderboard">
            <template slot="Player">
                <leaderboard-player v-bind:leaderboard=leaderboardPlayer></leaderboard-player>
            </template>

            <template slot="Team">
                <leaderboard-team v-bind:leaderboard=leaderboardTeam></leaderboard-team>
            </template>
        </VTabs>
    </div>
</template>

<script>
    import PlayerApi from '@/services/api/vgr/Player'
    import TeamApi from '@/services/api/vgr/Team'
    import LeaderboardPlayer from '@/components/vgr/player/leaderboard/PointChart';
    import LeaderboardTeam from '@/components/vgr/team/leaderboard/PointChart';
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
    import i18n from "@/i18n";

    export default {
        mixins: [BreadcrumbsManager],
        name: 'LeaderboardPointChart',
        components: {
            'leaderboard-player': LeaderboardPlayer,
            'leaderboard-team': LeaderboardTeam,
        },
        data() {
            return {
                leaderboardPlayer : PlayerApi.getRankingPointChart({query: {maxRank:100}})
                    .then((response) => response),
                leaderboardTeam : TeamApi.getRankingPointChart({query: {maxRank:100}})
                    .then((response) => response),
            };
        },
        computed: {
            title() {
                return this.$i18n.t('leaderboard.recordPoints.title', [100]) + ' - ' + process.env.VUE_APP_TITLE;
            },
            description() {
                return this.$i18n.t('leaderboard.recordPoints.description');
            },
            getLanguage () {
                return i18n.locale;
            },
        },
        watch : {
            getLanguage() {
                this.loadData();
            },
        },
        methods: {
            loadData() {
                this.setBreadcrumbOnlyItem1(
                    { text: this.$i18n.t('leaderboard.recordPoints.title', [100])}
                );
            },
        },
        created() {
            this.loadData();
        },
    };
</script>
