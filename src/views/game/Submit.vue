<template>
  <div>
    <div>
      <label for="term">{{ $t('search.chart') }}</label>
      <input id="term" v-model="term" type="text" :minlength="3" required/>
    </div>
    <player-chart-list :game="getGame" :displayGroupName="true"></player-chart-list>
    <v-pagination v-model="page" :length="length" total-visible=6 @update:modelValue="updateResource()"></v-pagination>
  </div>
</template>

<script>

import PlayerChartList from '@/components/vgr/playerChart/form/List.vue'
import {useAppStore} from "@/store/app";
import {useScoreSubmitStore} from "@/store/score/submit";


export default {
  name: 'GameSubmit',
  components: {PlayerChartList},
  computed: {
    title() {
      return this.getGame.name + ' - ' + import.meta.env.VITE_APP_TITLE;
    },
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
      length: 0,
      term: '',
      itemsPerPage: 10,
    };
  },
  created() {
    this.updateResource();
  },
  methods: {
    updateResource() {
      this.axios.get(this.getResourceUrl)
          .then(response => {
            useScoreSubmitStore().setCharts(response.data['hydra:member']);
            this.length = Math.abs(response.data['hydra:totalItems'] / this.itemsPerPage);
          })
    },
  },
};
</script>
