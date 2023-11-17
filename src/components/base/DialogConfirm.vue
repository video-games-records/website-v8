<template>
  <v-dialog
      v-model="getDialog"
      :max-width="getOptions.width"
      :style="{ zIndex: getOptions.zIndex }"
  >
    <v-card>
      <v-toolbar dark :color="getOptions.color" dense flat>
        <v-toolbar-title class="text-body-2 font-weight-bold grey--text">
          {{ getTitle }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text v-show="!!getMessage" class="pa-4 black--text" v-html="getMessage"></v-card-text>
      <v-card-actions class="pt-3">
        <v-spacer></v-spacer>
        <v-btn v-if="!getOptions.noconfirm" color="grey" class="body-2 font-weight-bold" @click.native="cancel">
          Annuler
        </v-btn>
        <v-btn color="primary" class="body-2 font-weight-bold" outlined @click.native="agree">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useDialogConfirmStore } from '@/store/base/dialogConfigm';

export default {
  data: function () {
    return {

    };
  },
  computed: {
    getDialog() {
      return useDialogConfirmStore().getDialog;
    },
    getTitle() {
      return useDialogConfirmStore().getTitle;
    },
    getMessage() {
      return useDialogConfirmStore().getMessage;
    },
    getOptions() {
      return useDialogConfirmStore().getOptions;
    },
  },
  methods: {
    agree() {
      useDialogConfirmStore().agree();
    },
    cancel() {
      useDialogConfirmStore().cancel();
    }
  }
}
</script>