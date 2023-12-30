// Utilities
import { defineStore } from 'pinia'

export const useScoreSubmitStore = defineStore('scoreSubmit', {
    state: () => ({
        isInitialized: false,
        isLoading: false,
        charts: [],
        nbChartToUpdate: 0,
        nbChartUpdated: 0,
    }),
    getters: {
        getIsInitialized: (state) => state.isInitialized,
        getIsLoading: (state) => state.isLoading,
        getCharts: (state) => state.charts,
        getNbChartToUpdate: (state) => state.nbChartToUpdate,
        getNbChartUpdated: (state) => state.nbChartUpdated,
    },
    actions: {
        reset() {
            this.nbChartUpdated = 0;
            this.nbChartToUpdate = 0;
        },
        setCharts(charts) {
            this.charts = charts;
            this.isInitialized = true;
            this.loading = false;
            this.nbChartToUpdate = 0;
            this.nbChartUpdated = 0;
        },
        addChartToUpdate() {
            this.nbChartToUpdate++;
        },
        addChartUpdated() {
            this.nbChartUpdated++;
        },
    },
})

