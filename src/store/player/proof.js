// Utilities
import { defineStore } from 'pinia'

export const usePlayerProofStore = defineStore('player-proof', {
    state: () => ({
        isOpened: false,
        idPlayerChart: null,
        picture: null,
    }),
    getters: {
        getIsOpened: (state) => state.isOpened,
        getIdPlayerChart: (state) => state.idPlayerChart,
        getPicture: (state) => state.picture,
    },
    actions: {
        toogle() {
            this.isOpened = this.isOpened === false;
        },
        setPicture(picture, idPlayerChart) {
            this.idPlayerChart = idPlayerChart;
            this.picture = picture;
        },
        resetPicture() {
            this.idPlayerChart = null;
            this.picture = null;
        }
    },
})

