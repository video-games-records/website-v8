<template>
    <div>
        <table class="leaderboard-points-team">
            <caption class="screen-reader-text">{{ $t('leaderboard.recordPoints.captionTeam') }}</caption>
            <thead>
                <tr>
                    <th scope="col" class="leaderboard-points-team__rank">{{ $t('global.rank') }}</th>
                    <th scope="col" class="leaderboard-points-team__nickname">{{ $t('global.nickname') }}</th>
                    <th v-if="isGameRanking" scope="col" class="leaderboard-points-team__points">{{ $t('global.gamePoints') }}</th>
                    <th scope="col" class="leaderboard-points-team__points">{{ $t('global.recordPoints') }}</th>
                    <th scope="col" class="leaderboard-points-team__action"></th>
                </tr>
            </thead>
            <VAsync :await="leaderboard">
                <template #pending>
                    <tbody>
                        <tr>
                            <td colspan="5">
                                <loading></loading>
                            </td>
                            <td v-if="isGameRanking"></td>
                        </tr>
                    </tbody>
                </template>
                <template #resolved="leaderboard">
                    <tbody>
                        <tr v-for="item in leaderboard" :data-rank="item.rankPointChart" :key="item.id" :class="[isAuthenticated && getPlayer.team && getPlayer.team.id === getTeamClass(item) ? 'player--me' : 'player' ]">
                            <td class="leaderboard-points-team__rank">{{ item.rankPointChart }}</td>
                            <td v-if="item.team" class="leaderboard-points-team__nickname">
                                <team v-bind:team="item.team" v-bind:show-avatar="showAvatar"></team>
                            </td>
                            <td v-else class="leaderboard-points-team__nickname">
                                <team v-bind:team="item" v-bind:show-avatar="showAvatar"></team>
                            </td>
                            <td v-if="isGameRanking" :data-header="$t('global.gamePoints')" class="leaderboard-points-team__points">{{ item.pointGame | number }}</td>
                            <td :data-header="$t('global.recordPoints')" class="leaderboard-points-team__points">{{ item.pointChart | number }}</td>
                            <td class="leaderboard-points-team__action"><button type="button" class="button-as-link" @click="test(item)">{{ $t('global.teamRanking') }}</button></td>
                        </tr>
                    </tbody>
                </template>
            </VAsync>
        </table>

        <VDialog v-model="dialog" no-scroll bg-transition="fade">
            <h3>{{ team.libTeam }}</h3>
            <leaderboard-player-point-chart v-bind:leaderboard=leaderboardPlayer></leaderboard-player-point-chart>
            <button :aria-label="$t('dialog.close')" class="vts-dialog__close" @click="dialog = false">&times;</button>
        </VDialog>
    </div>
</template>

<script>
import Team from '@/components/vgr/team/Team.vue';
import LeaderboardPlayerPointChart from '@/components/vgr/player/leaderboard/PointChart';
import GameApi from "@/services/api/vgr/Game";
import GroupApi from "@/services/api/vgr/Group";
import ChartApi from "@/services/api/vgr/Chart";
import PlayerApi from "@/services/api/vgr/Player";
import Security from "@/mixins/Security.vue";

export default {
    mixins: [Security],
    name: 'LeaderboardPoint',
    props: {
        'leaderboard' : {
            require: true,
        },
        'showAvatar': {
            default: true,
            type: Boolean,
        },
    },
    components: {
        'Team': Team,
        'leaderboard-player-point-chart': LeaderboardPlayerPointChart,
    },
    data() {
        return {
            leaderboardPlayer: null,
            dialog: false,
            team: {
                libTeam: '',
            },
        };
    },
    computed: {
        isGameRanking() {
            return this.$route.name === 'GameIndex';
        },
    },
    methods: {
        test (item) {
            if (item.team) {
                this.team = item.team;
            } else {
                this.team = item;
            }
            this.dialog = true;
            if (this.$route.params.idChart) {
                this.leaderboardPlayer = ChartApi.getPlayerRankingPoints(this.$route.params.idChart, {query: {'idTeam': this.team.id}})
                    .then((response) => response);
            } else if (this.$route.params.idGroup) {
                this.leaderboardPlayer = GroupApi.getPlayerRankingPoints(this.$route.params.idGroup, {query: {'idTeam': this.team.id}})
                    .then((response) => response);
            } else if (this.$route.params.idGame) {
                this.leaderboardPlayer = GameApi.getPlayerRankingPoints(this.$route.params.idGame, {query: {'idTeam': this.team.id}})
                    .then((response) => response);
            } else {
                this.leaderboardPlayer = PlayerApi.getRankingPointChart({query: {'idTeam': this.team.id}})
                    .then((response) => response);
            }
        },
        getTeamClass (item) {
            if (item.team) {
                return item.team.id;
            } else {
                return item.id;
            }
        },
    },
};
</script>
