<template>
  <h2 class="ma-4">{{ nb }} {{ $t('global.players_', nb) }}</h2>
  <div v-if="nb > 100" class="d-flex justify-center text-red-darken-3 ma-2">
    {{ $t('search.max') }}
  </div>
  <v-table density="compact" v-if="nb > 0">
    <thead>
    <tr>
      <th scope="col">{{ $t('global.player') }}</th>
      <th class="right" scope="col">{{ $t('global.medals') }}</th>
      <th class="right" scope="col">{{ $t('global.points') }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in players" :data-position="item.position" :key="item.id">
      <td class="pa-1">
        <country v-bind:country="item.country"></country>
        <player v-bind:player="item" v-bind:show-avatar="showAvatar"></player>
      </td>
      <td class="pr-3 right">
        rank#{{ item.rankMedal }}
        <br/>
        {{ item.chartRank0 }} # {{ item.chartRank1 }} # {{ item.chartRank2 }} # {{ item.chartRank3 }}
      </td>
      <td class="pr-3 right">
        rank#{{ item.rankPointChart }}
        <br/>
        {{ number(item.pointChart) }} pts
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
import Player from '@/components/vgr/player/Player.vue';
import country from "@/components/country/Country.vue";
import filters from "@/mixins/Filters.vue";

export default {
  mixins: [filters],
  name: 'PlayerSearchResult',
  props: {
    'callback': {
      require: true,
      type: String,
      default: '/api/players'
    },
    'showAvatar': {
      default: true,
      type: Boolean,
    },
  },
  components: {
    country,
    'player': Player,
  },
  data() {
    return {
      players: [],
      nb: 0,
    };
  },
  computed: {
    getCallBack() {
      return this.callback;
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
            this.players = response.data['hydra:member'];
            this.nb = response.data['hydra:totalItems'];
          })
    },
  },
};
</script>


