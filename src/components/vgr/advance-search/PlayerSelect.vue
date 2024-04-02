<template>
  <div>
    <v-autocomplete
        v-model="player"
        :custom-filter="customFilter"
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
    <v-chip v-for="(player) in this.getPlayers" :key="player.id" @click:close="remove(player)" closable>
      {{ player.pseudo }}
    </v-chip>
  </div>
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
    customFilter () {
      return true;
    },
  },
};
</script>
