<template>
  <div class="pa-2">

    <fieldset>
      <legend>{{ $t('global.filterBy') }}</legend>
      <v-select
          v-model="filter.platform"
          :items="platforms"
          item-title="libPlatform"
          item-value="id" />
    </fieldset>

    <v-table>
      <caption class="d-sr-only">{{ $t('global.games') }}</caption>
      <thead>
      <tr>
        <th scope="col">
          <button class="table-order" @click="orderBy(getLibGame)">{{ $t('global.game') }}</button>
        </th>
        <th v-if="!this.$vuetify.display.mobile" scope="col" style="width:100px;">
          <button class="table-order" @click="orderBy('chartRank0')">{{ $t('global.medals') }}</button>
        </th>
        <th v-if="!this.$vuetify.display.mobile" scope="col" style="width:100px;"></th>
        <th v-if="!this.$vuetify.display.mobile" scope="col" style="width:100px;"></th>
        <th v-if="!this.$vuetify.display.mobile" scope="col" style="width:100px;"></th>
        <th v-if="!this.$vuetify.display.mobile" scope="col" style="width:150px;">
          <button class="table-order" @click="orderBy('pointGame')">{{ $t('global.gamePoints') }}</button>
        </th>
        <th scope="col" style="width:100px;">
          <button class="table-order" @click="orderBy('nbChart')">{{ $t('global.charts') }}</button>
        </th>
        <th scope="col" style="width:80px;">
          <button class="table-order" @click="orderBy('rankPointChart')">{{ $t('global.rank') }}</button>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in games" :data-rank="item.rankPointChart" :key="item.id">
        <td>
          <game v-bind:game="item.game"></game>
        </td>
        <td v-if="!this.$vuetify.display.mobile">
          <span v-if="item.chartRank0 > 0" :title="$t('global.platinum')">
              {{ item.chartRank0 }}
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite platinum"
                   aria-hidden="true" focusable="false">
                  <use xlink:href="#medal"/>
              </svg>
              <span class="screen-reader-text">{{ $t('global.platinum') }}</span>
          </span>
        </td>
        <td v-if="!this.$vuetify.display.mobile">
          <span v-if="item.chartRank1 > 0" :title="$t('global.gold')">
              {{ item.chartRank1 }}
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite gold"
                   aria-hidden="true" focusable="false">
                  <use xlink:href="#medal"/>
              </svg>
              <span class="screen-reader-text">{{ $t('global.gold') }}</span>
          </span>
        </td>
        <td v-if="!this.$vuetify.display.mobile">
          <span v-if="item.chartRank2 > 0" :title="$t('global.silver')">
              {{ item.chartRank2 }}
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite silver"
                   aria-hidden="true" focusable="false">
                  <use xlink:href="#medal"/>
              </svg>
              <span class="screen-reader-text">{{ $t('global.silver') }}</span>
          </span>

        </td>
        <td v-if="!this.$vuetify.display.mobile">
          <span v-if="item.chartRank3 > 0" :title="$t('global.bronze')">
              {{ item.chartRank3 }}
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite bronze"
                   aria-hidden="true" focusable="false">
                  <use xlink:href="#medal"/>
              </svg>
              <span class="screen-reader-text">{{ $t('global.bronze') }}</span>
          </span>
        </td>

        <td v-if="!this.$vuetify.display.mobile">{{ number(item.pointGame) }}</td>
        <td>{{ number(item.nbChart) }} / {{ number(item.game.nbChart) }}</td>
        <td>
          <tools-rank v-bind:rank="item.rankPointChart" v-bind:nb-equal="item.nbEqual"
                      v-bind:nb-item="item.game.nbPlayer"/>
        </td>
      </tr>
      </tbody>

    </v-table>
  </div>
</template>

<script>
import Game from '@/components/vgr/game/Game.vue';
import ToolsRank from '@/components/vgr/tools/Rank';
import Filters from "@/mixins/Filters.vue";

export default {
  mixins:[Filters],
  name: 'PlayerGames',
  components: {
    'game': Game,
    'tools-rank': ToolsRank
  },
  data() {
    return {
      games: null,
      nbGame: 0,
      platforms: [],
      filter: {
        platform: '',
      },
      order: {
        column: 'rankPointChart',
        direction: 'ASC',
      }
    };
  },
  watch: {
    'filter.platform'() {
      this.load();
    }
  },
  computed: {
    getLibGame() {
      if (localStorage.lang === 'fr') {
        return 'game.libGameFr';
      }
      return 'game.libGameEn';
    },
  },
  created() {
    this.axios.get('/api/platforms?pagination=false&games.playerGame.player=' + this.$route.params.idPlayer, {enableCache: true})
        .then(response => {
          this.platforms = response.data['hydra:member'];
        })
    this.order.column = this.getLibGame;
    this.load();
  },
  methods: {
    load() {
      let query = 'pagination=false&groups[]=player-game:read'
        + '&groups[]=player-game:game&groups[]=game:read'
        + '&groups[]=player-game:player'
        + '&player=' + this.$route.params.idPlayer + '&order[' + this.order.column + ']=' + this.order.direction;


      if (this.order.column === 'chartRank0') {
        query += '&order[chartRank1]=' + this.order.direction + '&order[chartRank2]=' + this.order.direction + '&order[chartRank3]=' + this.order.direction;
      }

      if (this.filter.platform !== '') {
        query += '&game.platforms=' + this.filter.platform;
      }

      if (this.order.column === 'rankPointChart') {
        if (this.order.direction === 'ASC') {
          query += '&order[nbEqual]=ASC&order[game.nbPlayer]=DESC';
        } else {
          query += '&order[nbEqual]=DESC&order[game.nbPlayer]=ASC';
        }
      }

      this.axios.get('/api/player_games?' + query).then(response => {
        this.games = response.data['hydra:member'];
        this.nbGame = response.data['hydra:totalItems'];
      })

    },
    orderBy(column) {
      if (column !== this.order.column) {
        this.order.column = column;
        if (column === this.getLibGame) {
          this.order.direction = 'ASC';
        } else {
          this.order.direction = 'ASC';
        }
      } else if (this.order.direction === 'ASC') {
        this.order.direction = 'DESC';
      } else {
        this.order.direction = 'ASC';
      }
      this.load();
    }
  },
};
</script>
