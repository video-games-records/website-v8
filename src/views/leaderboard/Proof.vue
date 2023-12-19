<template>
    <div>
        <vue-headful :title="title" :description="description" />
        <h2>{{ $t('leaderboard.proofs.title', [100]) }}</h2>

        <leaderboard-proof v-bind:leaderboard=leaderboardPlayer></leaderboard-proof>
    </div>
</template>

<script>
    import PlayerApi from '@/services/api/vgr/Player'
    import LeaderboardProof from '@/components/vgr/player/leaderboard/Proof';
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
    import i18n from "@/i18n";

    export default {
        mixins: [BreadcrumbsManager],
        name: 'LeaderboardProof',
        components: {
            'leaderboard-proof': LeaderboardProof,
        },
        data() {
            return {
                leaderboardPlayer : PlayerApi.getRankingProof({query: {maxRank:100}})
                    .then((response) => response),
            };
        },
        computed: {
            title() {
                return this.$i18n.t('leaderboard.proofs.title', [100]) + ' - ' + process.env.VUE_APP_TITLE;
            },
            description() {
                return this.$i18n.t('leaderboard.proofs.description');
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
                    { text: this.$i18n.t('leaderboard.proofs.title', [100])}
                );
            },
        },
        created() {
            this.loadData();
        },
    };
</script>
