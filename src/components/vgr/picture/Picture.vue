<template>
  <div>
    <img v-bind:src="getPicture" alt="" loading="lazy"/>
  </div>
</template>

<script>
export default {
  name: 'Picture',
  props: {
    'picture': {
      type: Object,
      require: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    getPicture() {
      return import.meta.env.VITE_ROOT_API + '/proof/picture/' + this.picture.id;
    },
  },
};
</script>

