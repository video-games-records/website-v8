import { defineStore } from 'pinia'

export const useFlashMessageStore = defineStore('flash-message', {
    state: () => ({
        type: 'info',
        message: '',
        enabled: false,
    }),
    getters: {
        getType: (state) => state.type,
        getMessage: (state) => state.message,
        isEnabled: (state) => state.enabled,
    },
    actions: {
        info(message) {
            this.type = 'info';
            this.message = message;
            this.enabled = true;
        },
        confirm(message) {
            this.type = 'success';
            this.message = message;
            this.enabled = true;
        },
        error(message) {
            this.type = 'error';
            this.message = message;
            this.enabled = true;
        },
        close() {
            this.enabled = false;
        }
    },
})
