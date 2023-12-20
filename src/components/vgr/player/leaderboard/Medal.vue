<template>
    <table class="leaderboard-cups-game">
        <caption class="screen-reader-text">{{ $t('leaderboard.medal.caption') }}</caption>
        <thead>
            <tr>
                <th scope="col">{{ $t('global.rank') }}</th>
                <th scope="col">{{ $t('global.nickname') }}</th>
                <th scope="col">
                    <span class="platinum" :title="$t('global.platinum')">
                        <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                            <use xlink:href="#medal" />
                        </svg>
                        <span class="screen-reader-text">{{ $t('global.platinum') }}</span>
                    </span>
                </th>
                <th scope="col">
                    <span class="gold" :title="$t('global.gold')">
                        <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                            <use xlink:href="#medal" />
                        </svg>
                        <span class="screen-reader-text">{{ $t('global.gold') }}</span>
                    </span>
                </th>
                <th scope="col">
                    <span class="silver" :title="$t('global.silver')">
                        <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                            <use xlink:href="#medal" />
                        </svg>
                        <span class="screen-reader-text">{{ $t('global.silver') }}</span>
                    </span>
                </th>
                <th scope="col">
                    <span class="bronze" :title="$t('global.bronze')">
                        <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                            <use xlink:href="#medal" />
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
                    <tr v-for="item in leaderboard" :data-rank="item.rankMedal" :key="item.id" :class="[isAuthenticated && getPlayer.id === getPlayerClass(item) ? 'player--me' : 'player' ]">
                        <td>{{ item.rankMedal }}</td>
                        <td v-if="item.player">
                            <country v-bind:country="item.player.country"></country>
                            <player v-bind:player="item.player" v-bind:show-avatar="showAvatar"></player>
                        </td>
                        <td v-else>
                            <country v-bind:country="item.country"></country>
                            <player v-bind:player="item" v-bind:show-avatar="showAvatar"></player>
                        </td>
                        <td :data-header="$t('global.platinum')">{{ item.chartRank0|number }}</td>
                        <td :data-header="$t('global.gold')">{{ item.chartRank1|number }}</td>
                        <td :data-header="$t('global.silver')">{{ item.chartRank2|number }}</td>
                        <td :data-header="$t('global.bronze')">{{ item.chartRank3|number }}</td>
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
        getPlayerClass (item) {
            if (item.player) {
                return item.player.id;
            } else {
                return item.id;
            }
        },
    },
};
</script>
