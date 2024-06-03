<template>
  <div>
    <v-dialog
        transition="slide-x-transition"
        v-model="dialog"
        content-class="custom-dialog"
        width="300"
    >
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-cog" v-bind="props"></v-btn>
        <v-tooltip
            activator="parent"
            location="bottom"
        >{{ $t('topbar.settings') }}</v-tooltip>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card height="100%">
          <v-card-title class="bg-primary">
            Settings
          </v-card-title>
          <v-card-item>
            <switch-theme />
            <v-divider />
            <language-switcher />
          </v-card-item>
        </v-card>
      </template>

    </v-dialog>
  </div>
</template>


<script>

import SwitchTheme from "@/components/SwitchTheme.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

export default {
  components: {LanguageSwitcher, SwitchTheme},
  data () {
    return {
      dialog: false,
    }
  },
}
</script>

<style>
.custom-dialog {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
