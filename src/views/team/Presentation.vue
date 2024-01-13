<template>
  <div>
    <div v-html="getPresentation"></div>
  </div>
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
