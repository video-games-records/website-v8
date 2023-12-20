<template>
    <table class="leaderboard-badges">
        <caption class="screen-reader-text">{{ $t('leaderboard.badges.caption') }}</caption>
        <thead>
            <tr>
                <th scope="col">{{ $t('global.rank') }}</th>
                <th scope="col">{{ $t('global.nickname') }}</th>
                <th scope="col">{{ $t('global.badgePoints') }}</th>
                <th scope="col">{{ $t('badge.type.master') }}</th>
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
                    <tr v-for="item in leaderboard" :data-rank="item.rankBadge" :key="item.id" :class="[isAuthenticated && getPlayer.id === item.id ? 'player--me' : 'player' ]">
                        <td>{{ item.rankBadge }}</td>
                        <td>
                            <country v-bind:country="item.country"></country>
                            <player v-bind:player="item" v-bind:show-avatar="showAvatar"></player>
                        </td>
                        <td :data-header="$t('global.badgePoints')">{{ item.pointBadge | number }}</td>
                        <td :data-header="$t('badges.master')">{{ item.nbMasterBadge | number }}</td>
                    </tr>
                </tbody>
            </template>
        </VAsync>
    </table>
</template>

<script>
    import Player from '@/components/vgr/player/Player.vue';
    import Country from '@/components/country/Country.vue';
    import Security from '@/mixins/Security.vue';

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
    };
</script>
