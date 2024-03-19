<template>
  <div>
    <h2 class="ma-4">{{ nb }} {{ $t('global.games_', nb) }}</h2>
    <div v-if="nb > 100" class="d-flex justify-center text-red-darken-3 ma-2">
      {{ $t('search.max') }}
    </div>
    <v-table>
      <caption class="screen-reader-text">{{ $t('game.list.caption') }}</caption>
      <thead>
      <tr>
        <th scope="col">
          <span>{{ $t('global.game') }}</span>
        </th>
        <th scope="col">{{ $t('global.platforms') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in games" :data-position="item.position" :key="item.id">
        <td>
          <game v-bind:game="item" v-bind:show-link="true"></game>
        </td>
        <td>
          <platform-list v-bind:platforms="item.platforms"></platform-list>
        </td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import PlatformList from '@/components/vgr/platform/List.vue';
import Game from '@/components/vgr/game/Game.vue';

export default {
  name: 'SearchResult',
  props: {
    'callback': {
      require: true,
      type: String,
      default: '/api/games'
    },
    'displayPlatform': {
      default: true,
      type: Boolean,
    },
  },
  components: {PlatformList, Game},
  data() {
    return {
      games: [],
      nb: 0,
    };
  },
  computed: {
    getCallBack() {
      return this.callback;
    },
    getLibGame() {
      if (this.$i18n.locale === 'fr') {
        return 'libGameFr';
      }
      return 'libGameEn';
    },
  },
  watch: {
    getCallBack () {
      this.load();
    }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios.get(this.getCallBack)
        .then(response => {
          this.games = response.data['hydra:member'];
          this.nb = response.data['hydra:totalItems'];
        })
    },
  },
};
</script>