<template>
  <div class="pa-4">
    <div v-html="getPresentation"></div>
  </div>
</template>

<script>
export default {
  name: 'PlayerPresentation',
  components: {},
  data() {
    return {};
  },
  computed: {
    getPresentation() {
      return this.$parent.$parent.player.presentation;
    },
  }
};
</script>
