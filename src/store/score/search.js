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
    },
    persist: true
})
