// Utilities
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => ({
    // Language
    nbMessage: 0,
    tab: null,
    message: {
      'object': 'test',
      'message': null,
      'sender': {
        'username': null,
      },
      'recipient': {
        'username': null,
      }
    }
  }),
  getters: {
    getNbMessage: (state) => state.nbMessage,
    getTab: (state) => state.tab,
    getMessage: (state) => state.message,
  },
  actions: {
    setNbMessage(nbMessage) {
      this.nbMessage = nbMessage;
    },
    setTab(tab) {
      this.tab = tab;
    },
    setMessage(message) {
      this.message = message;
    },
    decrement() {
      this.nbMessage = this.nbMessage - 1;
    }
  },
})
