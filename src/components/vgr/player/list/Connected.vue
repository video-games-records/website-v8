<template>
  <div>
    <h5>{{$t('user.connected', [this.nb])}}</h5>
      <div class="d-flex">
        <router-link v-for="player in players" :key="player.id"
                     :to="{ name: 'PlayerIndex', params: { idPlayer: player.id, slugPlayer: player.slug }}"
                     class="d-flex flex-wrap ma-1"
                     :title="player.pseudo">{{ player.pseudo }}</router-link>
      </div>
  </div>
</template>

<script>
import Player from "@/components/vgr/player/Player";

export default {
  name: 'PlayerListConnected',
  components: {Player},
  data() {
    return {
      players: [],
      nb: 0,
    };
  },
  computed: {
    getNow: function () {
      function pad(s) {
        return (s < 10) ? '0' + s : s;
      }
      let d = new Date();
      return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
    }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios.get('/api/players?pagination=false&lastLogin[after]=' + this.getNow)
          .then(response => {
            this.players = response.data['hydra:member'];
            this.nb = response.data['hydra:totalItems'];
          })
    },
  },
};
</script>