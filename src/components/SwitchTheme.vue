<template>
  <v-radio-group v-model="name" :label="$t('settings.theme')">
    <v-radio :label="$t('theme.light')" value="light"></v-radio>
    <v-radio :label="$t('theme.dark')" value="dark"></v-radio>
  </v-radio-group>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { computed  } from 'vue'
import {useThemeStore} from "@/store/base/theme";

const theme = useTheme()

theme.global.name.value = useThemeStore().getName;

const name = computed({
  // getter
  get() {
    return useThemeStore().getName
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    useThemeStore().setName(newValue)
    theme.global.name.value = newValue;
  }
})

</script>