<template>
    <table class="leaderboard-proofs">
        <caption class="screen-reader-text">{{ $t('leaderboard.proofs.caption') }}</caption>
        <thead>
            <tr>
                <th scope="col">{{ $t('global.rank') }}</th>
                <th scope="col">{{ $t('global.nickname') }}</th>
                <th scope="col">{{ $t('global.proofs') }}</th>
                <th scope="col">{{ $t('global.scoreProven') }}</th>
            </tr>
        </thead>
        <VAsync :await="leaderboard">
            <template #pending>
                <tbody>
                    <tr>
                        <td colspan="4">
                            <loading></loading>
                        </td>
                    </tr>
                </tbody>
            </template>
            <template #resolved="leaderboard">
                <tbody>
                    <tr v-for="item in leaderboard" :data-rank="item.rankProof" :key="item.id" :class="[isAuthenticated && getPlayer.id === item.id ? 'player--me' : 'player' ]">
                        <td>{{ item.rankProof }}</td>
                        <td>
                            <country v-bind:country="item.country"></country>
                            <player v-bind:player="item" v-bind:show-avatar="showAvatar"></player>
                        </td>
                        <td :data-header="$t('global.proofsLowercase')">{{ item.nbChartProven | number }}</td>
                        <td :data-header="$t('global.scoreProvenMobile')">{{ percentage(item) | number }} %</td>
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
    name: 'LeaderboardMedal',
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
        percentage (item) {
            return Math.round(item.nbChartProven / item.nbChart * 10000) / 100;
        }
    },
};
</script>
