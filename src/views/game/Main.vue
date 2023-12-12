<template>
    <div>
        <game-card v-bind:game=getGame></game-card>
        <router-view></router-view>
    </div>
</template>

<script>
    import GameApi from '@/services/api/vgr/Game';
    import GameCard from '@/components/vgr/game/Card.vue';
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
    import i18n from "@/i18n";

    export default {
        mixins: [BreadcrumbsManager],
        name: 'GameMain',
        components: {
            'game-card' : GameCard,
        },
        data() {
            return {
            };
        },
        computed: {
            getGame() {
                return this.$store.getters['navigation/game'];
            },
            getLanguage () {
                return i18n.locale;
            },
        },
        methods: {
            setGame () {
                GameApi.getGame(this.$route.params.idGame)
                .then(game => {
                    if (game.status.value !== this.$GAME_STATUS_ACTIVE) {
                        this.$router.push({path: '/'});
                    }
                    this.setBreadcrumbItem1(
                        { text: game.name, to: {name: 'GameIndex',params: { idGame: game.id, slugGame: game.slug }}}
                    );
                    this.$store.dispatch('navigation/setGame', game);
                    this.$store.dispatch('aside/setGame', game);
                });
            },
        },
        watch : {
            getLanguage() {
                this.setGame();
            },
        },
        created() {
            this.setBreadcrumbLevel(1);
            this.setGame();
        },
        updated() {
            if (this.$route.name === 'GameIndex') {
                this.setBreadcrumbLevel(1);
                if (this.getGame.id !== this.$route.params.idGame) {
                    this.setGame();
                }
            }
        },
    };
</script>
