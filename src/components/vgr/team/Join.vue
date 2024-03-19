<template>
  <div v-if="isAuthenticated && this.getAuthenticatedPlayer.team === null" class="ma-5">
    <v-btn @click="join()">JOIN</v-btn>
  </div>
</template>

<script>
import {useFlashMessageStore} from "@/store/base/flashMessage";
import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'TeamJoin',
  props: {
    'team': {
      require: true,
    },
  },
  computed: {
    getPlayer() {
      return this.getAuthenticatedPlayer;
    },
  },
  data() {
    return {
      request : {
        'team' : null,
        'player': null,
      },
    };
  },
  methods: {
    join: function () {
      this.request.team = '/api/teams/' + this.team.id;
      this.request.player = '/api/players/' + this.getPlayer.id;

      this.axios.post('/api/team_requests', this.request)
          .then(() => {
            useFlashMessageStore().confirm('OK')
          })
          .catch((error) => {
            useFlashMessageStore().error(error.response.data['hydra:description'])
          })
    }
  },
};
</script>
