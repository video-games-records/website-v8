<template>
    <table class="leaderboard-cups-game">
        <caption class="screen-reader-text">{{ $t('leaderboard.cup.captionTeam') }}</caption>
        <thead>
            <tr>
                <th scope="col">{{ $t('global.rank') }}</th>
                <th scope="col">{{ $t('global.nickname') }}</th>
                <th scope="col">
                    <span class="platinum" :title="$t('global.platinum')">
                        <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                            <use xlink:href="#cup" />
                        </svg>
                        <span class="screen-reader-text">{{ $t('global.platinum') }}</span>
                    </span>
                </th>
                <th scope="col">
                    <span class="gold" :title="$t('global.gold')">
                        <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                            <use xlink:href="#cup" />
                        </svg>
                        <span class="screen-reader-text">{{ $t('global.gold') }}</span>
                    </span>
                </th>
                <th scope="col">
                    <span class="silver" :title="$t('global.silver')">
                        <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                            <use xlink:href="#cup" />
                        </svg>
                        <span class="screen-reader-text">{{ $t('global.silver') }}</span>
                    </span>
                </th>
                <th scope="col">
                    <span class="bronze" :title="$t('global.bronze')">
                        <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                            <use xlink:href="#cup" />
                        </svg>
                        <span class="screen-reader-text">{{ $t('global.bronze') }}</span>
                    </span>
                </th>
            </tr>
        </thead>
        <VAsync :await="leaderboard">
            <template #pending>
                <tbody>
                    <tr>
                        <td colspan="6">
                            <loading></loading>
                        </td>
                    </tr>
                </tbody>
            </template>
            <template #resolved="leaderboard">
                <tbody>
                    <tr v-for="item in leaderboard" :data-rank="item.rankCup" :key="item.id" :class="[isAuthenticated && getPlayer.team && getPlayer.team.id === item.id ? 'player--me' : 'player' ]">
                        <td>{{ item.rankCup }}</td>
                        <td>
                            <team v-bind:team="item" v-bind:show-avatar="showAvatar"></team>
                        </td>
                        <td :data-header="$t('global.platinum')">{{ item.gameRank0 }}</td>
                        <td :data-header="$t('global.gold')">{{ item.gameRank1 }}</td>
                        <td :data-header="$t('global.silver')">{{ item.gameRank2 }}</td>
                        <td :data-header="$t('global.bronze')">{{ item.gameRank3 }}</td>
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
