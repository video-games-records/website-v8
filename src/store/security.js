// Utilities
import {defineStore} from 'pinia'
import AuthApi from "@/services/auth.service";

export const useSecurityStore = defineStore('security', {
    state: () => ({
        // Navigation
        isAuthenticated: false,
        user: {},
        player: {},
        refreshTokenPromise: null
    }),
    getters: {
        getIsAuthenticated: (state) => state.isAuthenticated,
        getUser: (state) => state.user,
        getPlayer: (state) => state.player,
    },
    actions: {
        login(payload) {
            return AuthApi.login(payload.login, payload.password)
                .then(response => {
                    this.isAuthenticated = true;
                    this.user = response.user;
                    this.player = response.player;
                })
        },
        logout() {
            this.isAuthenticated = false;
            this.user = {}
        },
        refreshToken() {
            if (null === this.refreshTokenPromise) {
                const p = AuthApi.refreshToken()
                this.refreshTokenPromise = p

                p.then(
                    () => {
                        this.refreshTokenPromise = null
                    }
                )
            }
            return this.refreshTokenPromise
        }
    },
    persist: true
})
