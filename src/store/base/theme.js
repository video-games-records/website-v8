import {defineStore} from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        name: 'light'
    }),
    getters: {
        getName: (state) => state.name
    },
    actions: {
        setName(name) {
            this.name = name;
        },
    },
    persist: true
})
