<template>
  <v-sheet>
    <v-table density="compact">
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
          {{ item.pointChart|number }} pts
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-sheet>
</template>

<script>
import Player from '@/components/vgr/player/Player.vue';
import country from "@/components/country/Country.vue";

export default {
  name: 'PlayerList',
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


