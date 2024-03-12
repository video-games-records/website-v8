<template>
  <div>
    <div class="d-flex">
      <v-text-field class="d-inline" v-model="term" :minlength="3" :label="$t('search.chart')"></v-text-field>
      <v-btn class="d-inline" @click="updateResource()">{{ $t('tag.submit') }}</v-btn>
    </div>
    <player-chart-list :game="getGame" :displayGroupName="true"></player-chart-list>
    <v-pagination :density="this.$vuetify.display.mobile ? 'compact' : 'default'" v-model="page" :length="length" total-visible=6 @update:modelValue="updateResource()"></v-pagination>
  </div>
</template>

<script>

import PlayerChartList from '@/components/vgr/playerChart/form/List.vue'
import {useAppStore} from "@/store/app";
import {useScoreSubmitStore} from "@/store/score/submit";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";


export default {
  name: 'GameSubmit',
  components: {PlayerChartList},
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
    getResourceUrl() {
      let url = '/api/games/' + this.$route.params.idGame + '/form-data?itemsPerPage=' + this.itemsPerPage + '&page=' + this.page;
      if (this.term !== '') {
        url += '&term=' + this.term;
      }
      return url;
    },
  },
  data() {
    return {
      page: 1,
      length: 1,
      term: '',
      itemsPerPage: 10,
    };
  },
  created() {
    useBreadcrumbsStore().setLevel(2);
    useBreadcrumbsStore().setItem2({ text: this.$t('group.updateScores') });
    this.updateResource();
  },
  methods: {
    updateResource() {
      this.axios.get(this.getResourceUrl)
          .then(response => {
            useScoreSubmitStore().setCharts(response.data['hydra:member']);
            this.length = Math.trunc((response.data['hydra:totalItems'] - 1) / this.itemsPerPage ) + 1;
          })
    },
  },
};
</script>
