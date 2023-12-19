<template>
    <div>
        <vue-headful :title="title" :description="description" />
        <h2>{{ $t('leaderboard.cup.title', [100]) }}</h2>

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
    import LeaderboardPlayer from '@/components/vgr/player/leaderboard/Cup';
    import LeaderboardTeam from '@/components/vgr/team/leaderboard/Cup';
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
    import PlayerApi from "@/services/api/vgr/Player";
    import TeamApi from "@/services/api/vgr/Team";
    import i18n from "@/i18n";

    export default {
        mixins: [BreadcrumbsManager],
        name: 'LeaderboardCup',
        components: {
            'leaderboard-player': LeaderboardPlayer,
            'leaderboard-team': LeaderboardTeam,
        },
        data() {
            return {
                leaderboardPlayer : PlayerApi.getRankingCup({query: {maxRank:100}})
                    .then((response) => response),
                leaderboardTeam : TeamApi.getRankingCup({query: {maxRank:100}})
                    .then((response) => response),
            };
        },
        computed: {
            title() {
                return this.$i18n.t('leaderboard.cup.title', [100]) + ' - ' + process.env.VUE_APP_TITLE;
            },
            description() {
                return this.$i18n.t('leaderboard.cup.description');
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
                    { text: this.$i18n.t('leaderboard.cup.title', [100])}
                );
            },
        },
        created() {
            this.loadData();
        },
    };
</script>
