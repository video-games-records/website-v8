<template>
  <table>
    <caption class="screen-reader-text">{{ $t('game.list.caption') }}</caption>
    <thead>
    <tr>
      <th scope="col">
        <span v-if="displayPlatform">{{ $t('global.game') }}</span>
        <button v-else type="button" class="table-order" @click="orderBy(getLibGame)">{{ $t('global.game') }}</button>
      </th>
      <th scope="col" v-if="displayPlatform">{{ $t('global.platforms') }}</th>
      <th scope="col" v-if="displayCharts" >
        <span v-if="displayPlatform">{{ $t('global.charts') }}</span>
        <button v-else type="button" class="table-order" @click="orderBy('nbChart')">{{ $t('global.charts') }}</button>
      </th>
      <th scope="col" v-if="displayPosts">
        <span v-if="displayPlatform">{{ $t('global.scores') }}</span>
        <button v-else type="button" class="table-order" @click="orderBy('nbPost')">{{ $t('global.scores') }}</button>
      </th>
      <th scope="col" v-if="displayPlayers">
        <span v-if="displayPlatform">{{ $t('global.players') }}</span>
        <button v-else type="button" class="table-order" @click="orderBy('nbPlayer')">
          {{ $t('global.players') }}
        </button>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in games" :data-position="item.position" :key="item.id">
      <td class="game-list__game">
        <game v-bind:game="item" v-bind:show-link="showLink"></game>
      </td>
      <td v-if="displayPlatform" class="game-list__platform">
        <platform-list v-bind:platforms="item.platforms"></platform-list>
      </td>
      <td v-if="displayCharts" :data-header="$t('global.charts')">
        {{ number(item.nbChart) }}
      </td>
      <td v-if="displayPosts" :data-header="$t('global.scores')">
        {{ number(item.nbPost) }}
      </td>
      <td v-if="displayPlayers" :data-header="$t('global.players')">
        {{ number(item.nbPlayer) }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import PlatformList from '@/components/vgr/platform/List.vue';
import Game from '@/components/vgr/game/Game.vue';
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Filters],
  name: 'GameList',
  props: {
    'callback': {
      require: true,
      type: String,
      default: '/api/games-list-by-letter?letter=0'
    },
    'displayPlatform': {
      default: true,
      type: Boolean,
    },
    'displayCharts': {
      default: true,
      type: Boolean,
    },
    'displayPosts': {
      default: true,
      type: Boolean,
    },
    'displayPlayers': {
      default: true,
      type: Boolean,
    },
    'showLink': {
      default: true,
      type: Boolean,
    },
    'activeOrderBy': {
      default: false,
      type: Boolean,
    }
  },
  components: {PlatformList, Game},
  data() {
    return {
      games: [],
      order: {
        column: 'id',
        direction: 'ASC',
      }
    };
  },
  computed: {
    getLibGame() {
      if (this.$i18n.locale === 'fr') {
        return 'libGameFr';
      }
      return 'libGameEn';
    },
  },
  watch: {
    callback () {
      this.load();
    }
  },
  created() {
    this.order.column = this.getLibGame;
    this.load();
  },
  methods: {
    load() {
      this.axios.get(this.callback)
        .then(response => {
          this.games = response.data['hydra:member']
        })
    },
    orderBy(column) {
      if (this.activeOrderBy === false) {
        return;
      }
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
    }
  },
};
</script>