<template>
  <v-sheet class="pa-4">
    <div v-html="getPresentation"></div>
  </v-sheet>
</template>

<script>
export default {
  name: 'TeamPresentation',
  components: {},
  data() {
    return {};
  },
  computed: {
    getPresentation() {
      return this.$parent.$parent.team.presentation;
    },
  }
};
</script>
