<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center">
      <h1>{{ $t('notFound.title') }}</h1>
    </v-col>
    <v-col cols="12" class="d-flex justify-center">
      <img src="./../assets/img/404.svg" width="400" height="150" alt="404"/>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'NotFound',
  components: {},
  data() {
    return {};
  },
  created() {
    document.title = this.$t('notFound.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
  },
}
</script>


