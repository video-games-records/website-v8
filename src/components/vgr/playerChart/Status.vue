<template>
  <span :class="status.class">
    <span class="screen-reader-text">{{ status.name }}</span>
  </span>
</template>

<script>
export default {
  name: 'Status',
  props: {
    'status': {
      type: Object,
      require: true,
    },
  },
  data() {
    return {};
  },
};
</script>
