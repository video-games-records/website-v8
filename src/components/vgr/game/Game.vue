<template>
    <span v-if="game.id">
        <router-link v-if="showLink" :to="{ name: 'GameIndex', params: { idGame: game.id, slugGame: game.slug }}">{{
            game.name
          }}</router-link>
        <span v-else>{{ game.name }}</span>
    </span>
</template>

<script>
export default {
  name: 'Game',
  props: {
    'game': {
      type: Object,
      require: true,
    },
    'showLink': {
      default: true,
      type: Boolean,
    },
  },
};
</script>

