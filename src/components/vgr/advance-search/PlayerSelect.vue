<template>
  <v-sheet>
    <v-autocomplete
        v-model="player"
        v-model:search="search"
        :loading="loading"
        :label="$t('global.players')"
        menu-icon=""
        :items="items"
        item-value="id"
        item-title="pseudo"
        variant="outlined"
        @update:modelValue="select"
        return-object />
    <button v-for="(player, index) in this.getPlayers" :key="player.id" @click="remove(player)"
            class="button-as-link tag">
      <span class="tag--close" :aria-label="$t('tag.remove')">×</span> {{ player.pseudo }}
    </button>
  </v-sheet>
</template>

<script>

import {useScoreSearchStore} from "@/store/score/search";

export default {
  name: 'PlayerSelectMultiple',
  data() {
    return {
      player: null,
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
    getPlayers() {
      return useScoreSearchStore().getPlayers;
    }
  },
  methods: {
    autocomplete (v) {
      this.loading = true
      this.items = [];

      this.axios.get('/api/players/autocomplete',{params: {query: v}}).then(response => {
        this.items = response.data['hydra:member'];
        this.loading = false;
      })
    },
    select() {
      useScoreSearchStore().pushPlayer(this.player);
      this.player = null;
    },
    remove(player) {
      useScoreSearchStore().removePlayer(player);
    },
  },
};
</script>
