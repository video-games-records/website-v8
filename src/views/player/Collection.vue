<template>
  <div class="pa-4">
    <div v-html="getCollection"></div>
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
    getCollection() {
      return this.$parent.$parent.player.collection;
    },
  }
};
</script>
