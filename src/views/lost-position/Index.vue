<template>
  <div>
    <h1>{{ $t('lostPosition.index.title') }}</h1>


    <v-select
      v-model="selected"
      density="comfortable"
      :label="$t('game.filter')"
      :items="this.games"
      item-title="name"
      item-value="id"
    />


    <v-table>
      <caption class="d-sr-only">{{ $t('lostPosition.index.caption') }}</caption>
      <thead>
        <tr>
          <th />
          <th scope="col">{{ $t('global.date') }}</th>
          <th scope="col">{{ $t('global.chart') }}</th>
          <th scope="col">{{ $t('lostPosition.change') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :data-position="row.position" :key="row.id">
          <td>
            <input v-model="toDelete" type="checkbox" :value="row.id">
          </td>
          <td>
            <date :date="row.createdAt" :options="{ year: 'numeric', month: 'long', day: 'numeric' }" />
          </td>
          <td>
            <chart :chart="row.chart"></chart>
          </td>
          <td>
            <del>{{ row.oldRank }}</del> → {{ row.newRank }}
          </td>
        </tr>
      </tbody>
    </v-table>

    <div class="d-flex flex-wrap">
      <v-btn v-if="isSelectAll === false" class="ma-2" @click="selectAll()">{{ $t('tag.selectAll') }}</v-btn>
      <v-btn v-else class="ma-2" @click="unselectAll()">{{ $t('tag.unselectAll') }}</v-btn>
      <v-btn class="ma-2" @click="deleteRow()">{{ $t('tag.delete') }}</v-btn>
    </div>

    <v-pagination
      v-model="page"
      :density="this.$vuetify.display.mobile ? 'compact' : 'default'"
      :length="length"
      total-visible="6"
      @update:model-value="updateResource()"
    />
  </div>
</template>

<script>
import Chart from '@/components/vgr/chart/Chart.vue';
import Date from '@/components/tools/Date.vue';
import Security from "@/mixins/Security.vue";
import moment from "moment";
import axios from "axios";
import WatchLanguage from "@/mixins/WatchLanguage.vue";

export default {
  name: 'LostPositionIndex',
  components: {
    'chart': Chart,
    'date': Date,
  },
  mixins: [Security, WatchLanguage],
  data() {
    return {
      page: 1,
      length: 1,
      itemsPerPage: 20,
      data: [],
      selected: null,
      games: [],
      toDelete: [],
    };
  },
  computed: {
    getResourceUrl() {
      let url = '/api/lost_positions?player=' + this.getAuthenticatedPlayer.id;
      if (this.selected != null) {
        url = url + '&chart.group.game=' + this.selected;
      }
      url = url + '&page=' + this.page;
      return url;
    },
    isSelectAll() {
      return this.toDelete.length === this.itemsPerPage;
    },
    getLibGame() {
      if (this.$i18n.locale === 'fr') {
        return 'libGameFr';
      }
      return 'libGameEn';
    },
  },
  watch : {
    getResourceUrl () {
      this.updateResource()
    }
  },
  created() {
    document.title = this.$t('lostPosition.index.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    this.updateLastDisplay();
    this.load();
  },
  methods: {
    load() {
      this.loadGames();
      this.updateResource();
    },
    updateLastDisplay() {
      this.axios.put('/api/players/' + this.getAuthenticatedPlayer.id, {id: this.getAuthenticatedPlayer.id, 'lastDisplayLostPosition': moment().toISOString()})
    },
    loadGames: function () {
      this.axios.get('/api/games?groups[]=game:read&pagination=false' +
          '&groups.charts.lostPositions.player=' + this.getAuthenticatedPlayer.id +
          '&order[' + this.getLibGame + ']ASC')
          .then(response => {
            this.games = response.data['hydra:member']
          })
    },
    updateResource() {
      this.axios.get(this.getResourceUrl)
          .then(response => {
            this.data = response.data['hydra:member'];
            this.length = Math.trunc((response.data['hydra:totalItems'] - 1) / this.itemsPerPage ) + 1;
          })
    },
    selectAll: function () {
      let _this = this;
      this.data.forEach(function (row) {
        if (!_this.toDelete.includes(row.id)) {
          _this.toDelete.push(row.id);
        }
      });
    },
    unselectAll: function () {
      this.toDelete = [];
    },
    deleteRow: function () {
      let promises = [];
      let _this = this;
      this.toDelete.forEach(function (id) {
        promises.push(_this.axios.delete('/api/lost_positions/' + id));
      });
      axios.all(promises)
          .then(() => {
            this.updateResource();
            this.toDelete = [];
          })
    },
  },
};
</script>
