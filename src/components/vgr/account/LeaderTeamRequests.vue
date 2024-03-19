<template>
  <div>
    <v-card class="ma-3">
      <v-card-title class="bg-primary">{{ $t('team.requests') }}</v-card-title>
      <v-card-item>
        <v-table v-if="requests.length > 0">
          <thead>
          <tr>
            <th scope="col">{{ $t('global.player') }}</th>
            <th scope="col">{{ $t('global.createdAt') }}</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tfoot>
          </tfoot>
          <tbody>
          <tr v-for="request in requests" :data-position="request.position" :key="request.id">
            <td>{{ request.player.pseudo }}</td>
            <td>{{ request.createdAt }}</td>
            <td>
              <v-btn @click="accept(request)" class="ma-2">{{ $t('team.request.action.ACCEPT') }}</v-btn>
              <v-btn @click="refuse(request)" class="ma-2">{{ $t('team.request.action.REFUSE') }}</v-btn>
            </td>
          </tr>
          </tbody>
        </v-table>
        <div v-else>
          <p>{{ $t('team.request.none') }}</p>
        </div>
      </v-card-item>
    </v-card>
  </div>
</template>


<script>
import Rules from "@/mixins/Rules.vue";
import Security from "@/mixins/Security.vue";

export default {
  mixins: [Rules, Security],
  name: 'LeaderTeamRequests',
  computed: {
    getTeam() {
      return this.getAuthenticatedPlayer.team;
    },
  },
  data() {
    return {
      requests: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    load: function () {
      this.axios.get('/api/team_requests?pagination=false&status=ACTIVE&team=' + this.getTeam.id)
          .then(response => {
            this.requests = response.data['hydra:member'];
          });
    },
    accept: function (request) {
      request.status = 'ACCEPTED';
      this.axios.put('/api/team_requests/' + request.id, request)
          .then(() => {
            this.load()
          });
    },
    refuse: function (request) {
      request.status = 'REFUSED';
      this.axios.put('/api/team_requests/' + request.id, request)
          .then(() => {
            this.load()
          });
    }
  },
};
</script>
