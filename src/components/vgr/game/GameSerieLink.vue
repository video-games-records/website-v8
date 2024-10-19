<template>
  <v-card v-if="game.serie" class="my-2" variant="outlined">
    <v-card-title class="bg-primary">Série</v-card-title>
    <v-card-item class="d-flex justify-center">
      <serie-card :serie="game.serie" />
    </v-card-item>
  </v-card>
</template>

<script>
import SerieCard from "@/components/vgr/serie/Card.vue";

export default {
  name: 'GameSerieLink',
  components: {SerieCard},
  props: ['game'],
};
</script>

