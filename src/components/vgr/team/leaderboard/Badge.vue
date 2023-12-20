<template>
    <table class="leaderboard-badges">
        <caption class="screen-reader-text">{{ $t('leaderboard.badges.captionTeam') }}</caption>
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
                    <tr v-for="item in leaderboard" :data-rank="item.rankBadge" :key="item.id" :class="[isAuthenticated && getPlayer.team && getPlayer.team.id === item.id ? 'player--me' : 'player' ]">
                        <td>{{ item.rankBadge }}</td>
                        <td>
                            <team v-bind:team="item" v-bind:show-avatar="showAvatar"></team>
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
import Team from '@/components/vgr/team/Team.vue';
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
        'team': Team,
    },
};
</script>
