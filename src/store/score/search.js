// Utilities
import {defineStore} from 'pinia'

export const useScoreSearchStore = defineStore('score-search', {
    state: () => ({
        players: [],
        games: [],
        platforms: []
    }),
    getters: {
        getPlayers: (state) => state.players,
        getGames: (state) => state.games,
        getPlatforms: (state) => state.platforms,
    },
    actions: {
        pushGame(game) {
            let index = this.games.map(g => g.id).indexOf(game.id);
            if (index === -1) {
                this.games.push(game);
            }
        },
        removeGame(game) {
            this.games.splice(this.games.map(g => g.id).indexOf(game.id), 1);
        },
        pushPlayer(player) {
            let index = this.players.map(g => g.id).indexOf(player.id);
            if (index === -1) {
                this.players.push(player);
            }
        },
        removePlayer(player) {
            this.players.splice(this.players.map(g => g.id).indexOf(player.id), 1);
        },
        pushPlatform(platform) {
            let index = this.platforms.map(g => g.id).indexOf(platform.id);
            if (index === -1) {
                this.platforms.push(platform);
            }
        },
        removePlatform(platform) {
            this.platforms.splice(this.platforms.map(g => g.id).indexOf(platform.id), 1);
        },
    },
    persist: true
})
