// Utilities
import { defineStore } from 'pinia'
import AuthApi from "@/services/auth.service";

export const useSecurityStore = defineStore('security', {
    state: () => ({
        // Navigation
        isAuthenticated: false,
        user: {},
        refreshTokenPromise: null
    }),
    getters: {
        getIsAuthenticated: (state) => state.isAuthenticated,
        getUser: (state) => state.user,
    },
    actions: {
        login(payload) {
            return AuthApi.login(payload.login, payload.password)
                .then(response => {
                    this.isAuthenticated = true;
                    //this.user = response.user;
                    //this.player = response.player;
                })
        },
        logout() {
            this.isAuthenticated = false;
            this.user = {}
        },
        setRefreshTokenPromise(promise) {
           this.refreshTokenPromise = promise;
        }
    },
    persist: true
})
