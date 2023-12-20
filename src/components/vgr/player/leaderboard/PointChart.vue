<template>
    <table class="leaderboard-points-game">
        <caption class="screen-reader-text">{{ $t('leaderboard.recordPoints.caption') }}</caption>
        <thead>
            <tr>
                <th scope="col" class="leaderboard-points-game__rank">{{ $t('global.rank') }}</th>
                <th scope="col" class="leaderboard-points-game__nickname">{{ $t('global.nickname') }}</th>
                <th v-if="isGameRanking" scope="col" class="leaderboard-points-game__points">{{ $t('global.gamePoints') }}</th>
                <th scope="col" class="leaderboard-points-game__points">{{ $t('global.recordPoints') }}</th>
                <th scope="col" class="leaderboard-points-game__scores">{{ $t('global.scores') }}</th>
                <th scope="col" class="leaderboard-points-game__proofs">{{ $t('global.proofs') }}</th>
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
                    <tr v-for="item in leaderboard" :data-rank="item.rankPointChart" :key="item.id" :class="[isAuthenticated && getPlayer.id === getPlayerClass(item) ? 'player--me' : 'player' ]">
                        <td class="leaderboard-points-game__rank">{{ getRank(item) }}</td>
                        <td v-if="item.player" class="leaderboard-points-game__nickname">
                            <country v-bind:country="item.player.country"></country>
                            <player v-bind:player="item.player" v-bind:show-avatar="showAvatar"></player>
                        </td>
                        <td v-else class="leaderboard-points-game__nickname">
                            <country v-bind:country="item.country"></country>
                            <player v-bind:player="item" v-bind:show-avatar="showAvatar"></player>
                        </td>
                        <td v-if="isGameRanking" :data-header="$t('global.gamePoints')" class="leaderboard-points-game__points">{{ item.pointGame | number }}</td>
                        <td :data-header="$t('global.recordPoints')" class="leaderboard-points-game__points">{{ item.pointChart | number }}</td>
                        <td :data-header="$t('global.scoresLowercase')" class="leaderboard-points-game__scores">{{ item.nbChart | number }}</td>
                        <td :data-header="$t('global.proofsLowercase')" class="leaderboard-points-game__proofs">{{ item.nbChartProven | number }}</td>
                    </tr>
                </tbody>
            </template>
        </VAsync>
    </table>
</template>

<script>
import Player from '@/components/vgr/player/Player.vue';
import Country from '@/components/country/Country.vue';
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
        'player': Player,
        'country': Country,
    },
    methods: {
        getRank (item) {
            if (item.rankPointChart !== undefined) {
                return item.rankPointChart;
            } else {
                return item.rank;
            }
        },
        getPlayerClass (item) {
            if (item.player) {
                return item.player.id;
            } else {
                return item.id;
            }
        },
    },
    computed: {
        isGameRanking() {
            return this.$route.name === 'GameIndex';
        },
    },
};
</script>
