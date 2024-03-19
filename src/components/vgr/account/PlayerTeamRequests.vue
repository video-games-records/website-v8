<template>
  <v-card class="ma-3">
    <v-card-title class="bg-primary">{{ $t('team.requests') }}</v-card-title>
    <v-card-item>
      <v-table v-if="requests.length > 0">
        <caption class="screen-reader-text">{{ $t('team.request.caption') }}</caption>
        <thead>
        <tr>
          <th scope="col">{{ $t('global.team') }}</th>
          <th scope="col">{{ $t('global.createdAt') }}</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="request in requests" :data-position="request.position" :key="request.id">
          <td>{{ request.team.libTeam }}</td>
          <td>{{ request.createdAt }}</td>
          <td>
            <v-btn @click="cancel(request)">{{ $t('team.request.action.CANCEL') }}</v-btn>
          </td>
        </tr>
        </tbody>
      </v-table>
      <div v-else>
        <p>{{ $t('team.request.none') }}</p>
      </div>
    </v-card-item>
  </v-card>
</template>


<script>
import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'PlayerTeamRequests',
  data() {
    return {
      requests: [],
    };
  },
  created() {
    this.load();
  },
  computed: {
    getPlayer() {
      return this.getAuthenticatedPlayer;
    },
  },
  methods: {
    load: function () {
      this.axios.get('/api/team_requests?pagination=false&status=ACTIVE&player=' + this.getPlayer.id)
          .then(response => {
            this.requests = response.data['hydra:member'];
          });
    },
    cancel: function (request) {
      request.status = 'CANCELED';
      this.axios.put('/api/team_requests/' + request.id, request)
          .then(() => {
            this.load()
          });
    }
  },
};
</script>
