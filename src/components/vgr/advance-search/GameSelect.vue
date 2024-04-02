<template>
  <div>
    <v-autocomplete
        v-model="game"
        :custom-filter="customFilter"
        v-model:search="search"
        :loading="loading"
        :label="$t('global.games')"
        menu-icon=""
        :items="items"
        item-value="id"
        item-title="name"
        variant="outlined"
        @update:modelValue="select"
        return-object />
    <v-chip v-for="(game) in this.getGames" :key="game.id" @click:close="remove(game)" closable>
      {{ game.name }}
    </v-chip>
  </div>
</template>

<script>

import {useScoreSearchStore} from "@/store/score/search";

export default {
  name: 'GameSelectMultiple',
  data() {
    return {
      game: null,
      loading: false,
      items: [],
      search: null,
    };
  },
  watch: {
    search (val) {
      val && val.length >= 3 && this.autocomplete(val)
    },
  },
  computed: {
    getGames() {
      return useScoreSearchStore().getGames;
    }
  },
  methods: {
    autocomplete (v) {
      this.loading = true
      this.items = [];

      this.axios.get('/api/games/autocomplete',{params: {query: v}}).then(response => {
        this.items = response.data['hydra:member'];
        this.loading = false;
      })
    },
    select() {
      useScoreSearchStore().pushGame(this.game);
      this.game = null;
    },
    remove(game) {
      useScoreSearchStore().removeGame(game);
    },
    customFilter () {
      return true;
    },
  },
};
</script>
