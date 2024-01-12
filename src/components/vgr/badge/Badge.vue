<template>
    <span v-if="badge.id">
        <img :src="getUrl" width="33" height="33" :alt="getAlt" :title="getTitle" loading="lazy"/>
    </span>
</template>

<script>
export default {
  name: 'Badge',
  props: ['badge'],
  computed: {
    getUrl() {
      return import.meta.env.VITE_ROOT_API + '/badge/' + this.badge.id + '/picture';
    },
    getAlt() {
      return this.badge.type + ' ' + this.badge.value;
    },
    getTitle() {
      return this.badge.title;
    },
  },
};
</script>


