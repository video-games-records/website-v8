<template>
    <div>
        <vue-headful :title="title" :description="description" />
        <router-link :to="{ name: 'PlatformLeaderboard'}">{{ $t('global.leaderboard') }}</router-link>
        <h2>{{ this.nbGame | number }} {{ $tc('global.games_', this.nbGame) }}</h2>
        <gameList ref="gameList" v-bind:games=games v-bind:display-platform="false" v-bind:active-order-by="true"></gameList>
    </div>
</template>

<script>
    import GameApi from '@/services/api/vgr/Game';
    import GameList from '@/components/vgr/game/List.vue';
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';

    export default {
        mixins: [BreadcrumbsManager],
        name: 'PlatformIndex',
        components: {
            'gameList' : GameList,
        },
        data() {
            return {
                games: null,
                nbGame: 0,
            };
        },
        computed: {
            title() {
                return this.getPlatform.libPlatform + ' - ' + process.env.VUE_APP_TITLE;
            },
            description() {
                return this.$i18n.t('description', [this.getPlatform.libPlatform]);
            },
            getPlatform() {
                return this.$store.getters['navigation/platform'];
            },
            getLibGame() {
                if (this.$i18n.locale === 'fr') {
                    return 'libGameFr';
                }
                return 'libGameEn';
            },
        },
        created() {
            this.load();
        },
        watch: {
            '$route' () {
                this.load();
            }
        },
        methods: {
            load() {
                let params = {
                    query :{
                        'pagination':false,
                        'status': this.$GAME_STATUS_ACTIVE,
                        'platforms': this.$route.params.id,
                    }
                };
                if (this.$refs.gameList) {
                    params.query['order[' + this.$refs.gameList.order.column +']'] = this.$refs.gameList.order.direction;
                } else {
                    params.query['order[' + this.getLibGame + ']'] = 'ASC';
                }
                this.games = GameApi.getList(params)
                    .then((response) => {
                    this.nbGame = response['hydra:totalItems'];
                    return response;
                });
            }
        },
    };
</script>
