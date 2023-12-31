<template>
  <div>
    <player-chart-list :game="getGame"></player-chart-list>
    <v-pagination :density="this.$vuetify.display.mobile ? 'compact' : 'default'" v-model="page" :length="length"
                  total-visible=6 @update:modelValue="updateResource()"></v-pagination>
  </div>
</template>

<script>
import playerChartList from '@/components/vgr/playerChart/form/List.vue'
import {useAppStore} from "@/store/app";
import {useScoreSubmitStore} from "@/store/score/submit";

export default {
  name: 'GroupSubmit',
  components: {playerChartList},
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
    getGroup() {
      return useAppStore().getGroup;
    },
    getResourceUrl() {
      return '/api/groups/' + this.$route.params.idGroup + '/form-data?itemsPerPage=' + this.itemsPerPage + '&page=' + this.page;
    },
  },
  data() {
    return {
      page: 1,
      length: 1,
      itemsPerPage: 50,
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
            this.length = Math.trunc(response.data['hydra:totalItems'] / this.itemsPerPage - 1) + 1;
          })
    },
  },
};
</script>
