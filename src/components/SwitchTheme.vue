<template>
  <v-radio-group v-model="name" label="Theme">
    <v-radio label="Light" value="light"></v-radio>
    <v-radio label="Dark" value="dark"></v-radio>
  </v-radio-group>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { ref, reactive, computed  } from 'vue'
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