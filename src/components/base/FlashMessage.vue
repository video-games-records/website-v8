<template>
  <v-snackbar v-model="isEnabled" :timeout="timeout" :color="getType">
    {{ getMessage }}
    <template v-slot:actions>
      <v-btn @click="close">Fermer</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { useFlashMessageStore } from '@/store/base/flashMessage'

export default {
  name: 'flashMessage',
  data() {
    return {
      timeout: 5000,
    }
  },
  computed: {
    getType() {
      return useFlashMessageStore().getType;
    },
    getMessage() {
      return useFlashMessageStore().getMessage;
    },
    isEnabled: {
      get: function () {
        return useFlashMessageStore().isEnabled;
      },
      set: function () {
        useFlashMessageStore().close();
      }
    },
  },
  methods: {
    close() {
      useFlashMessageStore().close();
    }
  }
};
</script>
<style scoped>
.v-snackbar {
  white-space: pre-wrap;
}
</style>
