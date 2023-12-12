<template>
  <router-link v-if="game.id" :to="{ name: 'GameIndex', params: { idGame: game.id, slugGame: game.slug }}"
               :title="game.name">
    <img v-bind:src="getPicture" :alt="game.name" width="198" height="100"/>
  </router-link>
</template>

<script>

export default {
  name: 'GamePicture',
  props: ['game'],
  computed: {
    getPicture() {
      return import.meta.env.VITE_ROOT_API + '/game/' + this.game.id + '/picture';
    },
  },
};
</script>
