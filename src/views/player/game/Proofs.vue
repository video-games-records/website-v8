<template>
    <div>
        <button type="button" onclick="history.back();" class="button-as-link">{{ $t('player.proof.goBack') }}</button>

        <div class="game-card profile-proofs__game">
            <div class="game-card__cover">
                <game-picture v-bind:game="getPlayerGame.game" />
            </div>

            <div class="game-card__infos">
                <h2 class="h3">{{ $t('player.proof.proofsOn') }} {{ getPlayerGame.game.name }}
                </h2>
                <platform-list v-bind:platforms="getPlayerGame.game.platforms"></platform-list>
            </div>
        </div>

        <div class="button-actions button-actions--top">
            <button type="button" @click="toggle()">
                <span v-if="isOpened">{{ $t('player.proof.close') }}</span>
                <span v-else>{{ $t('player.proof.open') }}</span>
            </button>
        </div>

        <VAsync :await="groups">
            <template #pending>
                <loading></loading>
            </template>
            <template #resolved="groups">
                <player-proof-group v-for="group in groups" :key="group.id" v-bind:group="group" v-bind:idPlayer="getIdPlayer"/>
            </template>
        </VAsync>
    </div>
</template>

<script>

import GameApi from "@/services/api/vgr/Game";
import PlayerProofGroup from "@/components/vgr/player/proof/Group";
import GamePicture from "@/components/vgr/game/Picture";
import PlatformList from "@/components/vgr/platform/List";

export default {
    name: 'PlayerGameProofs',
    props: {

    },
    components: {
        PlayerProofGroup,
        'game-picture' : GamePicture,
        'platform-list' : PlatformList,
    },
    data() {
        return {
            groups: null,
            isOpened: false,
        };
    },
    computed: {
        getIdPlayer(){
            return this.$route.params.idPlayer;
        },
        getPlayerGame(){
            return this.$parent.playerGame;
        }
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
            this.groups = GameApi.getGroups(this.$route.params.idGame)
                .then((response) => response);
        },
        toggle() {
            this.isOpened = this.isOpened === false;
        }
    },
};
</script>
