<template>
  <div>
    <v-autocomplete
        v-model="platform"
        :custom-filter="customFilter"
        v-model:search="search"
        :loading="loading"
        :label="$t('global.platforms')"
        menu-icon=""
        :items="items"
        item-value="id"
        item-title="libPlatform"
        variant="outlined"
        @update:modelValue="select"
        return-object />
    <v-chip v-for="(platform) in this.getPlatforms" :key="platform.id" @click:close="remove(platform)" closable>
      {{ platform.libPlatform }}
    </v-chip>
  </div>
</template>

<script>

import {useScoreSearchStore} from "@/store/score/search";

export default {
  name: 'PlatformSelectMultiple',
  data() {
    return {
      platform: null,
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
    getPlatforms() {
      return useScoreSearchStore().getPlatforms;
    }
  },
  methods: {
    autocomplete (v) {
      this.loading = true
      this.items = [];

      this.axios.get('/api/platforms/autocomplete',{params: {query: v}}).then(response => {
        this.items = response.data['hydra:member'];
        this.loading = false;
      })
    },
    select() {
      useScoreSearchStore().pushPlatform(this.platform);
      this.platform = null;
    },
    remove(platform) {
      useScoreSearchStore().removePlatform(platform);
    },
    customFilter () {
      return true;
    },
  },
};
</script>
