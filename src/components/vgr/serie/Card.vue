<template>
  <div v-if="serie.id" class="game-card">
    <router-link :to="{ name: 'SerieIndex', params: { id: serie.id, slugSerie: serie.slug } }">
      <img v-bind:src="getPicture" alt="" width="198" height="100" aria-hidden="true"/>
    </router-link>
    <div class="game-card__infos">
      <div class="h1">{{ serie.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SerieCard',
  props: ['serie'],
  components: {},
  computed: {
    getPicture() {
      return import.meta.env.VITE_ROOT_API + '/serie/' + this.serie.id + '/picture';
    },
  },
};
</script>
