<template>
    <div>
        <vue-headful :title="title" :description="description" />

        <h2>{{ $t('global.leaderboard') }}</h2>

         <table class="leaderboard-points-game">
        <caption class="screen-reader-text">{{ $t('leaderboard.recordPoints.caption') }}</caption>
        <thead>
            <tr>
                <th scope="col" class="leaderboard-points-game__rank">{{ $t('global.rank') }}</th>
                <th scope="col" class="leaderboard-points-game__nickname">{{ $t('global.nickname') }}</th>
                <th scope="col" class="leaderboard-points-game__points">{{ $t('global.platformPoints') }}</th>
                <th scope="col" class="leaderboard-points-game__scores">{{ $t('global.scores') }}</th>
            </tr>
        </thead>
        <VAsync :await="leaderboard">
            <template #pending>
                <tbody>
                    <tr>
                        <td colspan="5">
                            <loading></loading>
                        </td>
                    </tr>
                </tbody>
            </template>
            <template #resolved="leaderboard">
                <tbody>
                    <tr v-for="item in leaderboard" :data-rank="item.rankPointPlatform" :key="item.id" :class="[isAuthenticated && getPlayer.id === getPlayerClass(item) ? 'player--me' : 'player' ]">
                        <td class="leaderboard-points-game__rank">{{ item.rankPointPlatform }}</td>
                        <td class="leaderboard-points-game__nickname">
                            <country v-bind:country="item.player.country"></country>
                            <player v-bind:player="item.player" v-bind:show-avatar="true"></player>
                        </td>
                        <td :data-header="$t('global.platformPoints')" class="leaderboard-points-game__points">{{ item.pointPlatform | number }}</td>
                        <td :data-header="$t('global.scoresLowercase')" class="leaderboard-points-game__scores">{{ item.nbChart | number }}</td>
                    </tr>
                </tbody>
            </template>
        </VAsync>
    </table>
    </div>
</template>

<script>
import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
import PlatformApi from "@/services/api/vgr/Platform";
import Player from '@/components/vgr/player/Player.vue';
import Country from '@/components/country/Country.vue';
import Security from "@/mixins/Security.vue";


export default {
    mixins: [BreadcrumbsManager, Security],
    name: 'PlatformLeaderboard',
    components: {
        Country,
        Player,
    },
    data() {
        return {
            leaderboard: null,
        };
    },
    computed: {
        title() {
            return this.getPlatform.libPlatform + ' - ' + process.env.VUE_APP_TITLE;
        },
        description() {
            return this.$i18n.t('platform.leaderboard.description', [this.getPlatform.libPlatform]);
        },
        getPlatform() {
            return this.$store.getters['navigation/platform'];
        },
    },
    methods: {
        setData () {
            this.leaderboard = PlatformApi.getPlayerRankingPoints(this.$route.params.id)
                .then((response) => response);
        },
        getPlayerClass (item) {
            if (item.player) {
                return item.player.id;
            } else {
                return item.id;
            }
        },
    },
    created() {
        this.setData();
        this.setBreadcrumbLevel(2);
        this.setBreadcrumbItem2(
            { text: this.$i18n.t('global.leaderboard')}
        );
    },
    watch: {
        '$route' () {
            this.setData();
        }
    },
};
</script>
