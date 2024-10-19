<template>
  <v-card v-if="game && game.forum" class="my-2" variant="outlined">
    <v-card-title class="bg-primary">{{ $t('game.forum') }}</v-card-title>
    <v-card-item>
      <router-link :to="{ name: 'GameForumIndex' , params: { idForum: game.forum.id, slugForum: game.forum.slug }}">
        {{ game.forum.libForum }}
      </router-link>
    </v-card-item>
  </v-card>
</template>

<script>
export default {
  name: 'GameForumLink',
  props: ['game'],
};
</script>

