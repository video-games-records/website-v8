// Utilities
import { defineStore } from 'pinia'

export const useSecuritytore = defineStore('securoty', {
    state: () => ({
        // Navigation
        isAuthenticated: false,
        user: {},
        refreshTokenPromise: null
    }),
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        getUser: (state) => state.user,
    },
    actions: {
        login() {

        },
        logout() {
            this.isAuthenticated = false;
            this.user = {}
        },
        setRefreshTokenPromise(promise) {
           this.refreshTokenPromise = promise;
        }
    },
})
