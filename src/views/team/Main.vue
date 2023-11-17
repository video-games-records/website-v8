<template>
    <div>
        <vue-headful :title="title" :description="description" />
        <h1>{{ team.libTeam }}</h1>

        <team-profile-card v-if="team.id" v-bind:team="team" />

        <ul class="tabs">
            <li v-if="isRoute('TeamIndex')" class="tab__item tab__item--current"><span>{{ $t('team.tabs.stats') }}</span></li>
            <li v-else class="tab__item"><router-link :to="{ name: 'TeamIndex' }">{{ $t('team.tabs.stats') }}</router-link></li>

            <li v-if="isRoute('TeamPresentation')" class="tab__item tab__item--current"><span>{{ $t('team.tabs.presentation') }}</span></li>
            <li v-else class="tab__item"><router-link :to="{ name: 'TeamPresentation' }">{{ $t('team.tabs.presentation') }}</router-link></li>

            <li v-if="isRoute('TeamPlayers')" class="tab__item tab__item--current"><span>{{ $t('team.tabs.players') }}</span></li>
            <li v-else class="tab__item"><router-link :to="{ name: 'TeamPlayers' }">{{ $t('team.tabs.players') }}</router-link></li>

            <li v-if="isRoute('TeamBadges')" class="tab__item tab__item--current"><span>{{ $t('team.tabs.badges') }}</span></li>
            <li v-else class="tab__item"><router-link :to="{ name: 'TeamBadges' }">{{ $t('team.tabs.badges') }}</router-link></li>

            <li v-if="isRoute('TeamGames')" class="tab__item tab__item--current"><span>{{ $t('team.tabs.games') }}</span></li>
            <li v-else class="tab__item"><router-link :to="{ name: 'TeamGames' }">{{ $t('team.tabs.games') }}</router-link></li>

            <li v-if="isRoute('TeamLeaderboards')" class="tab__item tab__item--current"><span>{{ $t('team.tabs.leaderboards') }}</span></li>
            <li v-else class="tab__item"><router-link :to="{ name: 'TeamLeaderboards' }">{{ $t('team.tabs.leaderboards') }}</router-link></li>
        </ul>

        <router-view></router-view>
    </div>
</template>

<script>
    import TeamApi from '@/services/api/vgr/Team';
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
    import TeamProfileCard from "@/components/vgr/team/profile/Card";

    export default {
        mixins: [BreadcrumbsManager],
        name: 'TeamMain',
        components: {
            TeamProfileCard
        },
        data() {
            return {
                team: {
                    id: null,
                    libTeam: '',
                },
            };
        },
        created() {
            this.setData();
        },
        computed: {
            title() {
                return this.team.libTeam + ' - ' + process.env.VUE_APP_TITLE;
            },
            description() {
                return this.$i18n.t('team.description', [this.team.libTeam]);
            },
            getTeam() {
                return this.team;
            },
        },
        watch: {
            '$route.params.idTeam' () {
                this.setData();
                this.$forceUpdate();
            }
        },
        methods: {
            isRoute(name) {
                return this.$route.name === name;
            },
            setData () {
                TeamApi.getTeam(this.$route.params.idTeam, {query: {groups: ['team.rank.pointChart', 'team.rank.pointGame', 'team.rank.medal', 'team.rank.cup', 'team.rank.badge', 'team.players']}})
                    .then(team => {
                        this.team = team;
                        this.setBreadcrumbOnlyItem1(
                            { text: team.libTeam, to: {name: 'TeamIndex',params: { idTeam: team.id, slugTeam: team.slug }}}
                        );
                    });
            }
        },
    };
</script>
