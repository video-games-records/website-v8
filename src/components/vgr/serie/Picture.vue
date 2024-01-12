<template>
  <router-link v-if="serie.id" :to="{ name: 'SerieIndex', params: { id: serie.id, slugSerie: serie.slug }}"
               :title="serie.name">
    <img v-bind:src="getPicture" :alt="serie.name" width="198" height="100"/>
  </router-link>
</template>

<script>

export default {
  name: 'SeriePicture',
  props: ['serie'],
  computed: {
    getPicture() {
      return import.meta.env.VITE_ROOT_API + '/serie/' + this.serie.id + '/picture';
    },
  },
};
</script>
