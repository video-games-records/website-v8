<template>
  <div>
    <v-progress-linear v-if="games.length === 0" indeterminate color="yellow-darken-2"></v-progress-linear>
    <v-table>
      <caption class="screen-reader-text">{{ $t('global.games') }}</caption>
      <thead>
      <tr>
        <th scope="col">
          <button class="table-order" @click="orderBy(getLibGame)">{{ $t('global.game') }}</button>
        </th>
        <th scope="col">
          <button class="table-order" @click="orderBy('chartRank0')">{{ $t('global.medals') }}</button>
        </th>
        <th scope="col" v-if="!this.$vuetify.display.mobile">
          <button class="table-order" @click="orderBy('pointGame')">{{ $t('global.gamePoints') }}</button>
        </th>
        <th scope="col">
          <button class="table-order" @click="orderBy('rankPointChart')">{{ $t('global.rank') }}</button>
        </th>
      </tr>
      </thead>
        <tbody>
        <tr v-for="item in games" :data-rank="item.rankPointChart" :key="item.id">
          <td>
            <game v-bind:game="item.game"></game>
          </td>
          <td>
            <tools-medals v-bind:nb-platinum="item.chartRank0" v-bind:nb-gold="item.chartRank1"
                          v-bind:nb-silver="item.chartRank2" v-bind:nb-bronze="item.chartRank3"/>
          </td>
          <td v-if="!this.$vuetify.display.mobile">{{ item.pointGame | number }}</td>
          <td>
            <tools-rank v-bind:rank="item.rankPointChart" v-bind:nb-equal="item.nbEqual"
                        v-bind:nb-item="item.game.nbTeam"/>
          </td>
        </tr>
        </tbody>
    </v-table>
  </div>
</template>

<script>
import Game from '@/components/vgr/game/Game.vue';
import ToolsRank from '@/components/vgr/tools/Rank';
import ToolsMedals from '@/components/vgr/tools/Medals';

export default {
  name: 'TeamGames',
  components: {
    'game': Game,
    'tools-rank': ToolsRank,
    'tools-medals': ToolsMedals,
  },
  data() {
    return {
      games: [],
      nbGame: 0,
      order: {
        column: 'rankPointChart',
        direction: 'ASC',
      }
    };
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
    this.order.column = this.getLibGame;
    this.load();
  },
  methods: {
    load() {
      let query = 'groups[]=team-game:read&groups[]=team-game:game&groups[]=game:read'
          + '&pagination=false&team=' + this.$route.params.idTeam + '&order[' + this.order.column + ']=' + this.order.direction;


      if (this.order.column === 'chartRank0') {
        query += '&order[chartRank1]=' + this.order.direction + '&order[chartRank2]=' + this.order.direction + '&order[chartRank3]=' + this.order.direction;
      }

      if (this.order.column === 'rankPointChart') {
        if (this.order.direction === 'ASC') {
          query += '&order[nbEqual]=ASC&order[game.nbTeam]]=DESC';
        } else {
          query += '&order[nbEqual]=DESC&order[game.nbTeam]]=ASC';
        }
      }

      this.axios.get('/api/team_games?' + query).then(response => {
        this.games = response.data['hydra:member'];
        this.nbGame = response.data['hydra:totalItems'];
      })
    },
    orderBy(column) {
      if (column !== this.order.column) {
        this.order.column = column;
        if (column === 'translations.name') {
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
    },
  },
};
</script>
