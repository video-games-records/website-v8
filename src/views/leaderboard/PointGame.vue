<template>
    <div>
        <vue-headful :title="title" :description="description" />

        <h2>{{ $t('leaderboard.gamePoints.title', [100]) }}</h2>

        <p>{{ $t('leaderboard.gamePoints.help') }}</p>

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
    import LeaderboardPlayer from '@/components/vgr/player/leaderboard/PointGame';
    import LeaderboardTeam from '@/components/vgr/team/leaderboard/PointGame';
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
    import PlayerApi from "@/services/api/vgr/Player";
    import TeamApi from "@/services/api/vgr/Team";
    import i18n from "@/i18n";

    export default {
        mixins: [BreadcrumbsManager],
        name: 'LeaderboardPointGame',
        components: {
            'leaderboard-player': LeaderboardPlayer,
            'leaderboard-team': LeaderboardTeam,
        },
        data() {
            return {
                leaderboardPlayer : PlayerApi.getRankingPointGame({query: {maxRank:100}})
                    .then((response) => response),
                leaderboardTeam : TeamApi.getRankingPointGame({query: {maxRank:100}})
                    .then((response) => response),
            };
        },
        computed: {
            title() {
                return this.$i18n.t('leaderboard.gamePoints.title', [100]) + ' - ' + process.env.VUE_APP_TITLE;
            },
            description() {
                return this.$i18n.t('leaderboard.gamePoints.description');
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
                    { text: this.$i18n.t('leaderboard.gamePoints.title', [100])}
                );
            },
        },
        created() {
            this.loadData();
        },
    };
</script>
