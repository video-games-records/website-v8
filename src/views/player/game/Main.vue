<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>

import PlayerGameApi from "@/services/api/vgr/PlayerGame";

export default {

    name: 'PlayerGameMain',
    components: {

    },
    data() {
        return {
            playerGame: {
                game: {
                    name: '',
                }
            },
        };
    },
    created() {
        this.setData();
    },
    watch: {
        '$route.params.idGame' () {
            this.setData();
            this.$forceUpdate();
        }
    },
    methods: {
        setData () {
            let params = {
                query: {
                    groups: ['game.read.mini', 'game.stats', 'playerGame.game', 'playerGame.proof', 'game.platforms', 'platform.read', 'playerGame.proof'],
                    pagination: false,
                    player: this.$route.params.idPlayer,
                    game: this.$route.params.idGame
                }
            };
            PlayerGameApi.getList(params)
                .then((response) => {
                    this.playerGame = response[0];
                });
        }
    },
};
</script>
