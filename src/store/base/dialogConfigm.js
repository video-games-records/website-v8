import { defineStore } from 'pinia'

export const useDialogConfirmStore = defineStore('dialog-confirm', {
    state: () => ({
        dialog: false,
        title: '',
        message: '',
        resolve: null,
        reject: null,
        options: {
            color: "error",
            width: 400,
            zIndex: 1000,
            noconfirm: false
        }
    }),
    getters: {
        getDialog: (state) => state.dialog,
        getTitle: (state) => state.title,
        getMessage: (state) => state.message,
        getOptions: (state) => state.options,
    },
    actions: {
        open(title, message, options) {
            this.dialog = true;
            this.title = title;
            this.message = message;
            this.options = Object.assign(this.options, options);
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        agree() {
            this.resolve(true);
            this.dialog = false;
        },
        cancel() {
            this.resolve(false);
            this.dialog = false;
        }
    },
})
